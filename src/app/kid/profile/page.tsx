"use client";
import { useState } from "react";
import Link from "next/link";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [showEmailSent, setShowEmailSent] = useState(false);

  const profileData = {
    name: "Alex",
    age: 10,
    level: 3,
    xp: 750,
    balance: 125.50,
    badges: ["First Saver", "Task Master", "Quiz Champion"],
    joinDate: "2024-01-10"
  };

  const activitySummary = {
    totalEarned: 245.50,
    totalSpent: 120.00,
    tasksCompleted: 12,
    quizzesCompleted: 8,
    badgesEarned: 3,
    daysActive: 15
  };

  const recentTransactions = [
    { type: "deposit", amount: 25, description: "Task: Clean Room", date: "2024-01-15" },
    { type: "deposit", amount: 15, description: "Quiz: Money Basics", date: "2024-01-14" },
    { type: "withdrawal", amount: 5, description: "Candy Store", date: "2024-01-13" },
    { type: "deposit", amount: 20, description: "Weekly Allowance", date: "2024-01-12" },
    { type: "deposit", amount: 30, description: "Birthday Gift", date: "2024-01-11" }
  ];

  const handleSendReceipt = () => {
    if (!email) return;
    setShowEmailSent(true);
    setTimeout(() => setShowEmailSent(false), 3000);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <header className="mb-6">
          <Link href="/kid/dashboard" className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4">
            <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
          </Link>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <h1 className="text-2xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-white/80 text-sm">Your learning journey summary</p>
          </div>
        </header>

        {/* Profile Status */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{profileData.name[0]}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
              <p className="text-gray-600">Age {profileData.age} • Level {profileData.level}</p>
              <p className="text-sm text-gray-500">Member since {profileData.joinDate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-purple-600">₱{profileData.balance}</div>
              <div className="text-xs text-purple-700">Current Balance</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-orange-600">{profileData.xp} XP</div>
              <div className="text-xs text-orange-700">Experience Points</div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Activity Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="text-xl font-bold text-green-600">₱{activitySummary.totalEarned}</div>
              <div className="text-xs text-green-700">Total Earned</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <div className="text-xl font-bold text-red-600">₱{activitySummary.totalSpent}</div>
              <div className="text-xs text-red-700">Total Spent</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="text-xl font-bold text-blue-600">{activitySummary.tasksCompleted}</div>
              <div className="text-xs text-blue-700">Tasks Done</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-xl">
              <div className="text-xl font-bold text-yellow-600">{activitySummary.badgesEarned}</div>
              <div className="text-xs text-yellow-700">Badges Earned</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-bold text-gray-800 text-sm">{transaction.description}</div>
                  <div className="text-xs text-gray-500">{transaction.date}</div>
                </div>
                <div className={`font-bold ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "deposit" ? "+" : "-"}₱{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Receipt */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Send Activity Report</h3>
          <p className="text-sm text-gray-600 mb-4">Get a summary of your learning progress sent to your parent's email</p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Parent's email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-black"
            />
            <button
              onClick={handleSendReceipt}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg"
            >
              Send Report
            </button>
            {showEmailSent && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-green-800 text-sm font-bold">✓ Activity report sent successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around items-center">
            <Link href="/kid/dashboard" className="flex flex-col items-center py-2 px-3 text-gray-400">
              <div className="w-6 h-6 bg-gray-400 rounded-lg mb-1"></div>
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link href="/kid/tasks" className="flex flex-col items-center py-2 px-3 text-gray-400">
              <div className="w-6 h-6 bg-gray-400 rounded-lg mb-1"></div>
              <span className="text-xs font-medium">Tasks</span>
            </Link>
            <Link href="/kid/wishlist" className="flex flex-col items-center py-2 px-3 text-gray-400">
              <div className="w-6 h-6 bg-gray-400 rounded-lg mb-1"></div>
              <span className="text-xs font-medium">Wishlist</span>
            </Link>
            <Link href="/kid/profile" className="flex flex-col items-center py-2 px-3 text-purple-600">
              <div className="w-6 h-6 bg-purple-600 rounded-full mb-1"></div>
              <span className="text-xs font-bold">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}