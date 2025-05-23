import { MovieData, ReviewData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";

// export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return [];
  }
  const movies: MovieData[] = await response.json();
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const movie: MovieData = await response.json();
  // console.log(movie);

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
      <section>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <Image
            src={posterImgUrl}
            width={245}
            height={350}
            alt={`영화 ${title}의 포스터 이미지`}
          />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.detail}>
          {releaseDate} / {genres} / {runtime}분
        </div>
        <div className={style.detail}>{company}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.description}>{description}</div>
      </section>
    </>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/movie/${movieId}`,
    {
      next: {
        tags: [`review-${movieId}`],
      },
    }
  );

  if (!response.ok) {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/review/movie/${movieId}`);
    throw new Error(`Review fetch failed ; ${response.statusText}`);
  }

  const reviews = await response.json();
  return (
    <section>
      {reviews.map((review: ReviewData) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const movie: MovieData = await response.json();
  return {
    title: `${movie.title} - 한입 시네마`,
    description: `${movie.description}`,
    openGraph: {
      title: `${movie.title} - 한입 시네마`,
      description: `${movie.description}`,
      images: [movie.posterImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <MovieDetail movieId={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
