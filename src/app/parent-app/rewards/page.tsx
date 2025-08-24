"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";
import { TaskStore, Task } from "../../../lib/taskStore";
import { BalanceStore } from "../../../lib/balanceStore";
import { UserStore } from "../../../lib/userStore";

export default function Rewards() {
  const [kidName, setKidName] = useState("Alex");
  const [allowanceAmount, setAllowanceAmount] = useState("");
  const [bonusAmount, setBonusAmount] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskReward, setNewTaskReward] = useState("");
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const userData = UserStore.getUserData();
    setKidName(userData.nickname);
    setAssignedTasks(TaskStore.getTasks());
    const handleTasksUpdate = () => setAssignedTasks(TaskStore.getTasks());
    window.addEventListener('tasks-updated', handleTasksUpdate);
    return () => window.removeEventListener('tasks-updated', handleTasksUpdate);
  }, []);

  const handleSendAllowance = () => {
    if (!allowanceAmount || Number(allowanceAmount) <= 0) return;
    BalanceStore.addToBalance(Number(allowanceAmount));
    setAllowanceAmount(""); // Reset to empty
  };

  const handleSendBonus = () => {
    if (!bonusAmount || Number(bonusAmount) <= 0) return;
    setBonusAmount("");
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim() || !newTaskReward || Number(newTaskReward) <= 0) return;
    TaskStore.addTask({
      title: newTaskTitle.trim(),
      reward: Number(newTaskReward),
      badge: "",
      status: "pending"
    });
    setNewTaskTitle("");
    setNewTaskReward("");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 pb-20" style={{backgroundImage: "url('/BPI assets/parents-dashboard.png')"}}>
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Logo />
            <Link href="/kid/dashboard" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/30 transition-all text-xs font-['Public_Sans'] font-medium">
              Kid's View
            </Link>
          </div>
        </header>

        {/* Send Money */}
        <div className="bg-[#D5B527] rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <img src="/BPI assets/red outline wallet.png" alt="Wallet" className="w-6 h-6" />
            <h3 className="text-lg font-bold font-['Baloo_2'] text-black">Send Money to {kidName}</h3>
          </div>
          
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Enter amount"
              value={allowanceAmount}
              onChange={(e) => setAllowanceAmount(e.target.value)}
              className="w-full px-3 py-3 text-black rounded-lg text-center font-bold bg-white border-none outline-none"
            />
            <button 
              onClick={handleSendAllowance}
              className="w-full bg-[#AD1F23] py-3 rounded-lg text-white font-bold hover:bg-[#8B1A1D] transition-colors"
            >
              Send Money
            </button>
          </div>
        </div>

        {/* Create Task */}
        <div className="bg-[#FF9E1D] rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <img src="/BPI assets/coins outline.png" alt="Task Icon" className="w-6 h-6" />
            <h3 className="text-lg font-bold font-['Baloo_2'] text-black">Assign New Task</h3>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Task title (e.g., Clean your room)"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-3 border-none rounded-xl outline-none text-black font-medium bg-white"
            />
            <input
              type="number"
              placeholder="Reward (₱)"
              value={newTaskReward}
              onChange={(e) => setNewTaskReward(e.target.value)}
              className="w-full p-3 border-none rounded-xl outline-none text-black font-medium bg-white"
            />
            <button
              onClick={handleCreateTask}
              className="w-full bg-[#AD1F23] py-3 rounded-xl font-bold text-white hover:bg-[#8B1A1D] transition-colors"
            >
              Assign Task
            </button>
          </div>
        </div>

        {/* Assigned Tasks */}
        <div>
          <h3 className="text-xl font-bold font-['Baloo_2'] text-[#1F4E79] mb-3">Task Progress</h3>
          <div className="space-y-3">
            {assignedTasks.map((task) => (
              <div key={task.id} className="bg-white/80 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-bold text-lg text-black block">{task.title}</span>
                    <span className="text-sm text-gray-600">
                      ₱{task.reward} {task.badge && `+ ${task.badge} badge`}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
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
          { href: "/parent-app/profile", icon: UserStore.getUserData().avatar, label: "Profile", isAvatar: true }
        ]}
      />
    </div>
  );
}
