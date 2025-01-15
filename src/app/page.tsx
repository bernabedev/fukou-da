import InputSearch from "@/components/input-search";
import { Pagination } from "@/components/pagination";
import { promises as fs } from "fs";
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
export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const { q = "", page: currentPage = 1 } = searchParams;

  const file = await fs.readFile(
    process.cwd() + "/src/app/animes-mapped.json",
    "utf8"
  );
  const data = (JSON.parse(file) as AnimeObject[]).filter((anime) => {
    if (q) {
      return anime.name.toLowerCase().includes(q.toLowerCase());
    }
    return true;
  });

  // Define el número de elementos por página
  const ITEMS_PER_PAGE = 44;

  // Calcula los datos de la página actual
  const startIndex = (+currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
 
  const resultsText = currentData.length > 1 ? "resultados" : "resultado";
  

  return (
    <div>
      <main className="max-w-7xl mx-auto">
        <header className="my-4 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Animes</h1>
            <p className="text-gray-600">Total de animes: {data.length}</p>
            {q ? (
              <p>
                {`Mostrando ${currentData.length} ${resultsText} para `}
                <span className="font-bold">&quot;{q}&quot;</span>
              </p>
            ) : (
              <p>{`Mostrando ${currentData.length} ${resultsText}`}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="search">Buscar animes</label>
            <InputSearch />
          </div>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {currentData.map((anime) => (
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
