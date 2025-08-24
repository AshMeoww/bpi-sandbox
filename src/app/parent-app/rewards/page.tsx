"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";

export default function Rewards() {
  const [kidName] = useState("Alex");
  const [allowanceAmount, setAllowanceAmount] = useState(20);
  const [bonusAmount, setBonusAmount] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskReward, setNewTaskReward] = useState("");
  const [assignedTasks] = useState([
    { id: 1, title: "Clean Room", reward: 25, status: "pending", badge: "Cleaner" },
    { id: 2, title: "Help with Dishes", reward: 15, status: "completed", badge: "" },
    { id: 3, title: "Organize Toys", reward: 20, status: "pending", badge: "Organizer" },
  ]);

  const handleSendAllowance = () => {
    // Handle allowance sending logic
  };

  const handleSendBonus = () => {
    if (!bonusAmount || Number(bonusAmount) <= 0) return;
    setBonusAmount("");
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim() || !newTaskReward || Number(newTaskReward) <= 0) return;
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
        <div className="bg-[#D5B527] rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img src="/BPI assets/red outline wallet.png" alt="Piggy Bank" className="w-8 h-8" />
              <h3 className="text-xl font-bold font-['Baloo_2'] text-black">Send Money</h3>
            </div>
            
            <div className="bg-white/20 rounded-xl p-4 mb-4">
              <p className="text-sm font-['Public_Sans'] font-normal text-black/70 mb-2">Sending to:</p>
              <p className="text-lg font-['Public_Sans'] font-bold text-black">{kidName}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm font-['Public_Sans'] font-normal text-black/70 mb-2">Regular Allowance</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={allowanceAmount}
                    onChange={(e) => setAllowanceAmount(Number(e.target.value))}
                    className="w-20 px-3 py-2 text-black rounded-lg text-center font-['Public_Sans'] font-bold bg-white border-none outline-none placeholder-black/40"
                  />
                  <button 
                    onClick={handleSendAllowance}
                    className="bg-[#AD1F23] px-4 py-2 rounded-lg text-white font-['Public_Sans'] font-bold text-sm hover:bg-[#8B1A1D] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm font-['Public_Sans'] font-normal text-black/70 mb-2">Special Bonus</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={bonusAmount}
                    onChange={(e) => setBonusAmount(e.target.value)}
                    className="w-20 px-3 py-2 rounded-lg text-center font-['Public_Sans'] font-bold bg-white border-none outline-none placeholder-black/40"
                  />
                  <button 
                    onClick={handleSendBonus}
                    className="bg-[#AD1F23] px-4 py-2 rounded-lg text-white font-['Public_Sans'] font-bold text-sm hover:bg-[#8B1A1D] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Task */}
        <div className="bg-[#D5B527] rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <img src="/BPI assets/coins outline.png" alt="Task Icon" className="w-8 h-8" />
            <h3 className="text-xl font-bold font-['Baloo_2'] text-black">Assign New Task</h3>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="mb-4">
              <p className="text-sm font-['Public_Sans'] font-normal text-black/70 mb-2">Task Title</p>
              <input
                type="text"
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full p-3 border-none rounded-xl outline-none text-black font-['Public_Sans'] font-medium bg-white"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm font-['Public_Sans'] font-normal text-black/70 mb-2">Reward Amount</p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="₱ Amount"
                  value={newTaskReward}
                  onChange={(e) => setNewTaskReward(e.target.value)}
                  className="flex-1 p-3 border-none rounded-xl outline-none text-black font-['Public_Sans'] font-medium bg-white"
                />
                <button
                  onClick={handleCreateTask}
                  className="bg-[#AD1F23] px-6 py-3 rounded-xl font-['Public_Sans'] font-bold text-white hover:bg-[#8B1A1D] transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Tasks */}
        <div className="p-4">
          <h3 className="text-3xl font-bold font-['Baloo_2'] text-[#1F4E79] mb-4">Task Progress</h3>
          <div className="space-y-4">
            {assignedTasks.map((task) => (
              <div key={task.id} className="bg-[#D5B527]/20 rounded-xl p-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col mb-2">
                      <span className="font-bold font-['Public_Sans'] text-2xl text-black">{task.title}</span>
                      <span className="text-lg font-['Public_Sans']  text-black">
                        PHP {task.reward} {task.badge && `+ ${task.badge} badge`}
                      </span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-['Public_Sans'] font-bold ${
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
          { href: "/parent-app/profile", icon: "/BPI assets/beige-home.png", label: "Profile" }
        ]}
      />
    </div>
  );
}
