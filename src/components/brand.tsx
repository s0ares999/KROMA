import Image from "next/image";

export function Brand({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`brand-crop ${className}`}>
      <Image src={light ? "/brand/logo-light.svg" : "/brand/logo-dark.svg"} alt="KROMA" width={1600} height={500} className="brand-vector" />
    </span>
  );
}
