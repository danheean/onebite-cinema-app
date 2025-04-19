"use server";

import { delay } from "@/util/delay";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function createReviewAction(formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  // console.log(movieId, content, author);

  if (!movieId || !content || !author) {
    return;
  }

  try {
    await delay(2000);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ movieId, content, author }),
    });

    console.log(response.status);

    // 1. 특정 주소의 해당하는 페이지만 재검증
    revalidatePath(`/movie/${movieId}`);
    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath("/movie/[id]", "page");
    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(with-ssearchbar)", "layout");
    // 4. 모든 페이지 재검증
    // revalidatePath("/", "layout");
    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${movieId}`);
  } catch (error) {
    console.error(error);
    return;
  }
  // console.log(content, author);
}
