"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?q=${search}`);
    }
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    return () => setSearch("");
  }, []);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
