"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";
import { TaskStore, Task } from "../../../lib/taskStore";
import { BalanceStore } from "../../../lib/balanceStore";
import { UserStore } from "../../../lib/userStore";

export default function ParentProfile() {
  const [email, setEmail] = useState("");
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const updateTasks = () => {
      setTasks(TaskStore.getTasks());
    };
    
    updateTasks();
    window.addEventListener('tasks-updated', updateTasks);
    return () => window.removeEventListener('tasks-updated', updateTasks);
  }, []);

  const userData = UserStore.getUserData();
  
  const profileData = {
    name: userData.nickname,
    childName: userData.nickname,
    joinDate: "2024-01-10",
    childAge: 10,
    childLevel: 3,
  };

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const totalEarned = completedTasks.reduce((sum, t) => sum + t.reward, 0);
  
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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 pb-20" style={{backgroundImage: "url('/BPI assets/parents-dashboard.png')"}}>
      <div className="max-w-md mx-auto">
      <header className="text-center mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <Logo />
            <Link
              href="/kid/dashboard"
              className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 transition-all text-xs sm:text-sm font-medium"
            >
              Kid's View
            </Link>
          </div>
        </header>

        {/* Profile Status */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16  rounded-full flex items-center justify-center">
              <Image
                src={userData.avatar}
                alt="Parent"
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
                Parent of {profileData.childName}
              </p>
              <p className="text-sm text-gray-500">
                Member since {profileData.joinDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5ADFF] rounded-xl p-3">
              <div className="text-2xl font-bold text-[#E308C2]">
                Level {profileData.childLevel}
              </div>
              <div className="text-xs text-[#E308C2]">{profileData.childName}'s Level</div>
            </div>
            <div className="bg-[#FFE2AD] rounded-xl p-3">
              <div className="text-2xl font-bold text-[#E37908]">
                {profileData.childAge} years
              </div>
              <div className="text-xs text-[#E37908]">Child's Age</div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-[#264653] rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-4">
            {userData.nickname}'s Summary
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-[#ADFFBE] rounded-xl">
              <div className="text-xl font-bold text-[#08E342]">
                ₱{activitySummary.totalEarned}
              </div>
              <div className="text-xs text-[#08E342]">Total Earned</div>
            </div>
            <div className="text-center p-3 bg-[#FFADAD] rounded-xl">
              <div className="text-xl font-bold text-[#FF5B5B]">
                ₱{activitySummary.totalSpent}
              </div>
              <div className="text-xs text-[#FF5B5B]">Total Spent</div>
            </div>
            <div className="text-center p-3 bg-[#ADDFFF]  rounded-xl">
              <div className="text-xl font-bold text-[#5B84FF]">
                {activitySummary.tasksCompleted}
              </div>
              <div className="text-xs text-[#5B84FF]">Tasks Done</div>
            </div>
            <div className="text-center p-3 bg-[#F7FFAD] rounded-xl">
              <div className="text-xl font-bold text-[#EDB600]">
                {activitySummary.badgesEarned}
              </div>
              <div className="text-xs text-[#EDB600]">Badges Earned</div>
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
            Send Monthly Report
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get a detailed summary of {userData.nickname}'s learning progress and financial activity
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
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
                  ✓ Monthly report sent successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation
        items={[
          { href: "/parent-app", icon: "/BPI assets/beige-home.png", label: "Home" },
          { href: "/parent-app/monitor", icon: "/BPI assets/list.png", label: "Monitor" },
          { href: "/parent-app/rewards", icon: "/BPI assets/beige-piggy-bank.png", label: "Rewards" },
          { href: "/parent-app/profile", icon: UserStore.getUserData().avatar, label: "Profile", isActive: true, isAvatar: true }
        ]}
      />
    </div>
  );
}