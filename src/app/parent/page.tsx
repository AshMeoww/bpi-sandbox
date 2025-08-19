"use client";
import { useState } from "react";
import Link from "next/link";

type Transaction = {
  id: number;
  type: "deposit" | "withdrawal";
  amount: number;
  description: string;
  date: string;
};

export default function ParentDashboard() {
  const [childBalance] = useState(50.00);
  const [transactions] = useState<Transaction[]>([
    { id: 1, type: "deposit", amount: 20, description: "Weekly Allowance", date: "2024-01-15" },
    { id: 2, type: "deposit", amount: 25, description: "Task: Clean Room", date: "2024-01-14" },
    { id: 3, type: "deposit", amount: 15, description: "Quiz: Money Basics", date: "2024-01-13" },
    { id: 4, type: "withdrawal", amount: 5, description: "Candy Store", date: "2024-01-12" },
    { id: 5, type: "deposit", amount: 15, description: "Task: Help with Dishes", date: "2024-01-11" },
    { id: 6, type: "deposit", amount: 30, description: "Birthday Gift", date: "2024-01-10" },
  ]);
  const [childActivity] = useState([
    { action: "Completed learning card: Interest", time: "2 hours ago", type: "learn" },
    { action: "Finished task: Clean Room", time: "3 hours ago", type: "task" },
    { action: "Started Money Quiz", time: "1 day ago", type: "quiz" },
  ]);
  const [spendingLimit, setSpendingLimit] = useState(25);
  const [allowance, setAllowance] = useState(10);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskReward, setNewTaskReward] = useState("");
  const [newTaskBadge, setNewTaskBadge] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([
    { id: 1, title: "Clean your room", reward: 25, badge: "Helper", status: "pending", assignedDate: "2024-01-16" },
    { id: 2, title: "Help with groceries", reward: 20, badge: "", status: "completed", assignedDate: "2024-01-15" },
  ]);

  const totalSpentThisWeek = transactions
    .filter(t => t.type === "withdrawal" && new Date(t.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    .reduce((sum, t) => sum + t.amount, 0);

  const handleCreateTask = () => {
    if (!newTaskTitle || !newTaskReward) return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      reward: Number(newTaskReward),
      badge: newTaskBadge,
      status: "pending" as const,
      assignedDate: new Date().toISOString().split('T')[0]
    };
    
    setAssignedTasks([newTask, ...assignedTasks]);
    setNewTaskTitle("");
    setNewTaskReward("");
    setNewTaskBadge("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-md mx-auto sm:max-w-7xl">
        <header className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <Link href="/" className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center">
              {/* [PARENT_DASHBOARD_ICON_PLACEHOLDER] */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full"></div>
            </Link>
            <Link href="/dashboard" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-white/30 transition-all font-medium text-sm sm:text-base">
              Kid's View
            </Link>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">Hello, Maria! 👩</h1>
            <p className="text-white/80 text-sm sm:text-lg">Here's Alex's learning progress</p>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          {/* Child's Balance - Small */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="text-xs font-bold text-gray-600 mb-1">Child's Balance</div>
            <div className="text-2xl font-black text-green-600">₱{childBalance.toFixed(2)}</div>
            <div className="text-xs text-green-700">Available</div>
          </div>

          {/* Weekly Spending - Small */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="text-xs font-bold text-gray-600 mb-1">Weekly Spending</div>
            <div className="text-2xl font-black text-orange-600">₱{totalSpentThisWeek.toFixed(2)}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((totalSpentThisWeek / spendingLimit) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-orange-700 mt-1">of ₱{spendingLimit}</div>
          </div>

          {/* Allowance - Small */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="text-xs font-bold text-gray-600 mb-1">Allowance</div>
            <div className="text-2xl font-black text-blue-600">₱{allowance.toFixed(2)}</div>
            <div className="text-xs text-blue-700">Per week</div>
          </div>

          {/* Live Activity - Small */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="text-xs font-bold text-gray-600 mb-2">Live Activity</div>
            {childActivity.length > 0 && (
              <div>
                <div className="text-sm font-bold text-gray-800 mb-1">{childActivity[0].action.split(':')[0]}</div>
                <div className="text-xs text-gray-500">{childActivity[0].time}</div>
              </div>
            )}
          </div>
        </div>

        {/* Create Task - Full Width */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Assign New Task</h3>
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
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
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

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Weekly Spending Limit</label>
              <input
                type="number"
                value={spendingLimit}
                onChange={(e) => setSpendingLimit(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-bold text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Weekly Allowance</label>
              <input
                type="number"
                value={allowance}
                onChange={(e) => setAllowance(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-bold text-black"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg">
              Send Allowance Now
            </button>
          </div>
        </div>

        {/* Transaction History - Full Width */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Transaction History</h3>
            <div className="text-sm text-gray-600">{transactions.length} total</div>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === "deposit" ? "bg-green-100" : "bg-red-100"
                  }`}>
                    <div className={`w-4 h-4 rounded ${
                      transaction.type === "deposit" ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{transaction.description}</div>
                    <div className="text-xs text-gray-500">{transaction.date}</div>
                  </div>
                </div>
                <div className={`font-black text-lg ${
                  transaction.type === "deposit" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "deposit" ? "+" : "-"}₱{transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}