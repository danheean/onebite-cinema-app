import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";

// export const dynamic = "force-static";
// 특별하지 않는 경우 강제로 설정할 필요가 없다.
// Next.js 에서는 기본적으로 최적화하여 제공한다.

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 해당 페이지를 Dynamic 페이지로 강제 설정
// 3. force-static : 해당 페이지를 Static 페이지로 강제 설정
// 4. error : 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 경우는 빌드 오류 발생)

async function AllRandomMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/random`,
    { next: { revalidate: 5 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allRandomMovies: MovieData[] = await response.json();
  // console.log(allRandomMovies);

  return (
    <div className={style.movie_recommend_list}>
      {allRandomMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

async function AllMovies() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const allMovies: MovieData[] = await response.json();
  // console.log(allMovies);

  return (
    <div className={style.movie_list}>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <AllRandomMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
