"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";

export default function AvatarPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as "kid" | "parent";
  const nickname = searchParams.get("nickname") || "";
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const avatars = [
    "/BPI assets/avatars/Boy w blue bg.png",
    "/BPI assets/avatars/Boy w green bg.png", 
    "/BPI assets/avatars/Girl w purple bg.png",
    "/BPI assets/avatars/Girl w yellow bg.png",
    "/BPI assets/avatars/add-photo.png"
  ];

  const handleContinue = () => {
    if (selectedAvatar) {
      router.push(`/onboarding/success?role=${role}&nickname=${encodeURIComponent(nickname)}&avatar=${encodeURIComponent(selectedAvatar)}`);
    }
  };

  const AvatarButton = ({ avatar, index }: { avatar: string; index: number }) => (
    <button
      onClick={() => setSelectedAvatar(avatar)}
      className={`w-24 h-24 rounded-full border-4 transition-all duration-300 overflow-hidden transform hover:scale-105 active:scale-95 ${
        selectedAvatar === avatar
          ? "border-purple-500 scale-110 shadow-lg shadow-purple-300 animate-pulse"
          : "border-gray-200 hover:border-purple-300 hover:shadow-md"
      }`}
      style={{animationDelay: `${index * 0.1}s`}}
    >
      <div className="relative w-full h-full">
        <Image
          src={avatar}
          alt={`Avatar ${index + 1}`}
          fill
          className="object-contain rounded-full transition-transform hover:scale-110"
        />
        {selectedAvatar === avatar && (
          <div className="absolute inset-0 bg-purple-500 opacity-20 rounded-full animate-ping"></div>
        )}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F2E8C9] bg-cover bg-no-repeat p-4">
<div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-xl text-black font-medium font-['Baloo_2'] mb-2">
            Pick an Avatar
          </h1>
        </header>

        {selectedAvatar && (
          <div className="text-center mb-6">
            <div className="relative w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
              <Image
                src={selectedAvatar}
                alt="Selected avatar"
                fill
                className="object-contain rounded-full"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <p className="text-lg font-bold text-gray-800">Great choice, {nickname}!</p>
          </div>
        )}

        <div className="p-6 mb-8 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {avatars.slice(0, 4).map((avatar, index) => (
              <AvatarButton key={index} avatar={avatar} index={index} />
            ))}
          </div>
          <div className="flex justify-center">
            {avatars.slice(4, 5).map((avatar, index) => (
              <AvatarButton key={index + 4} avatar={avatar} index={index + 4} />
            ))}
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedAvatar}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
            selectedAvatar
              ? "bg-[#AD1F23] hover:bg-[#8B1A1D] hover:shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
