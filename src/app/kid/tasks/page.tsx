"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TaskStore, Task as AssignedTask } from "../../../lib/taskStore";
import { BalanceStore } from "../../../lib/balanceStore";
import { UserStore } from "../../../lib/userStore";
import BottomNavigation from "../../../components/shared/BottomNavigation";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";

type Task = {
  id: number;
  type: "chore" | "quiz" | "milestone";
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  icon: string;
};

export default function Tasks() {
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, type: "chore", title: "Clean Your Room", description: "Make your bed and organize your toys", reward: 25, completed: false, icon: "🛏️" },
    { id: 2, type: "chore", title: "Help with Dishes", description: "Help wash or dry the dishes after dinner", reward: 20, completed: true, icon: "🍽️" },
    { id: 3, type: "quiz", title: "Money Quiz", description: "Answer 5 questions about saving money", reward: 15, completed: false, icon: "🧠" },
    { id: 4, type: "milestone", title: "First Week", description: "Complete your first week of saving", reward: 50, completed: false, icon: "🏆" },
    { id: 5, type: "chore", title: "Take Out Trash", description: "Help take the trash bins outside", reward: 15, completed: false, icon: "🗑️" },
    { id: 6, type: "quiz", title: "Needs vs Wants", description: "Learn the difference between needs and wants", reward: 20, completed: false, icon: "🤔" }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);

  const quizQuestions = [
    { question: "Which is a NEED?", options: ["Candy", "Food", "Toys", "Games"], correct: 1 },
    { question: "What should you do with money you earn?", options: ["Spend it all", "Save some", "Give it away", "Hide it"], correct: 1 },
    { question: "How often should you save money?", options: ["Never", "Only on birthdays", "Regularly", "When you feel like it"], correct: 2 }
  ];

  const completeTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    setSelectedTask(null);
    setQuizStep(0);
    setScore(0);
  };

  const markTaskAsRead = (taskId: number) => {
    TaskStore.updateTask(taskId, { isNew: false });
  };

  useEffect(() => {
    // Mark new tasks as read after 3 seconds
    const newTasks = assignedTasks.filter(t => t.isNew);
    if (newTasks.length > 0) {
      const timer = setTimeout(() => {
        newTasks.forEach(task => markTaskAsRead(task.id));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [assignedTasks]);

  const handleQuizAnswer = (answerIndex: number) => {
    if (answerIndex === quizQuestions[quizStep].correct) {
      setScore(score + 1);
    }
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      if (score >= 2) {
        completeTask(selectedTask!.id);
      } else {
        setQuizStep(0);
        setScore(0);
      }
    }
  };

  useEffect(() => {
    setAssignedTasks(TaskStore.getTasks());
    
    const handleTasksUpdate = () => {
      setAssignedTasks(TaskStore.getTasks());
    };
    
    window.addEventListener('tasks-updated', handleTasksUpdate);
    return () => window.removeEventListener('tasks-updated', handleTasksUpdate);
  }, []);

  const totalEarned = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.reward, 0);
  const availableTasks = tasks.filter(t => !t.completed);
  const pendingAssignedTasks = assignedTasks.filter(t => t.status === 'pending');
  const completedAssignedTasks = assignedTasks.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat pb-20" style={{backgroundImage: "url('/BPI assets/kids-dashboard-bg.png')"}}>
      <div className="max-w-md mx-auto p-4">
        <header className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Logo />
            <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-bold">
              Earned: ₱{totalEarned}
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-5xl font-extrabold font-['Baloo_2'] text-black">TASKS</h1>
          </div>
        </header>

        {/* Assigned Tasks from Parent */}
        {pendingAssignedTasks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">New Tasks from Parent!</h2>
            {pendingAssignedTasks.map((task) => (
              <div key={task.id} className="bg-[#FFD103] rounded-2xl shadow-xl p-4 mb-4 relative">
                {task.isNew && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    NEW!
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold font-['Baloo_2'] text-gray-800 text-2xl">{task.title}</h3>
                    <div className="flex flex-col space-y-2 mt-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white w-fit">
                        FROM PARENT
                      </span>
                      <span className="text-green-600 font-['Public_Sans'] font-bold">Earn: ₱{task.reward}</span>
                      {task.badge && (
                        <span className="text-purple-600 font-['Public_Sans'] text-sm">+ {task.badge} Badge</span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      TaskStore.updateTask(task.id, { status: 'completed', isNew: false });
                      BalanceStore.addToBalance(task.reward);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-600 transition-colors"
                  >
                    Complete!
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Tasks */}
        {completedAssignedTasks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Tasks</h2>
            {completedAssignedTasks.map((task) => (
              <div key={task.id} className="bg-green-100 rounded-2xl shadow-xl p-4 mb-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold font-['Baloo_2'] text-gray-800 text-2xl">{task.title}</h3>
                    <div className="flex flex-col space-y-2 mt-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white w-fit font-['Baloo_2']">
                        COMPLETED ✓
                      </span>
                      <span className="text-green-600 font-['Public_Sans'] font-bold">Earned: ₱{task.reward}</span>
                      {task.badge && (
                        <span className="text-purple-600 font-['Public_Sans'] text-sm">+ {task.badge} Badge</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image 
                      src="/BPI assets/staar.png"
                      alt="pink star"
                      width={60}
                      height={60}
                      className="animate-pulse"
                    />
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <BottomNavigation
        items={[
          { href: "/kid/dashboard", icon: "/BPI assets/beige-home.png", label: "Home" },
          { href: "/kid/tasks", icon: "/BPI assets/beige-piggy-bank.png", label: "Tasks", isActive: true },
          { href: "/kid/wishlist", icon: "/BPI assets/beige-star.png", label: "Wishlist" },
          { href: "/kid/profile", icon: UserStore.getUserData().avatar, label: "Profile", isAvatar: true }
        ]}
      />
    </div>
  );
}
