"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";

export default function LetsGo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname") || "";
  const avatar = searchParams.get("avatar") || "";

  const handleStartLearning = () => {
    router.push("/kid/dashboard");
  };

  return (
    <div className="min-h-screen p-4 bg-cover bg-center" style={{backgroundImage: "url('/BPI assets/onboarding-bg.png')"}}>
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
        </header>

        <div className="text-center mb-8">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src="/BPI assets/Bea mascot_.png"
              alt="Bea Mascot"
              fill
              className="object-contain hover:scale-105 transition-transform cursor-pointer"
            />
          </div>
          
          <h1 className="text-xl font-medium font-['Public_Sans'] text-[#1F4E79] mb-4">
            You're All Set, {nickname}! Let's head to your piggy bank and start saving!
          </h1>
          

        </div>

        <button
          onClick={handleStartLearning}
          className="w-full py-4 rounded-xl font-bold text-white bg-[#AD1F23] hover:bg-[#8B1A1D] hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Yes! Let's go!
        </button>
      
      </div>
    </div>
  );
}