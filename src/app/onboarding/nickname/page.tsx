"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";

export default function NicknameInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as "kid" | "parent";
  const [nickname, setNickname] = useState("");

  const handleContinue = () => {
    if (nickname.trim()) {
      router.push(
        `/onboarding/avatar?role=${role}&nickname=${encodeURIComponent(
          nickname
        )}`
      );
    }
  };

  const bgImage =
    role === "parent"
      ? "url('/BPI assets/parents-dashboard.png')"
      : "url('/BPI assets/kids-dashboard-bg.png')";

  return (
    <div className="min-h-screen bg-[#F2E8C9] bg-no-repeat p-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-6 mt-20">
            <Image
              src="/BPI assets/sandbox.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
        </header>

        <div className="p-6 mb-8">
          <h1 className="text-xl font-medium font-['Baloo_2'] text-black mb-2 text-center">
            Hello! What's your nickname?
          </h1>

          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-4 border-b-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors text-black text-center text-xl font-bold bg-transparent"
            maxLength={20}
          />

          <div className="text-center mt-2">
            <span className="text-sm text-gray-500">{nickname.length}/20</span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!nickname.trim()}
          className={`w-full py-2 rounded-full font-bold text-white transition-all ${
            nickname.trim()
              ? "bg-gradient-to-r from-[#1F4E79] to-[#AD1F23] hover:shadow-lg"
              : "bg-[#AD1F23] cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
