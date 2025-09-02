interface StarRatingProps {
  count: number;
}

export function StarRating({ count }: StarRatingProps) {
  return <span className="text-black text-xs md:text-sm">{"★".repeat(count)}</span>;
}