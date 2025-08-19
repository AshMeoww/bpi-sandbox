"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TaskStore, Task as AssignedTask } from "../../../lib/taskStore";

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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 pb-20">
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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <h1 className="text-2xl font-black text-white">Earn Money</h1>
            <p className="text-white/80 text-sm">Complete tasks to earn rewards!</p>
          </div>
        </header>

        {!selectedTask ? (
          <div className="space-y-4">
            {/* Assigned Tasks from Parent */}
            {pendingAssignedTasks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Tasks from Parent</h3>
                <div className="space-y-3">
                  {pendingAssignedTasks.map((task) => (
                    <div key={task.id} className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">👨‍👩‍👧‍👦</div>
                          <div>
                            <h3 className="font-bold text-gray-800">{task.title}</h3>
                            <p className="text-sm text-gray-600">Assigned by parent</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="px-2 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-600">
                                PARENT TASK
                              </span>
                              <span className="text-green-600 font-bold">₱{task.reward}</span>
                              {task.badge && <span className="text-blue-600 text-xs">+ {task.badge} badge</span>}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            TaskStore.updateTask(task.id, { status: 'completed', isNew: false });
                            setAssignedTasks(TaskStore.getTasks());
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 transition-all"
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Regular Tasks */}
            {availableTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{task.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          task.type === "chore" ? "bg-blue-100 text-blue-600" :
                          task.type === "quiz" ? "bg-purple-100 text-purple-600" :
                          "bg-yellow-100 text-yellow-600"
                        }`}>
                          {task.type.toUpperCase()}
                        </span>
                        <span className="text-green-600 font-bold">₱{task.reward}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 transition-all"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}

            {availableTasks.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">All Done!</h3>
                <p className="text-gray-600 mb-4">You've completed all available tasks. Great job!</p>
                <Link href="/kid/dashboard" className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold">
                  Back to Dashboard
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {selectedTask.type === "quiz" ? (
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedTask.title}</h3>
                
                {quizStep < quizQuestions.length ? (
                  <div>
                    <p className="text-gray-600 mb-6">Question {quizStep + 1} of {quizQuestions.length}</p>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">{quizQuestions[quizStep].question}</h4>
                    <div className="space-y-3">
                      {quizQuestions[quizStep].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">
                      {score >= 2 ? "Great job! 🎉" : "Try again! 💪"}
                    </h4>
                    <p className="text-gray-600 mb-4">You got {score} out of {quizQuestions.length} correct.</p>
                    {score < 2 && (
                      <button
                        onClick={() => {setQuizStep(0); setScore(0);}}
                        className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold"
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedTask.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedTask.title}</h3>
                <p className="text-gray-600 mb-6">{selectedTask.description}</p>
                <p className="text-sm text-gray-500 mb-6">Ask a parent to confirm you completed this task!</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => completeTask(selectedTask.id)}
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold"
                  >
                    Mark Complete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link href="/kid/dashboard" className="flex flex-col items-center py-2 px-3 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs font-medium text-gray-600">Home</span>
          </Link>
          <div className="flex flex-col items-center py-2 px-3 rounded-xl bg-green-100">
            <div className="w-6 h-6 bg-green-500 rounded mb-1"></div>
            <span className="text-xs font-bold text-green-600">Tasks</span>
          </div>
          <Link href="/kid/wishlist" className="flex flex-col items-center py-2 px-3 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs font-medium text-gray-600">Wishlist</span>
          </Link>
          <Link href="/kid/profile" className="flex flex-col items-center py-2 px-3 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
            <span className="text-xs font-medium text-gray-600">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}