import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
            {/* [SANDBOX_LOGO_PLACEHOLDER] */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <span className="text-xl sm:text-2xl font-black text-white">Sandbox</span>
        </div>
        <Link href="/parent" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 transition-all text-sm">
          Parent
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="px-4 py-8 sm:px-6 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Your Financial<br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Learning Playground</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-2">
            Preparing Filipino kids for their first real bank account. Practice, learn, and grow before BPI Jumpstart.
          </p>
          <Link href="/onboarding" className="bg-white text-purple-600 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all shadow-xl inline-block">
            Start Your Adventure
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              {/* [DUAL_INTERFACE_ICON_PLACEHOLDER] */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Dual Interface</h3>
            <p className="text-white/80 text-sm sm:text-base">Separate views for kids and parents with real-time monitoring.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              {/* [ONBOARDING_ICON_PLACEHOLDER] */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Interactive Onboarding</h3>
            <p className="text-white/80 text-sm sm:text-base">Personalized setup based on goals like "save for a bike".</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              {/* [GAMIFIED_TASKS_ICON_PLACEHOLDER] */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Gamified Tasks</h3>
            <p className="text-white/80 text-sm sm:text-base">Earn through chores, quizzes, and fun milestones.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              {/* [AI_GUIDANCE_ICON_PLACEHOLDER] */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-full"></div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">AI Guidance</h3>
            <p className="text-white/80 text-sm sm:text-base">Smart tips: "Saving ₱50 weekly = ₱2,600 yearly".</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              {/* [LEARNING_CARDS_ICON_PLACEHOLDER] */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Learning Cards</h3>
            <p className="text-white/80 text-sm sm:text-base">Interactive lessons on budgeting and needs vs. wants.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              {/* [SAFE_ENVIRONMENT_ICON_PLACEHOLDER] */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full"></div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Safe Environment</h3>
            <p className="text-white/80 text-sm sm:text-base">Guided sandbox with parental controls and safety.</p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Building Tomorrow's BPI Customers</h2>
            <p className="text-white/80 text-sm sm:text-base">
              Unlike traditional banking apps, Sandbox is a safe learning environment for kids too young for real accounts.
              We're preparing them for BPI Jumpstart and future financial success.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl mb-2">🎮</div>
              <h4 className="font-bold text-white text-sm">Learn Through Play</h4>
              <p className="text-white/70 text-xs">No real money risk</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-bold text-white text-sm">Build Skills</h4>
              <p className="text-white/70 text-xs">Ready for real banking</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl mb-2">🏦</div>
              <h4 className="font-bold text-white text-sm">Graduate to BPI</h4>
              <p className="text-white/70 text-xs">Seamless transition</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Start Learning Today</h2>
          <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8">Join the financial learning playground that prepares kids for real banking.</p>
          <div className="flex flex-col gap-3 sm:gap-4">
            <Link href="/onboarding" className="bg-white text-purple-600 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all shadow-xl">
              Start Learning
            </Link>
            <Link href="/parent" className="bg-purple-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-purple-600 transition-all shadow-xl">
              Parent Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}