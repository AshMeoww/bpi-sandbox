"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";
import { WishlistStore, WishlistItem } from "../../../lib/wishlistStore";
import { BalanceStore } from "../../../lib/balanceStore";
import { UserStore } from "../../../lib/userStore";

export default function Wishlist() {
  const [balance, setBalance] = useState(50.0);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", amount: "", photo: "" });

  useEffect(() => {
    setBalance(BalanceStore.getBalance());
    setWishlist(WishlistStore.getWishlist());
    
    const handleWishlistUpdate = () => setWishlist(WishlistStore.getWishlist());
    const handleBalanceUpdate = () => setBalance(BalanceStore.getBalance());
    
    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    window.addEventListener('balance-updated', handleBalanceUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
      window.removeEventListener('balance-updated', handleBalanceUpdate);
    };
  }, []);

  const handleAddWish = () => {
    if (!formData.name.trim() || !formData.amount || Number(formData.amount) <= 0) return;
    
    WishlistStore.addWishlistItem({
      name: formData.name.trim(),
      amount: Number(formData.amount),
      photo: formData.photo || "/BPI assets/bicycle.png"
    });
    
    setFormData({ name: "", amount: "", photo: "" });
    setShowForm(false);
  };

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
          <button 
            onClick={() => setShowForm(true)}
            className="bg-[#AD1F23] rounded-full px-4 py-2 text-white font-semibold shadow-lg transition-colors flex items-center gap-2 hover:bg-[#8B1A1D]"
          >
            <span className="text-xl">+</span>
            <span>Add Wishlist</span>
          </button>
        </div>

        {/* Add Wishlist Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Wish</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="What do you want?"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-black"
                />
                <input
                  type="number"
                  placeholder="How much does it cost?"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-black"
                />
                <input
                  type="text"
                  placeholder="Photo URL (optional)"
                  value={formData.photo}
                  onChange={(e) => setFormData({...formData, photo: e.target.value})}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-black"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddWish}
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-[#AD1F23] hover:bg-[#8B1A1D] transition-colors"
                  >
                    Add Wish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        <div className="space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No wishes yet!</p>
              <p className="text-gray-500 text-sm">Add your first wish to start saving!</p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="bg-[#1F4E79] backdrop-blur-md rounded-2xl shadow-xl p-4 relative">
                <div className="flex flex-col relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h3 className="font-bold text-white text-2xl">{item.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-black text-white">
                            ₱{item.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">
                        {Math.round((balance / item.amount) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div className="w-full rounded-lg overflow-hidden mb-4">
                    <Image 
                      src={item.photo}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-white mb-1">
                      <span>₱{balance} saved</span>
                      <span>₱{Math.max(0, item.amount - balance)} to go</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#D5B527] to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((balance / item.amount) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {balance >= item.amount ? (
                    <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl p-3">
                      <div className="text-sm font-bold text-green-800">
                        You can buy this now! 🎉
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-3">
                      <div className="text-sm font-bold text-blue-800">
                        Keep saving! 💪
                      </div>
                      <div className="text-xs text-blue-600">
                        You need ₱{item.amount - balance} more!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
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
            icon: UserStore.getUserData().avatar,
            label: "Profile",
            isAvatar: true,
          },
        ]}
      />
    </div>
  );
}
