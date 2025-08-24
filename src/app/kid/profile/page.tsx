"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";
import { TaskStore, Task } from "../../../lib/taskStore";
import { BalanceStore } from "../../../lib/balanceStore";
import { UserStore } from "../../../lib/userStore";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [balance, setBalance] = useState(125.5);

  useEffect(() => {
    const updateData = () => {
      setTasks(TaskStore.getTasks());
      setBalance(BalanceStore.getBalance());
    };
    
    updateData();
    window.addEventListener('tasks-updated', updateData);
    window.addEventListener('balance-updated', updateData);
    return () => {
      window.removeEventListener('tasks-updated', updateData);
      window.removeEventListener('balance-updated', updateData);
    };
  }, []);

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const totalEarned = completedTasks.reduce((sum, t) => sum + t.reward, 0);
  
  const userData = UserStore.getUserData();
  
  const profileData = {
    name: userData.nickname,
    age: 10,
    level: 3,
    xp: 750,
    balance: balance,
    badges: ["First Saver", "Task Master", "Quiz Champion"],
    joinDate: "2024-01-10",
  };

  const activitySummary = {
    totalEarned: totalEarned,
    totalSpent: 0,
    tasksCompleted: completedTasks.length,
    quizzesCompleted: 8,
    badgesEarned: 3,
    daysActive: 15,
  };

  const recentTransactions = completedTasks.slice(0, 5).map(task => ({
    type: "deposit" as const,
    amount: task.reward,
    description: `Task: ${task.title}`,
    date: task.assignedDate,
  }));

  const handleSendReceipt = () => {
    if (!email) return;
    setShowEmailSent(true);
    setTimeout(() => setShowEmailSent(false), 3000);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 pb-20" style={{backgroundImage: "url('/BPI assets/kids-dashboard-bg.png')"}}>
      <div className="max-w-md mx-auto">
      <header className="text-center mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <Logo />
            <Link
              href="/parent-app"
              className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 transition-all text-xs sm:text-sm font-medium"
            >
              Parent
            </Link>
          </div>
        </header>

        {/* Profile Status */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16  rounded-full flex items-center justify-center">
              <Image
                src={userData.avatar}
                alt="Kid"
                width={64}  
                height={64}
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {profileData.name}
              </h2>
              <p className="text-gray-600">
                Age {profileData.age} • Level {profileData.level}
              </p>
              <p className="text-sm text-gray-500">
                Member since {profileData.joinDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#E984FF] rounded-xl p-3">
              <div className="text-2xl font-bold text-purple-600">
                ₱{profileData.balance}
              </div>
              <div className="text-xs text-purple-700">Current Balance</div>
            </div>
            <div className="bg-[#FFD06B] rounded-xl p-3">
              <div className="text-2xl font-bold text-orange-600">
                {profileData.xp} XP
              </div>
              <div className="text-xs text-orange-700">Experience Points</div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-[#264653] rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-4">
            Activity Summary
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-[#6BFF8B] rounded-xl">
              <div className="text-xl font-bold text-green-600">
                ₱{activitySummary.totalEarned}
              </div>
              <div className="text-xs text-green-700">Total Earned</div>
            </div>
            <div className="text-center p-3 bg-[#FF6B6D] rounded-xl">
              <div className="text-xl font-bold text-red-600">
                ₱{activitySummary.totalSpent}
              </div>
              <div className="text-xs text-red-700">Total Spent</div>
            </div>
            <div className="text-center p-3 bg-[#6B95FF]  rounded-xl">
              <div className="text-xl font-bold text-blue-600">
                {activitySummary.tasksCompleted}
              </div>
              <div className="text-xs text-blue-700">Tasks Done</div>
            </div>
            <div className="text-center p-3 bg-[#F5FF6B] rounded-xl">
              <div className="text-xl font-bold text-yellow-600">
                {activitySummary.badgesEarned}
              </div>
              <div className="text-xs text-yellow-700">Badges Earned</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <div className="font-bold text-gray-800 text-sm">
                    {transaction.description}
                  </div>
                  <div className="text-xs text-gray-500">
                    {transaction.date}
                  </div>
                </div>
                <div
                  className={`font-bold ${
                    transaction.type === "deposit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "deposit" ? "+" : "-"}₱
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Receipt */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Send Activity Report
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get a summary of your learning progress sent to your parent's email
          </p>
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
              className="w-full bg-[#44E762] text-white py-3 rounded-xl font-bold shadow-lg"
            >
              Send Report
            </button>
            {showEmailSent && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-green-800 text-sm font-bold">
                  ✓ Activity report sent successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation
        items={[
          { href: "/kid/dashboard", icon: "/BPI assets/beige-home.png", label: "Home" },
          { href: "/kid/tasks", icon: "/BPI assets/beige-piggy-bank.png", label: "Tasks" },
          { href: "/kid/wishlist", icon: "/BPI assets/beige-star.png", label: "Wishlist" },
          { href: "/kid/profile", icon: UserStore.getUserData().avatar, label: "Profile", isActive: true, isAvatar: true }
        ]}
      />
    </div>
  );
}