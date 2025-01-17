import GridAnime from "@/components/grid-anime";
import InputSearch from "@/components/input-search";
import { Pagination } from "@/components/pagination";
import { AnimeObject } from "@/types/definitions";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{
    q: string;
    page: number;
  }>;
};
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fukou - Da | Animes",
  description: "The best page to find animes",
};

async function getAnimes({ q = "", page = 1 }: { q: string; page: number }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animes?limit=44&page=${page}&q=${q}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch animes");
  }

  return res.json() as Promise<{
    data: AnimeObject[];
    total: number;
    page: number;
    totalPages: number;
  }>;
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const { q = "", page: currentPage = 1 } = searchParams;
  const { data, total, totalPages } = await getAnimes({ q, page: currentPage });
  const resultsText = data.length > 1 ? "resultados" : "resultado";
  return (
    <main className="max-w-7xl mx-auto">
      <header className="my-4 flex flex-col sm:flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-4">Animes</h1>
          {q ? (
            <p className="text-gray-600">
              {`Mostrando ${total} ${resultsText} para `}
              <span className="font-bold">&quot;{q}&quot;</span>
            </p>
          ) : (
            <p className="text-gray-600">{`Mostrando ${total} ${resultsText}`}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="search">Buscar animes</label>
          <InputSearch />
        </div>
      </header>
      <GridAnime
        data={data}
        key={`total-${total}-q-${q}-page-${currentPage}`}
      />
      <footer className="my-4 justify-center flex">
        {data.length > 0 && (
          <Pagination pages={totalPages} page={currentPage} />
        )}
      </footer>
    </main>
  );
}
