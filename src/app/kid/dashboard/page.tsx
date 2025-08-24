"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TaskStore, Task } from "../../../lib/taskStore";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import BalanceCard from "../../../components/kid/BalanceCard";
import Image from "next/image";

export default function Dashboard() {
  const [balance, setBalance] = useState(50.0);
  const [level] = useState(3);
  const [xp] = useState(250);
  const [xpToNext] = useState(300);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  useEffect(() => {
    setAssignedTasks(TaskStore.getTasks());

    const handleTasksUpdate = () => {
      setAssignedTasks(TaskStore.getTasks());
    };

    window.addEventListener("tasks-updated", handleTasksUpdate);
    return () => window.removeEventListener("tasks-updated", handleTasksUpdate);
  }, []);

  const newTasksCount = assignedTasks.filter((t) => t.isNew).length;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat pb-20" style={{backgroundImage: "url('/BPI assets/kids-dashboard-bg.png')"}}>
      <div className="max-w-md mx-auto p-4">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <Link
              href="/"
              className="flex items-center justify-center"
            >
              <div className="w-32 h-16 sm:w-40 sm:h-20">
                <Image 
                src="/BPI assets/sandbox name w logo.png" 
                alt="BPI Logo" 
                width={180}
                height={100}
                className="object-contain"
                />
              </div>
            </Link>
            <Link
              href="/parent-app"
              className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 transition-all text-xs sm:text-sm font-medium"
            >
              Parent
            </Link>
          </div>
          <div className=" sm:p-2 mb-4 sm:mb-1">
            <h1 className="text-3xl sm:text-5xl  text-black mb-2 tracking-tight text-left font-['Baloo_2'] font-extrabold">
              Hi, Kid!{" "}
            </h1>
          </div>
          <BalanceCard balance={balance} />
        </header>
        <div className="flex flex-col items-center mb-4">
          <Image
            src="/BPI assets/jar.png"
            alt="level jar"
            width={100}
            height={100}
          />
          <p className="text-2xl text-[#1F4E79] mt-2">Level</p>
        </div>

        {/* Badge Wall */}
        <div className="bg-[#0A2540] rounded-2xl shadow-xl p-4 w-full">
          <h3 className="text-lg font-medium font-['Baloo_2'] text-white mb-3 text-center">Badge Wall</h3>
          <div className="flex justify-center space-x-4">
            <div className="flex flex-col items-center">
              <Image src="/BPI assets/star badge.png" alt="Gold Star Badge" width={100} height={100} />
            </div>
            <div className="flex flex-col items-center">
              <Image src="/BPI assets/certified toy tamer.png" alt="Toy Tamer Badge" width={100} height={100} />
            </div>
            <div className="flex flex-col items-center">
              <Image src="/BPI assets/power brain champ badge.png" alt="Brain Champ Badge" width={100} height={100} />
            </div>
          </div>
        </div>

        {/* New Task Notification */}
        {newTasksCount > 0 && (
          <div className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">New Task Assigned! 🎉</h3>
                <p className="text-sm opacity-90">
                  {newTasksCount} new task{newTasksCount > 1 ? "s" : ""} from
                  your parent
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation
        items={[
          {
            href: "/kid/dashboard",
            icon: "/BPI assets/beige-home.png",
            label: "Home",
            isActive: true,
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
