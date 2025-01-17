"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InputSearch() {
  const params = useSearchParams();
  const router = useRouter();

  // Local state to control the search input
  const [search, setSearch] = useState<string>(params.get("q") || "");

  // Debounce function to delay execution of a function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handle the input search and update query parameters with debounce
  const handleSearch = useCallback(
    debounce((value: string) => {
      const newParams = new URLSearchParams(params?.toString() || "");
      if (value) {
        newParams.set("q", value); // Add or update the `q` parameter
      } else {
        newParams.delete("q"); // Remove `q` if the input is empty
      }
      router.push(`/?${newParams.toString()}`); // Update the URL
    }, 300), // 300ms debounce delay
    [params, router]
  );

  // Sync search input with the URL whenever it changes
  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  return (
    <input
      type="text"
      placeholder="Search..."
      className="px-4 py-2 border rounded w-full max-w-96 h-9 text-black"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
