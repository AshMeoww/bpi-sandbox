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

export default function Dashboard() {
  const [balance, setBalance] = useState(50.00);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [level] = useState(3);
  const [xp] = useState(250);
  const [xpToNext] = useState(300);
  const [badges, setBadges] = useState([
    { id: 1, name: "First Saver", icon: "💰", earned: true, description: "Made your first deposit" },
    { id: 2, name: "Task Master", icon: "✅", earned: true, description: "Completed 5 tasks" },
    { id: 3, name: "Quiz Whiz", icon: "🧠", earned: true, description: "Aced a money quiz" },
    { id: 4, name: "Goal Getter", icon: "🎯", earned: false, description: "Reach your savings goal" },
    { id: 5, name: "Helper", icon: "🤝", earned: true, description: "Completed chores for family" },
    { id: 6, name: "Learner", icon: "📚", earned: false, description: "Complete all learning cards" },
  ]);
  const [assignedTasks, setAssignedTasks] = useState([
    { id: 1, title: "Clean your room", reward: 25, badge: "Helper", status: "pending", assignedDate: "2024-01-16", isNew: true },
    { id: 2, title: "Help with groceries", reward: 20, badge: "", status: "completed", assignedDate: "2024-01-15", isNew: false },
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "deposit", amount: 20, description: "Allowance", date: "2024-01-15" },
    { id: 2, type: "deposit", amount: 30, description: "Birthday money", date: "2024-01-10" },
  ]);
  const [wishlist] = useState([
    { id: 1, item: "New Bike", price: 2500, saved: balance, icon: "🚲" },
    { id: 2, item: "Video Game", price: 1200, saved: 0, icon: "🎮" },
    { id: 3, item: "Art Supplies", price: 800, saved: 0, icon: "🎨" },
  ]);

  const handleTransaction = (type: "deposit" | "withdrawal") => {
    const value = parseFloat(amount);
    if (!value || value <= 0) return;
    
    if (type === "withdrawal" && value > balance) {
      alert("Not enough money in your account!");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type,
      amount: value,
      description: description || (type === "deposit" ? "Money added" : "Money spent"),
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(prev => type === "deposit" ? prev + value : prev - value);
    setAmount("");
    setDescription("");
  };

  const handleCompleteTask = (taskId: number) => {
    const task = assignedTasks.find(t => t.id === taskId);
    if (!task || task.status === 'completed') return;

    // Add reward to balance
    setBalance(prev => prev + task.reward);
    
    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now(),
      type: "deposit",
      amount: task.reward,
      description: `Task: ${task.title}`,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([newTransaction, ...transactions]);

    // Award badge if specified
    if (task.badge) {
      setBadges(prev => prev.map(badge => 
        badge.name === task.badge ? { ...badge, earned: true } : badge
      ));
    }

    // Mark task as completed
    setAssignedTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: 'completed' as const, isNew: false } : t
    ));
  };

  const pendingTasks = assignedTasks.filter(t => t.status === 'pending');
  const newTasksCount = assignedTasks.filter(t => t.isNew).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
      <div className="max-w-md mx-auto sm:max-w-6xl">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <Link href="/" className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              {/* [LOGO_PLACEHOLDER] */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full"></div>
            </Link>
            <Link href="/parent" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 transition-all text-xs sm:text-sm font-medium">
              Parent
            </Link>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight">Hi, Alex! 👋</h1>
            <p className="text-white/80 text-sm sm:text-lg font-medium">Welcome back to your Sandbox!</p>
          </div>
        </header>

        {/* New Task Notification */}
        {newTasksCount > 0 && (
          <div className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">New Task Assigned! 🎉</h3>
                <p className="text-sm opacity-90">{newTasksCount} new task{newTasksCount > 1 ? 's' : ''} from your parent</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Assigned Tasks */}
        {pendingTasks.length > 0 && (
          <div className="mb-4 bg-white rounded-2xl shadow-xl p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Tasks from Parent</h3>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-bold text-gray-800">{task.title}</div>
                      <div className="text-sm text-gray-600">₱{task.reward} reward {task.badge && `+ ${task.badge} badge`}</div>
                    </div>
                    {task.isNew && (
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-bold text-sm shadow-lg"
                  >
                    Mark Complete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Level Card - Small */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="text-2xl font-black text-yellow-600 mb-1">Level {level}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(xp / xpToNext) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-yellow-700">{xpToNext - xp} XP to go</div>
          </div>

          {/* Balance Card - Small */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="text-xs font-bold text-gray-600 mb-1">My Balance</div>
            <div className="text-2xl font-black text-green-600">₱{balance.toFixed(2)}</div>
            <div className="text-xs text-green-700">Available</div>
          </div>

          {/* Wishlist - Wide */}
          <div className="col-span-2 bg-white rounded-2xl shadow-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">My Wishlist</h3>
              <div className="text-sm text-gray-600">{wishlist.length} items</div>
            </div>
            <div className="space-y-2">
              {wishlist.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">{item.item}</div>
                      <div className="text-xs text-gray-600">₱{item.price}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-blue-600">{Math.round((item.saved / item.price) * 100)}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((item.saved / item.price) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities - Tall */}
          <div className="row-span-2 bg-white rounded-2xl shadow-xl p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Activities</h3>
            <div className="space-y-3">
              <Link href="/tasks" className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2">
                <span>🎯</span>
                <span>Earn</span>
              </Link>
              <Link href="/learn" className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2">
                <span>📚</span>
                <span>Learn</span>
              </Link>
            </div>
          </div>

          {/* Recent Transaction - Small */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="text-xs font-bold text-gray-600 mb-2">Last Activity</div>
            {transactions.length > 0 && (
              <div>
                <div className="text-sm font-bold text-gray-800">{transactions[0].description}</div>
                <div className={`text-lg font-black ${
                  transactions[0].type === "deposit" ? "text-green-600" : "text-red-600"
                }`}>
                  {transactions[0].type === "deposit" ? "+" : "-"}₱{transactions[0].amount.toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Badge Wall - Full Width */}
        <div className="mt-4 bg-white rounded-2xl shadow-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">My Badges</h3>
            <div className="text-sm text-gray-600">{badges.filter(b => b.earned).length}/{badges.length}</div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {badges.map((badge) => (
              <div key={badge.id} className={`p-2 rounded-xl text-center transition-all ${
                badge.earned 
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-300' 
                  : 'bg-gray-100 border border-gray-200 opacity-50'
              }`}>
                <div className={`text-lg mb-1 ${
                  badge.earned ? 'filter-none' : 'grayscale'
                }`}>
                  {badge.icon}
                </div>
                <div className={`text-xs font-bold ${
                  badge.earned ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {badge.name.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Form - Full Width */}
        <div className="mt-4 bg-white rounded-2xl shadow-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add Transaction</h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg font-bold focus:border-purple-400 focus:outline-none transition-colors text-black"
            />
            <input
              type="text"
              placeholder="What's this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-black"
            />
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleTransaction("deposit")}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg"
              >
                Add Money
              </button>
              <button
                onClick={() => handleTransaction("withdrawal")}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg"
              >
                Spend Money
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}