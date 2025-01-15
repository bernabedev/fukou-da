"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  className?: string;
  pages: number;
  page?: number;
  onChange?: (page: number) => void;
};

export const Pagination = (props: Props) => {
  const { className, pages, page = 1, onChange } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handlerPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const maxPageButtons = 5;

  let startPage = Math.max(page - 2, 1);
  let endPage = Math.min(page + 2, pages);

  if (endPage - startPage < maxPageButtons - 1) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
    endPage =
      startPage + maxPageButtons - 1 <= pages
        ? startPage + maxPageButtons - 1
        : pages;
  }

  const pageNumbers = [];
  if (startPage > 1) pageNumbers.push(1);
  if (startPage > 2) pageNumbers.push("...");
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  if (endPage < pages - 1) pageNumbers.push("...");
  if (endPage < pages) pageNumbers.push(pages);

  return (
    <div className={`flex items-center gap-8 ${className}`}>
      <button
        onClick={() => handlerPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="text-secondary/50 hover:text-electric-blue-violet"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <div className="flex items-center gap-2">
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            className={`flex size-7 items-center justify-center rounded-lg p-0 ${
              pageNumber === page ? "!bg-primary text-white" : ""
            }`}
            onClick={() =>
              typeof pageNumber === "number" && handlerPage(pageNumber)
            }
            disabled={typeof pageNumber !== "number"}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlerPage(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="text-secondary/50 hover:text-electric-blue-violet"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="rotate-180"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
    </div>
  );
};
