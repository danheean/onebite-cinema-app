"use client";

import deleteReviewAction from "@/actions/delete-review-action";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input readOnly name="reviewId" hidden value={reviewId} />
      <input readOnly name="movieId" hidden value={movieId} />
      {isPending ? (
        <div>삭제중...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>
          🗑️ 리뷰 삭제하기
        </div>
      )}
    </form>
  );
}
