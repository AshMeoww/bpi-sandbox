"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TaskStore, Task } from "../../lib/taskStore";
import BottomNavigation from "../../components/shared/BottomNavigation";
import Logo from "../../components/shared/Logo";
import Image from "next/image";


export default function ParentDashboard() {
  const [parentName] = useState("Maria");
  const [kidName] = useState("Alex");

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 pb-20" style={{backgroundImage: "url('/BPI assets/parents-dashboard.png')"}}>
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <Logo />
            <Link href="/kid/dashboard" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 transition-all text-xs sm:text-sm font-medium">
              Kid's View
            </Link>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid gap-4">
          {/* First Box - Full Width */}
          <div className="bg-[#AD1F23] rounded-2xl shadow-xl p-4 h-30">
            <h2 className="text-white text-xl font-semibold font-['Baloo_2']">This week, {kidName} saved</h2>
            <h1 className="text-white text-5xl font-extrabold font-[Public_Sans] mt-2">PHP 500.00</h1>
          </div>

          {/* Two Half Boxes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#D5B527] rounded-2xl shadow-xl p-6 h-40 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-8 border-white/30 border-t-[#AD1F23] mb-2"></div>
              <p className="text-white text-lg font-bold font-['Public_Sans']">75% Saved!</p>
            </div>
            <div className="bg-[#D5B527] rounded-2xl shadow-xl p-6 h-40 relative">
              <h4 className="text-[#AD1F23] text-2xl font-semibold font-['Baloo_2'] mb-2 z-10 relative">{kidName} reached another milestone!</h4>
              <Image
                src="/BPI assets/badge mustard yellow.png"
                alt="badge"                
                width={100}                
                height={100}
                className="mx-auto absolute bottom-4 left-1/2 transform -translate-x-1/2 z-0"
              />
            </div>
          </div>

          {/* Last Box - Full Width */}
          <div className="bg-[#AD1F23] rounded-2xl shadow-xl p-6 h-40">
            <h3 className="text-white text-xl font-semibold font-['Baloo_2'] mb-4">Spending tracker</h3>
            <div className="flex items-end space-x-2 h-16">
              <div className="bg-white w-8 h-12 rounded-t"></div>
              <div className="bg-white w-8 h-8 rounded-t"></div>
              <div className="bg-white w-8 h-16 rounded-t"></div>
              <div className="bg-white w-8 h-6 rounded-t"></div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation
        items={[
          { href: "/parent-app", icon: "/BPI assets/beige-home.png", label: "Home", isActive: true },
          { href: "/parent-app/monitor", icon: "/BPI assets/list.png", label: "Monitor" },
          { href: "/parent-app/rewards", icon: "/BPI assets/beige-piggy-bank.png", label: "Rewards" },
          { href: "/parent-app/profile", icon: "/BPI assets/beige-home.png", label: "Profile" }
        ]}
      />
    </div>
  );
}
