"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";

export default function Rewards() {
  const [kidName] = useState("Alex");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskReward, setNewTaskReward] = useState("");
  const [newTaskBadge, setNewTaskBadge] = useState("");
  const [allowanceAmount, setAllowanceAmount] = useState(20);
  const [bonusAmount, setBonusAmount] = useState("");

  const [assignedTasks] = useState([
    { id: 1, title: "Clean Room", reward: 25, status: "pending", badge: "Cleaner" },
    { id: 2, title: "Help with Dishes", reward: 15, status: "completed", badge: "" },
    { id: 3, title: "Organize Toys", reward: 20, status: "pending", badge: "Organizer" },
  ]);

  const handleCreateTask = () => {
    if (!newTaskTitle.trim() || !newTaskReward || Number(newTaskReward) <= 0) return;
    setNewTaskTitle("");
    setNewTaskReward("");
    setNewTaskBadge("");
  };

  const handleSendAllowance = () => {
    // Handle allowance sending logic
  };

  const handleSendBonus = () => {
    if (!bonusAmount || Number(bonusAmount) <= 0) return;
    setBonusAmount("");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 pb-20" style={{backgroundImage: "url('/BPI assets/parents-dashboard-bg.png')"}}>
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Logo />
            <Link href="/kid/dashboard" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/30 transition-all text-xs font-medium">
              Kid's View
            </Link>
          </div>
          <div className="p-4 mb-4">
            <h1 className="text-5xl font-extrabold font-['Baloo_2'] text-black mb-2">REWARDS FOR {kidName.toUpperCase()}</h1>
          </div>
        </header>

        {/* Send Money */}
        <div className="bg-[#FFD103] rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-[#1F4E79] mb-4">Send Money</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button 
              onClick={handleSendAllowance}
              className="bg-green-50 rounded-xl p-3 text-center hover:bg-green-100 transition-colors"
            >
              <div className="text-2xl font-bold text-green-600">₱{allowanceAmount}</div>
              <div className="text-xs text-green-700">Send Allowance</div>
            </button>
            <div className="bg-blue-50 rounded-xl p-3">
              <input
                type="number"
                placeholder="Bonus amount"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
                className="w-full text-center text-lg font-bold text-blue-600 bg-transparent border-none outline-none placeholder-blue-400"
              />
              <button 
                onClick={handleSendBonus}
                className="text-xs text-blue-700 mt-1 w-full"
              >
                Send Bonus
              </button>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <label className="block text-sm font-bold text-[#1F4E79] mb-2">Weekly Allowance Amount</label>
            <input
              type="number"
              value={allowanceAmount}
              onChange={(e) => setAllowanceAmount(Number(e.target.value))}
              className="w-full p-2 rounded-lg border-none outline-none text-center font-bold text-[#1F4E79]"
            />
          </div>
        </div>

        {/* Create Task */}
        <div className="bg-[#FF9E1D] rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-[#1F4E79] mb-4">Assign New Task</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Task title (e.g., Clean your room)"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-black"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Reward (₱)"
                value={newTaskReward}
                onChange={(e) => setNewTaskReward(e.target.value)}
                className="p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-black"
              />
              <select
                value={newTaskBadge}
                onChange={(e) => setNewTaskBadge(e.target.value)}
                className="p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-black"
              >
                <option value="">No Badge</option>
                <option value="Helper">Helper Badge</option>
                <option value="Cleaner">Cleaner Badge</option>
                <option value="Organizer">Organizer Badge</option>
              </select>
            </div>
            <button
              onClick={handleCreateTask}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg"
            >
              Assign Task
            </button>
          </div>
        </div>

        {/* Assigned Tasks */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Assigned Tasks</h3>
          <div className="space-y-3">
            {assignedTasks.map((task) => (
              <div key={task.id} className={`p-3 rounded-xl border-2 ${
                task.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-gray-800">{task.title}</div>
                    <div className="text-sm text-gray-600">₱{task.reward} {task.badge && `+ ${task.badge} badge`}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {task.status === 'completed' ? 'Completed' : 'Pending'}
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
          { href: "/parent-app/monitor", icon: "/BPI assets/list.png", label: "Monitor" },
          { href: "/parent-app/rewards", icon: "/BPI assets/beige-piggy-bank.png", label: "Rewards", isActive: true },
          { href: "/parent-app/profile", icon: "/BPI assets/beige-home.png", label: "Profile" }
        ]}
      />
    </div>
  );
}
