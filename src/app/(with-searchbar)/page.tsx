import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";

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
