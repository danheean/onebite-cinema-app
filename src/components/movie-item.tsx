import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";
import Image from "next/image";

// 138, 198
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
      <Image
        src={posterImgUrl}
        width={245}
        height={352}
        alt={`영화 ${title}의 포스터 이미지`}
      />

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
