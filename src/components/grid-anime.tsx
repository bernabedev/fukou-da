import { AnimeObject } from "@/types/definitions";

export default function GridAnime({ data }: { data: AnimeObject[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          height="800"
          viewBox="0 0 32 32"
          className="fill-slate-300 h-16 mb-2"
        >
          <g fill="currentColor">
            <path d="M12 14.521h2c0 .55-.45 1-1 1s-1-.451-1-1zM17.5 13c.27 0 .5.23.5.5s-.23.5-.5.5-.5-.23-.5-.5.23-.5.5-.5zM8.5 13c.27 0 .5.23.5.5s-.23.5-.5.5-.5-.23-.5-.5.23-.5.5-.5z" />
          </g>
          <g
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
          >
            <g stroke="#455A64">
              <path d="m23.43 23.401-2.216-2.215M29.914 27.086l-3.5-3.5c-.756-.756-2.072-.756-2.828 0-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414l3.5 3.5c.378.378.88.586 1.414.586s1.036-.208 1.414-.586.586-.88.586-1.414-.208-1.036-.586-1.414z" />
              <circle cx="13" cy="13" r="11.5" />
              <path d="M12 14.521h2c0 .55-.45 1-1 1s-1-.451-1-1zM17.5 13c.27 0 .5.23.5.5s-.23.5-.5.5-.5-.23-.5-.5.23-.5.5-.5zM8.5 13c.27 0 .5.23.5.5s-.23.5-.5.5-.5-.23-.5-.5.23-.5.5-.5z" />
            </g>
            <g stroke="currentColor">
              <path d="m23.43 23.401-2.216-2.215M29.914 27.086l-3.5-3.5c-.756-.756-2.072-.756-2.828 0-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414l3.5 3.5c.378.378.88.586 1.414.586s1.036-.208 1.414-.586.586-.88.586-1.414-.208-1.036-.586-1.414z" />
              <circle cx="13" cy="13" r="11.5" />
              <path d="M12 14.521h2c0 .55-.45 1-1 1s-1-.451-1-1zM17.5 13c.27 0 .5.23.5.5s-.23.5-.5.5-.5-.23-.5-.5.23-.5.5-.5zM8.5 13c.27 0 .5.23.5.5s-.23.5-.5.5-.5-.23-.5-.5.23-.5.5-.5z" />
            </g>
          </g>
        </svg>
        <h4 className="text-2xl font-bold">Sin resultados</h4>
        <p className="text-slate-400 text-sm">
          Triste, pero no encontramos lo que buscas!
        </p>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {data.map((anime) => (
        <li key={anime.id} className="[content-visible:auto]">
          <a
            href={anime.url}
            target="_blank"
            className="flex flex-col justify-between h-full"
          >
            <img
              src={anime.image}
              alt={anime.name}
              className="rounded-md h-full object-cover"
            />
            <p className="text-xs mt-2">{anime.name}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
