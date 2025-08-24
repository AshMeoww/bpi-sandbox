"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";

export default function Monitor() {
  const [kidName] = useState("Alex");
  const [currentBalance] = useState(70);
  const [dailyAchievements] = useState([
    { badge: "Math Whiz", task: "Completed Money Quiz", date: "Today" },
    { badge: "Saver Star", task: "Saved ₱20", date: "Today" },
    { badge: "Task Master", task: "Cleaned Room", date: "Today" }
  ]);
  const [wishlistGoals] = useState([
    { item: "Bike", cost: 100, saved: 70 },
    { item: "Video Game", cost: 50, saved: 30 },
    { item: "Art Set", cost: 25, saved: 15 }
  ]);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 pb-20" style={{backgroundImage: "url('/BPI assets/parents-dashboard.png')"}}>
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Logo />
            <Link href="/kid/dashboard" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/30 transition-all text-xs font-medium">
              Kid's View
            </Link>
          </div>
        </header>

        {/* Current Balance */}
        <div className="bg-[#D5B527] rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <img src="/BPI assets/Girl w yellow bg.png" alt="Piggy Bank" className="w-20 h-20" />
            <div>
              <h3 className="text-lg font-semibold font-['Baloo_2'] text-black mb-2">{kidName}'s current balance is </h3>
              <div className="text-4xl font-extrabold font-[Public_Sans] text-black">PHP {currentBalance}</div>
            </div>
          </div>
        </div>

        {/* Daily Achievements Carousel */}
        <div className=" p-4 mb-6 overflow-x-auto">
          <h3 className="text-3xl font-semibold font-['Baloo_2'] text-gray-800 mb-4">Daily Summary</h3>
          <div className="flex space-x-4 p-2">
            {dailyAchievements.map((achievement, index) => (
              <div key={index} className={`flex-shrink-0 w-44 rounded-xl p-4 flex flex-col items-center text-center ${index === 0 ? 'bg-[#FF9E1D]' : index === 1 ? 'bg-[#AD1F23]' : 'bg-[#1F4E79]'}`}>
                <img 
                  src={`/BPI assets/badges/badge-${index + 1}.png`} 
                  alt={achievement.badge}
                  className="w-18 h-18 mb-3"
                />
                <div className="text-white font-bold mb-2"> {achievement.badge}</div>
                <div className="text-sm text-white/90">{achievement.task}</div>
                <div className="text-xs text-white/80 mt-2">{achievement.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist Progress */}
        <div className=" p-4">
          <h3 className="text-3xl font-semibold font-['Baloo_2'] text-[#1F4E79] mb-4">Goal Completion</h3>
          <div className="space-y-4">
            {wishlistGoals.map((goal, index) => (
              <div key={index} className="bg-[#D5B527]/20 rounded-xl p-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col mb-2">
                      <span className="font-bold font-['Public_Sans'] text-4xl text-black">{goal.item}</span>
                      <span className="text-3xl font-bold text-black">
                        {Math.round((goal.saved / goal.cost) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#1F4E79"
                        strokeWidth="3"
                        strokeDasharray={`${(goal.saved / goal.cost) * 100}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation
        items={[
          { href: "/parent-app", icon: "/BPI assets/beige-home.png", label: "Home" },
          { href: "/parent-app/monitor", icon: "/BPI assets/list.png", label: "Monitor", isActive: true },
          { href: "/parent-app/rewards", icon: "/BPI assets/beige-piggy-bank.png", label: "Rewards" },
          { href: "/parent-app/profile", icon: "/BPI assets/beige-home.png", label: "Profile" }
        ]}
      />
    </div>
  );
}
