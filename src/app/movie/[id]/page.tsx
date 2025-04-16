import { MovieData } from "@/types";
import style from "./page.module.css";

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${params.id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movie: MovieData = await response.json();

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} alt={title} />
        </div>

        <div className={style.title}>{title}</div>

        <div className={style.detail}>
          {releaseDate} / {genres} / {runtime}분
        </div>

        <div className={style.detail}>{company}</div>

        <div className={style.subTitle}>{subTitle}</div>

        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
