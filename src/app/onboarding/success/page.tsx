"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";
import { UserStore } from "../../../lib/userStore";


export default function OnboardingSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as "kid" | "parent";
  const nickname = searchParams.get("nickname") || "";
  const avatar = searchParams.get("avatar") || "";

  const handleGetStarted = () => {
    // Save user data to store
    UserStore.saveUserData({ nickname, avatar, role });
    
    if (role === "kid") {
      router.push("/onboarding/mascot");
    } else {
      router.push("/parent-app");
    }
  };

  const bgImage = role === "parent" 
    ? "url('/BPI assets/parents-dashboard-bg.png')" 
    : "url('/BPI assets/kids-dashboard-bg.png')";

  return (
    <div className="min-h-screen bg-[#F2E8C9] p-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
        </header>

        <div className="p-8 text-center mb-8">
          {avatar && (
            <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#1F4E79] shadow-lg hover:scale-105 transition-transform">
              <Image
                src={avatar}
                alt="User Avatar"
                fill
                className="object-contain rounded-full"
              />
            </div>
          )}
          
          <div className="text-4xl mb-4 animate-pulse">🎉</div>
          
      
          <h1 className="text-3xl font-extrabold font-['Baloo_2'] text-black mb-4">
            Profile Created!
          </h1>
          
          <p className="text-xl text-gray-700 mb-6">
            Welcome to BPI Sandbox, <span className="font-bold text-purple-600">{nickname}</span>!
          </p>
          
          <div className="p-4 mt-10">
            <p className="text-sm text-gray-600 mt-6">
              {role === "kid" 
                ? "You're all set to start learning about saving and earning! Ready to start your Sandbox adventure?"
                : "You're ready to monitor and guide your child's financial learning journey!"
              }
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGetStarted}
          className="w-full py-4 rounded-xl font-bold text-white bg-[#AD1F23] hover:bg-[#8B1A1D] hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {role === "kid" ? "Yes! Let's start!" : "Go to Dashboard"}
        </button>
      </div>
    </div>
  );
}