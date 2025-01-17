import loadAnimes from "@/app/load-animes";
import { NextRequest } from "next/server";

type AnimeObject = {
  id: string;
  name: string;
  url: string;
  image: string;
  posi: {
    [key: string]: string;
  };
  size: string;
  group: string;
  codec: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const animes = loadAnimes() as AnimeObject[];
  let filteredAnimes = animes;
  if (query) {
    filteredAnimes = animes
      .map((anime) => {
        const nameLower = anime.name.toLowerCase();
        const score = calculateRelevance(query, nameLower);
        return { ...anime, score }; // Attach the score to each anime
      })
      .filter((anime) => anime.score > 0) // Exclude animes with no match
      .sort((a, b) => b.score - a.score); // Sort by score in descending order
  }
  const startIndex = (page - 1) * limit;
  const paginatedAnimes = filteredAnimes.slice(startIndex, startIndex + limit);

  return Response.json({
    data: paginatedAnimes,
    total: filteredAnimes.length,
    page,
    totalPages: Math.ceil(filteredAnimes.length / limit),
  });
}

// Calculate the relevance score for a match
function calculateRelevance(query: string, name: string): number {
  if (name.includes(query)) {
    return query.length / name.length; // Higher score for longer matches
  }
  if (query.split(" ").every((word) => name.includes(word))) {
    return 0.5; // Partial match on all words
  }
  if (query.split(" ").some((word) => name.includes(word))) {
    return 0.2; // Match on some words
  }
  return 0; // No match
}
