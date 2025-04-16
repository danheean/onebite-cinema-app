import {
  MovieItemSkeleton,
  MovieItemRepoSkeleton,
} from "./movie-item-skeleton";

export function MovieListRepoSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => (
      <MovieItemRepoSkeleton key={`movie-item-repo-skeleton-${idx}`} />
    ));
}

export function MovieListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <MovieItemSkeleton key={`movie-item-skeleton-${idx}`} />);
}
