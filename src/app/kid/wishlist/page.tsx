"use client";
import { useState } from "react";
import Link from "next/link";

export default function Wishlist() {
  const [balance] = useState(50.00);
  const [wishlist] = useState([
    { id: 1, item: "New Bike", price: 2500, saved: balance, icon: "🚲", priority: "high" },
    { id: 2, item: "Video Game", price: 1200, saved: 0, icon: "🎮", priority: "medium" },
    { id: 3, item: "Art Supplies", price: 800, saved: 0, icon: "🎨", priority: "low" },
    { id: 4, item: "New Phone", price: 8000, saved: 0, icon: "📱", priority: "low" },
    { id: 5, item: "Skateboard", price: 1500, saved: 0, icon: "🛹", priority: "medium" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 pb-20">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
            </Link>
            <Link href="/parent-app" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/30 transition-all text-xs font-medium">
              Parent
            </Link>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <h1 className="text-3xl font-black text-white mb-2">My Wishlist ✨</h1>
            <p className="text-white/80 text-sm">Things I want to save for!</p>
          </div>
        </header>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.item}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-black text-purple-600">₱{item.price}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.priority === 'high' ? 'bg-red-100 text-red-600' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-600">
                    {Math.round((item.saved / item.price) * 100)}%
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>₱{item.saved} saved</span>
                  <span>₱{item.price - item.saved} to go</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((item.saved / item.price) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {item.saved > 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="text-sm font-bold text-green-800">Great progress! 🎉</div>
                  <div className="text-xs text-green-600">
                    {item.saved >= item.price ? "You can buy this now!" : 
                     `Save ₱${Math.ceil((item.price - item.saved) / 4)} per week to get this in a month!`}
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <div className="text-sm font-bold text-blue-800">Start saving! 💪</div>
                  <div className="text-xs text-blue-600">
                    Save ₱{Math.ceil(item.price / 20)} per week to get this in 5 months!
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link href="/kid/dashboard" className="flex flex-col items-center py-2 px-3 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs font-medium text-gray-600">Home</span>
          </Link>
          <Link href="/kid/tasks" className="flex flex-col items-center py-2 px-3 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs font-medium text-gray-600">Tasks</span>
          </Link>
          <div className="flex flex-col items-center py-2 px-3 rounded-xl bg-purple-100">
            <div className="w-6 h-6 bg-purple-500 rounded mb-1"></div>
            <span className="text-xs font-bold text-purple-600">Wishlist</span>
          </div>
          <Link href="/kid/profile" className="flex flex-col items-center py-2 px-3 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
            <span className="text-xs font-medium text-gray-600">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}