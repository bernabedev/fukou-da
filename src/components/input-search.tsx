"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function InputSearch() {
  const params = useSearchParams();
  const { push } = useRouter();
  return (
    <input
      type="text"
      placeholder="Buscar..."
      className="px-4 py-2 border rounded w-full max-w-96 h-9 text-black"
      onChange={(e) => {
        console.log(e.target.value);
        push(`/?q=${e.target.value}`);
      }}
      defaultValue={params.get("q") || ""}
    />
  );
}
