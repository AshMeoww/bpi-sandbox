"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "../../../components/shared/BottomNavigation";

export default function ParentProfile() {
  const [email, setEmail] = useState("");
  const [showEmailSent, setShowEmailSent] = useState(false);

  const parentData = {
    name: "Maria Santos",
    childName: "Alex",
    joinDate: "2024-01-10",
    childAge: 10,
    childLevel: 3
  };

  const childSummary = {
    totalBalance: 125.50,
    totalEarned: 245.50,
    totalSpent: 120.00,
    tasksCompleted: 12,
    quizzesCompleted: 8,
    badgesEarned: 3,
    daysActive: 15,
    weeklySpending: 25.00,
    weeklyLimit: 50.00
  };

  const recentActivity = [
    { type: "task_completed", description: "Alex completed: Clean Room", amount: 25, date: "2024-01-15" },
    { type: "quiz_completed", description: "Alex finished: Money Basics Quiz", amount: 15, date: "2024-01-14" },
    { type: "spending", description: "Alex spent at: Candy Store", amount: -5, date: "2024-01-13" },
    { type: "allowance", description: "Weekly allowance sent", amount: 20, date: "2024-01-12" },
    { type: "reward", description: "Birthday gift added", amount: 30, date: "2024-01-11" }
  ];

  const handleSendReport = () => {
    if (!email) return;
    setShowEmailSent(true);
    setTimeout(() => setShowEmailSent(false), 3000);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <header className="mb-6">
          <Link href="/parent-app" className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
          </Link>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <h1 className="text-2xl font-bold text-white mb-2">Parent Profile</h1>
            <p className="text-white/80 text-sm">Monitor {parentData.childName}'s progress</p>
          </div>
        </header>

        {/* Parent Info */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{parentData.name[0]}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{parentData.name}</h2>
              <p className="text-gray-600">Parent of {parentData.childName}</p>
              <p className="text-sm text-gray-500">Member since {parentData.joinDate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-blue-600">₱{childSummary.totalBalance}</div>
              <div className="text-xs text-blue-700">{parentData.childName}'s Balance</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-green-600">Level {parentData.childLevel}</div>
              <div className="text-xs text-green-700">Learning Progress</div>
            </div>
          </div>
        </div>

        {/* Child Activity Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{parentData.childName}'s Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="text-xl font-bold text-green-600">₱{childSummary.totalEarned}</div>
              <div className="text-xs text-green-700">Total Earned</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <div className="text-xl font-bold text-red-600">₱{childSummary.totalSpent}</div>
              <div className="text-xs text-red-700">Total Spent</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="text-xl font-bold text-blue-600">{childSummary.tasksCompleted}</div>
              <div className="text-xs text-blue-700">Tasks Done</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-xl">
              <div className="text-xl font-bold text-yellow-600">{childSummary.badgesEarned}</div>
              <div className="text-xs text-yellow-700">Badges Earned</div>
            </div>
          </div>
        </div>

        {/* Weekly Spending Status */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Spending</h3>
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">This Week</span>
              <span className="text-sm text-gray-600">₱{childSummary.weeklySpending} / ₱{childSummary.weeklyLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all"
                style={{ width: `${(childSummary.weeklySpending / childSummary.weeklyLimit) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {childSummary.weeklyLimit - childSummary.weeklySpending > 0 
                ? `₱${(childSummary.weeklyLimit - childSummary.weeklySpending).toFixed(2)} remaining this week`
                : "Weekly limit reached"
              }
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-bold text-gray-800 text-sm">{activity.description}</div>
                  <div className="text-xs text-gray-500">{activity.date}</div>
                </div>
                <div className={`font-bold ${activity.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {activity.amount > 0 ? "+" : ""}₱{Math.abs(activity.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Report */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Send Monthly Report</h3>
          <p className="text-sm text-gray-600 mb-4">Get a detailed summary of {parentData.childName}'s learning progress and financial activity</p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-black"
            />
            <button
              onClick={handleSendReport}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-bold shadow-lg"
            >
              Send Report
            </button>
            {showEmailSent && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-green-800 text-sm font-bold">✓ Monthly report sent successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation
        items={[
          { href: "/parent-app", icon: "/BPI assets/beige-home.png", label: "Dashboard" },
          { href: "/parent-app/tasks", icon: "/BPI assets/beige-piggy-bank.png", label: "Tasks" },
          { href: "/parent-app/settings", icon: "/BPI assets/beige-star.png", label: "Settings" },
          { href: "/parent-app/profile", icon: "/BPI assets/beige-home.png", label: "Profile", isActive: true }
        ]}
      />
    </div>
  );
}