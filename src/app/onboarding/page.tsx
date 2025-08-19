"use client";
import { useState } from "react";
import Link from "next/link";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState("");
  const [goal, setGoal] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const childAvatars = ["👦", "👧", "🧒", "👶", "🦸", "🦹", "🧙", "🧚"];
  const parentAvatars = ["👨", "👩", "👨‍💼", "👩‍💼", "👨‍🏫", "👩‍🏫", "👨‍⚕️", "👩‍⚕️"];

  const goals = [
    { id: "bike", name: "New Bike", icon: "🚲", amount: 2500 },
    { id: "toy", name: "Favorite Toy", icon: "🧸", amount: 800 },
    { id: "game", name: "Video Game", icon: "🎮", amount: 1200 },
    { id: "phone", name: "Phone", icon: "📱", amount: 8000 },
    { id: "custom", name: "Something Else", icon: "✨", amount: 0 }
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleGoalSelect = (selectedGoal: typeof goals[0]) => {
    setGoal(selectedGoal.id);
    if (selectedGoal.id !== "custom") {
      setGoalAmount(selectedGoal.amount.toString());
    }
    handleNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <Link href="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
          </Link>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <h1 className="text-2xl font-black text-white">Welcome to Sandbox!</h1>
            <p className="text-white/80 text-sm">Let's set up your money adventure</p>
          </div>
        </header>

        {/* Progress Bar */}
        {step > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-white/60 mb-2">
              <span>Step {step} of {userType === 'child' ? '4' : '3'}</span>
              <span>{Math.round((step / (userType === 'child' ? 4 : 3)) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / (userType === 'child' ? 4 : 3)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6">
          {step === 0 && (
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Sandbox!</h2>
              <p className="text-gray-600 mb-6">Choose your experience:</p>
              <div className="space-y-4">
                <button
                  onClick={() => {setUserType('child'); handleNext();}}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                      {/* [CHILD_LOGO_PLACEHOLDER] */}
                      <div className="w-10 h-10 bg-purple-500 rounded-lg"></div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-800">I'm a Kid</h3>
                      <p className="text-sm text-gray-600">Learn about money through fun activities</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {setUserType('parent'); handleNext();}}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      {/* [PARENT_LOGO_PLACEHOLDER] */}
                      <div className="w-10 h-10 bg-blue-500 rounded-lg"></div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-800">I'm a Parent</h3>
                      <p className="text-sm text-gray-600">Monitor and guide my child's learning</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Hi there!</h2>
              <p className="text-gray-600 mb-6">What's your name?</p>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-center font-bold text-lg focus:border-purple-400 focus:outline-none mb-6 text-black"
              />
              <button
                onClick={handleNext}
                disabled={!name}
                className="w-full bg-purple-500 text-white py-3 rounded-xl font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              {userType === 'child' ? (
                <div>
                  <div className="text-6xl mb-4">🎂</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">How old are you, {name}?</h2>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {[7,8,9,10,11,12,13,14].map((ageOption) => (
                      <button
                        key={ageOption}
                        onClick={() => {setAge(ageOption.toString()); handleNext();}}
                        className="p-3 border-2 border-gray-200 rounded-xl font-bold hover:border-purple-400 hover:bg-purple-50 transition-all"
                      >
                        {ageOption}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">👤</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose your avatar, {name}</h2>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {parentAvatars.map((avatarOption, index) => (
                      <button
                        key={index}
                        onClick={() => {setAvatar(avatarOption); setStep(userType === 'parent' ? 3 : 4);}}
                        className="p-4 border-2 border-gray-200 rounded-xl text-3xl hover:border-blue-400 hover:bg-blue-50 transition-all"
                      >
                        {avatarOption}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && userType === 'child' && (
            <div className="text-center">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose your avatar, {name}</h2>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {childAvatars.map((avatarOption, index) => (
                  <button
                    key={index}
                    onClick={() => {setAvatar(avatarOption); handleNext();}}
                    className="p-4 border-2 border-gray-200 rounded-xl text-3xl hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    {avatarOption}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && userType === 'parent' && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {name}!</h2>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 mb-2">You're all set to monitor and guide your child's financial learning journey.</p>
                <div className="text-4xl mb-2">{avatar}</div>
              </div>
              <Link
                href="/parent-app"
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold inline-block text-center"
              >
                Go to Parent Dashboard
              </Link>
            </div>
          )}

          {step === 4 && userType === 'child' && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What do you want to save for?</h2>
              <div className="space-y-3">
                {goals.map((goalOption) => (
                  <button
                    key={goalOption.id}
                    onClick={() => handleGoalSelect(goalOption)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all flex items-center space-x-3"
                  >
                    <span className="text-2xl">{goalOption.icon}</span>
                    <div className="text-left">
                      <div className="font-bold">{goalOption.name}</div>
                      {goalOption.amount > 0 && (
                        <div className="text-sm text-gray-500">₱{goalOption.amount}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && goal === "custom" && (
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">How much do you need?</h2>
              <input
                type="number"
                placeholder="Enter amount"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-center font-bold text-lg focus:border-purple-400 focus:outline-none mb-6 text-black"
              />
              <Link
                href="/kid/dashboard"
                className="w-full bg-purple-500 text-white py-3 rounded-xl font-bold inline-block text-center"
              >
                Start My Journey!
              </Link>
            </div>
          )}

          {step === 5 && goal !== "custom" && goal !== "" && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfect, {name}!</h2>
              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <div className="text-4xl mb-2">{avatar}</div>
                <p className="text-gray-700">
                  You want to save <strong>₱{goalAmount}</strong> for your {goals.find(g => g.id === goal)?.name}!
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  If you save ₱50 per week, you'll reach your goal in {Math.ceil(parseInt(goalAmount) / 50)} weeks!
                </p>
              </div>
              <Link
                href="/kid/dashboard"
                className="w-full bg-purple-500 text-white py-3 rounded-xl font-bold inline-block text-center"
              >
                Start My Journey!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}