"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TaskStore, Task as AssignedTask } from "../../../lib/taskStore";
import BottomNavigation from "../../../components/shared/BottomNavigation";
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

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat pb-20" style={{backgroundImage: "url('/BPI assets/kids-dashboard-bg.png')"}}>
      <div className="max-w-md mx-auto p-4">
        <header className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </Link>
            <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-bold">
              Earned: ₱{totalEarned}
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-4xl font-bold text-black">TASKS</h1>
          </div>
        </header>

        {/* Example task card */}
        <div>
          <div className="bg-white rounded-2xl shadow-xl p-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative z-10">
                  <h3 className="font-bold text-gray-800 text-2xl">Sweep floor</h3>
                  <p className="text-sm text-gray-600">Sweep the entire floor of your room</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                      DAILY
                    </span>
                    <span className="text-green-600 font-bold">Earn: ₱200</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="absolute right-0 top-0 cursor-pointer transform transition-transform hover:scale-110">
                  <Image 
                    src="/BPI assets/staar.png"
                    alt="pink star"
                    width={120}
                    height={120}
                    className="animate-pulse"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <BottomNavigation
        items={[
          { href: "/kid/dashboard", icon: "/BPI assets/beige-home.png", label: "Home" },
          { href: "/kid/tasks", icon: "/BPI assets/beige-piggy-bank.png", label: "Tasks", isActive: true },
          { href: "/kid/wishlist", icon: "/BPI assets/beige-star.png", label: "Wishlist" },
          { href: "/kid/profile", icon: "/BPI assets/beige-home.png", label: "Profile" }
        ]}
      />
    </div>
  );
}
