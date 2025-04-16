import style from "./movie-item-skeleton.module.css";

export function MovieItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img_container}></div>
    </div>
  );
}

export function MovieItemRepoSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img_repo_container}></div>
    </div>
  );
}
