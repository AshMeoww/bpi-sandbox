"use client";
import { useState } from "react";
import Link from "next/link";

type LearningCard = {
  id: number;
  title: string;
  concept: string;
  content: string;
  example: string;
  completed: boolean;
  icon: string;
  color: string;
};

export default function Learn() {
  const [cards, setCards] = useState<LearningCard[]>([
    {
      id: 1,
      title: "What is Interest?",
      concept: "Interest",
      content: "Interest is extra money you earn when you save your money in a bank. The longer you save, the more extra money you get!",
      example: "If you save ₱100 and the bank gives 5% interest per year, you'll have ₱105 after one year!",
      completed: false,
      icon: "💰",
      color: "bg-green-100 border-green-300"
    },
    {
      id: 2,
      title: "Making a Budget",
      concept: "Budgeting",
      content: "A budget is a plan for your money. It helps you decide how much to save, spend, and share with others.",
      example: "If you get ₱100 allowance: Save ₱30, Spend ₱60 on fun things, Share ₱10 to help others.",
      completed: false,
      icon: "📊",
      color: "bg-blue-100 border-blue-300"
    },
    {
      id: 3,
      title: "Needs vs Wants",
      concept: "Smart Spending",
      content: "NEEDS are things you must have to live (food, clothes, home). WANTS are things that would be nice to have but you can live without (toys, candy).",
      example: "Need: School supplies for learning. Want: New video game (fun but not necessary).",
      completed: false,
      icon: "🤔",
      color: "bg-purple-100 border-purple-300"
    },
    {
      id: 4,
      title: "Setting Goals",
      concept: "Goal Setting",
      content: "A savings goal is something special you want to buy in the future. Having a goal makes saving more fun and easier!",
      example: "Goal: New bike for ₱2,500. Save ₱50 per week = reach your goal in 50 weeks!",
      completed: false,
      icon: "🎯",
      color: "bg-yellow-100 border-yellow-300"
    },
    {
      id: 5,
      title: "Why Save Money?",
      concept: "Saving",
      content: "Saving money helps you buy bigger things later, be ready for emergencies, and feel proud of reaching your goals!",
      example: "Instead of buying 5 small toys (₱100 each), save ₱500 to buy one amazing toy you really want!",
      completed: false,
      icon: "🏦",
      color: "bg-pink-100 border-pink-300"
    }
  ]);

  const [selectedCard, setSelectedCard] = useState<LearningCard | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const completeCard = (cardId: number) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, completed: true } : card
    ));
    setSelectedCard(null);
    setCurrentStep(0);
  };

  const completedCount = cards.filter(c => c.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-400 to-purple-400 p-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Link href="/dashboard" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
            </Link>
            <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-bold">
              {completedCount}/{cards.length} Complete
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <h1 className="text-2xl font-black text-white">Learn Money</h1>
            <p className="text-white/80 text-sm">Discover how money works!</p>
          </div>
        </header>

        {!selectedCard ? (
          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card.id} className={`bg-white rounded-2xl shadow-xl p-4 border-2 ${card.color} ${card.completed ? 'opacity-75' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{card.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{card.title}</h3>
                      <p className="text-sm text-gray-600">{card.concept}</p>
                      {card.completed && (
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-green-600 text-sm">✓</span>
                          <span className="text-green-600 text-xs font-bold">Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCard(card)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                      card.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {card.completed ? 'Review' : 'Learn'}
                  </button>
                </div>
              </div>
            ))}

            {completedCount === cards.length && (
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Money Master!</h3>
                <p className="text-gray-600 mb-4">You've learned all the money concepts. You're ready to be smart with money!</p>
                <Link href="/dashboard" className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold">
                  Back to Dashboard
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedCard.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedCard.title}</h3>
              
              {currentStep === 0 && (
                <div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                    <h4 className="font-bold text-gray-800 mb-2">What you'll learn:</h4>
                    <p className="text-gray-700">{selectedCard.content}</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
                  >
                    Start Learning
                  </button>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
                    <h4 className="font-bold text-gray-800 mb-2">Example:</h4>
                    <p className="text-gray-700">{selectedCard.example}</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
                  >
                    I Understand!
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="bg-green-50 rounded-xl p-4 mb-6">
                    <h4 className="font-bold text-gray-800 mb-2">Great job! 🎉</h4>
                    <p className="text-gray-700">You've learned about {selectedCard.concept}. This will help you make smart money decisions!</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedCard(null)}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-bold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => completeCard(selectedCard.id)}
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}