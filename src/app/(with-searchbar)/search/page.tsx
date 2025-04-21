import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import { MovieListRepoSkeleton } from "@/components/skeleton/movie-list-skeleton";
import { Metadata } from "next";

// export const dynamic = "force-static";
// 정적으로 변경하면 검색 결과가 제대로 나오지 않는 부작용이 있다.

async function SearchResult({ q }: { q: string }) {
  // await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return {
    title: `한입 시네마 - ${q}`,
    description: `${q} 검색 결과입니다.`,
    openGraph: {
      title: `한입 시네마 - ${q}`,
      description: `${q} 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className={style.container}>
      <Suspense key={q || ""} fallback={<MovieListRepoSkeleton count={3} />}>
        <SearchResult q={q || ""} />
      </Suspense>
    </div>
  );
}
