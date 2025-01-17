import InputSearch from "@/components/input-search";
import { Pagination } from "@/components/pagination";
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
type Props = {
  searchParams: Promise<{
    q: string;
    page: number;
  }>;
};
export const dynamic = "force-dynamic";

async function getAnimes({ q = "", page = 1 }: { q: string; page: number }) {
  const res = await fetch(
    `http://localhost:3000/api/animes?limit=44&page=${page}&q=${q}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.log({ res });
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
  console.log({ data, length: data.length });
  return (
    <div>
      <main className="max-w-7xl mx-auto">
        <header className="my-4 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Animes</h1>
            <p className="text-gray-600">Total de animes: {total}</p>
            {q ? (
              <p>
                {`Mostrando ${total} ${resultsText} para `}
                <span className="font-bold">&quot;{q}&quot;</span>
              </p>
            ) : (
              <p>{`Mostrando ${total} ${resultsText}`}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="search">Buscar animes</label>
            <InputSearch />
          </div>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {data.map((anime) => (
            <li key={anime.id} className="[content-visible:auto]">
              <a href={anime.url} target="_blank">
                <img src={anime.image} alt={anime.name} />
                <p className="text-xs mt-2">{anime.name}</p>
              </a>
            </li>
          ))}
        </ul>
        <footer className="my-4 justify-center flex">
          <Pagination pages={totalPages} page={currentPage} />
        </footer>
      </main>
    </div>
  );
}
