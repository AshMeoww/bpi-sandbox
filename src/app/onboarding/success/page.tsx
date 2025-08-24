"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";


export default function OnboardingSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as "kid" | "parent";
  const nickname = searchParams.get("nickname") || "";
  const avatar = searchParams.get("avatar") || "";
  const avatars = avatar ? <Image src={avatar} alt="User Avatar" width={100} height={100} className="rounded-full mx-auto" /> : null;
  const handleGetStarted = () => {
    if (role === "kid") {
      router.push("/kid/dashboard");
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
          <div className="text-8xl mb-6">{avatars}</div>
          
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
          onClick={handleGetStarted}
          className="w-full py-4 rounded-xl font-bold text-white bg-[#AD1F23] hover:shadow-lg transition-all"
        >
          {role === "kid" ? "Yes! Let's start!" : "Go to Dashboard"}
        </button>
      </div>
    </div>
  );
}