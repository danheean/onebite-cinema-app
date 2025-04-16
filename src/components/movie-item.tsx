import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

export default function MovieItem({
  id,
  title,
  company,
  genres,
  subTitle,
  runtime,
  posterImgUrl,
}: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <img src={posterImgUrl} alt={title} />
      <div style={{ display: "none" }}>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />

        <div className={style.info}>
          {company} | {genres} | {runtime}분
        </div>
      </div>
    </Link>
  );
}
