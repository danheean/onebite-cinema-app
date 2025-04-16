import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import movies from "@/mock/movies.json";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.movie_recommend_list}>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>등록된 모든 영화</section>
      <div className={style.movie_list}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
