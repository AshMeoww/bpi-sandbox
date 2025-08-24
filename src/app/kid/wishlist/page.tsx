"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";

export default function Wishlist() {
  const [balance] = useState(50.0);
  const [wishlist] = useState([
    {
      id: 1,
      item: "New Bike",
      price: 2500,
      saved: balance,
      icon: "",
      priority: "high",
      image: "/BPI assets/bicycle.png"
    },
    {
      id: 2,
      item: "Jelly Cat", 
      price: 1200,
      saved: 0,
      icon: "",
      priority: "medium",
      image: "/BPI assets/jellycat.png"
    }
  ]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-20"
      style={{ backgroundImage: "url('/BPI assets/kids-dashboard-bg.png')" }}
    >
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Logo />
            <Link
              href="/parent-app"
              className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/30 transition-all text-xs font-medium"
            >
              Parent
            </Link>
          </div>
          <div className="p-4 mb-4">
            <h1 className="text-5xl font-extrabold font-['Baloo_2'] text-black mb-2">WISH LIST</h1>
          </div>
        </header>

        <div className="mb-4 flex justify-end">
          <button className="bg-[#AD1F23] rounded-full px-4 py-2 text-white font-semibold shadow-lg transition-colors flex items-center gap-2">
            <span className="text-xl">+</span>
            <span>Add Wishlist</span>
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-[#1F4E79] backdrop-blur-md rounded-2xl shadow-xl p-4 relative">
              <div className="flex flex-col relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-white text-2xl">{item.item}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-black text-white">
                          ₱{item.price}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            item.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : item.priority === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-white">
                      {Math.round((item.saved / item.price) * 100)}%
                    </div>
                  </div>
                </div>

                <div className="w-full rounded-lg overflow-hidden mb-4">
                  <Image 
                    src={item.image}
                    alt={item.item}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-white mb-1">
                    <span>₱{item.saved} saved</span>
                    <span>₱{item.price - item.saved} to go</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#D5B527] to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (item.saved / item.price) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {item.saved > 0 ? (
                  <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl p-3">
                    <div className="text-sm font-bold text-green-800">
                      Great progress! 🎉
                    </div>
                    <div className="text-xs text-green-600">
                      {item.saved >= item.price
                        ? "You can buy this now!"
                        : `Save ₱${Math.ceil(
                            (item.price - item.saved) / 4
                          )} per week to get this in a month!`}
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-3">
                    <div className="text-sm font-bold text-blue-800">
                      Start saving! 💪
                    </div>
                    <div className="text-xs text-blue-600">
                      Save ₱{Math.ceil(item.price / 20)} per week to get this in 5
                      months!
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation
        items={[
          {
            href: "/kid/dashboard",
            icon: "/BPI assets/beige-home.png",
            label: "Home",
          },
          {
            href: "/kid/tasks",
            icon: "/BPI assets/beige-piggy-bank.png",
            label: "Tasks",
          },
          {
            href: "/kid/wishlist",
            icon: "/BPI assets/beige-star.png",
            label: "Wishlist",
            isActive: true,
          },
          {
            href: "/kid/profile",
            icon: "/BPI assets/beige-home.png",
            label: "Profile",
          },
        ]}
      />
    </div>
  );
}
