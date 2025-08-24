"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";

export default function MascotIntroduction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname") || "";
  const avatar = searchParams.get("avatar") || "";

  const handleContinue = () => {
    router.push(`/onboarding/how-it-works-1?nickname=${encodeURIComponent(nickname)}&avatar=${encodeURIComponent(avatar)}`);
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
              className="object-contain"
            />
          </div>
          
          <h1 className="text-xl font-medium font-['Public_Sans'] text-[#1F4E79] mb-4">
            Hey {nickname}! I'm Bea, your buddy!
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl text-[#1F4E79] p-6 mb-6 font-['Public_Sans']">
            <p className="text-lg text-gray-700 mb-4">
              I'm your friendly guide to learning about money!
            </p>
            <p className="text-base text-gray-600">
              Together, we'll explore how to save, spend wisely, and reach your goals. Ready to go?
            </p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-xl font-bold text-white bg-[#AD1F23] hover:bg-[#8B1A1D] hover:shadow-lg transition-all"
        >
          YES! Let's Go! 
        </button>
      </div>
    </div>
  );
}
