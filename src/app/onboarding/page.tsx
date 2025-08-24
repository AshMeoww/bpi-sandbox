"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../components/shared/Logo";
import Image from "next/image";

export default function OnboardingStart() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"kid" | "parent" | null>(null);

  const handleContinue = (role: "kid" | "parent") => {
    router.push(`/onboarding/nickname?role=${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2E8C9]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center">
          <button 
            onClick={() => handleContinue("kid")}
            className={`relative transform transition-transform hover:scale-110 ${
              selectedRole === "kid" ? "ring-4 ring-purple-500" : ""
            }`}
          >
            <Image
              src="/BPI assets/sandcastle-icon.png"
              alt="Kid role"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </button>
          <p className="mt-2 text-xl font-semibold text-black">Child</p>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => handleContinue("parent")}
            className={`relative transform transition-transform hover:scale-110 ${
              selectedRole === "parent" ? "ring-4 ring-blue-500" : ""
            }`}
          >
            <Image 
              src="/BPI assets/shovel-icon.png"
              alt="Parent role"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </button>
          <p className="mt-2 text-xl font-semibold text-black">Parent</p>
        </div>
      </div>
    </div>
  );
}
