import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center justify-center">
      <div className="w-32 h-16 sm:w-40 sm:h-20">
        <Image 
          src="/BPI assets/sandbox name w logo.png" 
          alt="BPI Logo" 
          width={180}
          height={100}
          className="object-contain"
        />
      </div>
    </Link>
  );
}