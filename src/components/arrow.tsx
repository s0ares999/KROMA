export function Arrow({ direction = "diagonal", className = "" }: { direction?: "diagonal" | "down"; className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {direction === "diagonal" ? <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /> : <path d="M12 3v17m-7-7 7 7 7-7" stroke="currentColor" strokeWidth="1.5" />}
    </svg>
  );
}
