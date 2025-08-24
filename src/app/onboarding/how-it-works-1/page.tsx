"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";

export default function HowItWorks1() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname") || "";
  const avatar = searchParams.get("avatar") || "";

  const handleContinue = () => {
    router.push(`/onboarding/how-it-works-2?nickname=${encodeURIComponent(nickname)}&avatar=${encodeURIComponent(avatar)}`);
  };

  return (
    <div className="min-h-screen p-4 bg-cover bg-center" style={{backgroundImage: "url('/BPI assets/onboarding-bg.png')"}}>
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-[#D5B527] h-2 rounded-full transition-all duration-1000 animate-pulse" 
                 style={{width: '33%'}} />
          </div>
          <p className="text-sm text-gray-600">Step 1 of 3</p>
        </header>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">

          <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6 animate-bounce">
            <Image
              src="/BPI assets/gold piggy bank.png"
              alt="Piggy Bank"
              fill
              className="object-contain hover:scale-105 transition-transform cursor-pointer"
            />
            </div>
            <p className="text-lg text-[#1F4E79] font-medium font-['Public_Sans'] mb-4">
            Great! Every time you earn money (from tasks, or allowances), you can put them in your piggy bank here. The more you save, the bigger your treasure grows!
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">1 of 3</div>
          <button
            onClick={handleContinue}
            className="px-8 py-3 rounded-xl font-bold text-white bg-[#AD1F23] hover:bg-[#8B1A1D] hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 hover:rotate-1"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}