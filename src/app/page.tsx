import Link from "next/link";
import Logo from "@/components/shared/Logo";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 pb-20" style={{backgroundImage: "url('/BPI assets/BPI landing page assets/bg assets/onboarding w bg.png')"}}>
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* <Image
          src="/BPI assets/BPI landing page assets/bg assets/onboarding w bg.png"
          alt="Background"
          fill
          className="object-cover opacity-30"
        /> */}
      </div>
  
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 sm:p-6">
        <Logo />
        <Link href="/parent-app" className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 transition-all text-sm">
          Parent
        </Link>
      </nav>

      {/* Hero Section */}

      <div className="px-4 py-8 sm:px-6 sm:py-16 relative z-10">
      <div className="flex justify-center lg:justify-end">
            <div className="w-64 h-auto">
              <Image
                src="/BPI assets/BPI landing page assets/assets/iPhone 15.png"
                alt="Sandbox App on iPhone"
                width={300}
                height={600}
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight font-['Baloo_2']">
              Your Financial<br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-semibold font-['Baloo_2']">Learning Playground</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed font-['Public_Sans']">
              Preparing Filipino kids for their first real bank account. Practice, learn, and grow before BPI Jumpstart.
            </p>
            <Link href="/onboarding" className="bg-white text-[#AD1F23] px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all shadow-xl inline-block">
              Start Your Adventure
            </Link>
          </div>
          
        </div>

        {/* Features Grid */}
        <div className="relative z-10 px-4 sm:px-6 mt-28">
        <div className="grid gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-[#264653] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16  rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/BPI assets/BPI landing page assets/assets/dual interface.png"
                alt="Dual Interface Icon"
                width={44}
                height={44}
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold font-['Baloo_2'] text-white mb-3 sm:mb-4">Dual Interface</h3>
            <p className="text-white/80 text-sm sm:text-base font-['Public_Sans']">Separate views for kids and parents with real-time monitoring.</p>
          </div>

          <div className="bg-[#264653] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/BPI assets/BPI landing page assets/assets/Interactive onboarding.png"
                alt="Interactive Onboarding Icon"
                width={44}
                height={44}
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold font-['Baloo_2'] text-white mb-3 sm:mb-4">Interactive Onboarding</h3>
            <p className="text-white/80 text-sm sm:text-base font-['Public_Sans']">Personalized setup based on goals like "save for a bike".</p>
          </div>

          <div className="bg-[#264653] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/BPI assets/BPI landing page assets/assets/Gamified Tasks.png"
                alt="Gamified Tasks Icon"
                width={44}
                height={44}
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold font-['Baloo_2'] text-white mb-3 sm:mb-4">Gamified Tasks</h3>
            <p className="text-white/80 text-sm sm:text-base font-['Public_Sans']">Earn through chores, quizzes, and fun milestones.</p>
          </div>

          <div className="bg-[#264653] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16  rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/BPI assets/BPI landing page assets/assets/AI Guidance.png"
                alt="AI Guidance Icon"
                width={44}
                height={44}
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold font-['Baloo_2'] text-white mb-3 sm:mb-4">AI Guidance</h3>
            <p className="text-white/80 text-sm sm:text-base font-['Public_Sans']">Smart tips: "Saving ₱50 weekly = ₱2,600 yearly".</p>
          </div>

          <div className="bg-[#264653] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16  rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/BPI assets/BPI landing page assets/assets/Learning Cards.png"
                alt="Learning Cards Icon"
                width={44}
                height={44}
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold font-['Baloo_2'] text-white mb-3 sm:mb-4">Learning Cards</h3>
            <p className="text-white/80 text-sm sm:text-base font-['Public_Sans']">Interactive lessons on budgeting and needs vs. wants.</p>
          </div>

          <div className="bg-[#264653] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16  rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/BPI assets/BPI landing page assets/assets/Safe Environment.png"
                alt="Safe Environment Icon"
                width={44}
                height={44}
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold font-['Baloo_2'] text-white mb-3 sm:mb-4">Safe Environment</h3>
            <p className="text-white/80 text-sm sm:text-base font-['Public_Sans']">Guided sandbox with parental controls and safety.</p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-[#7F0407] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 mt-26">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold font-['Baloo_2'] text-white mb-3">Building Tomorrow's BPI Customers</h2>
            <p className="text-white/80 text-sm sm:text-base font-['Public_Sans']">
              Unlike traditional banking apps, Sandbox is a safe learning environment for kids too young for real accounts.
              We're preparing them for BPI Jumpstart and future financial success.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl mb-2 flex justify-center">
              <Image
                src="/BPI assets/BPI landing page assets/assets/Learn through play.png"
                alt="Safe Environment Icon"
                width={44}
                height={44}
              />
              </div>
              <h4 className="font-semibold font-['Baloo_2'] text-white text-sm">Learn Through Play</h4>
              <p className="text-white font-['Public_Sans'] text-xs">No real money risk</p>
            </div>
            <div className="bg-[#F2F0EF] rounded-xl p-4">
              <div className="text-2xl mb-2 flex justify-center">
              <Image
                src="/BPI assets/BPI landing page assets/assets/build skills.png"
                alt="Safe Environment Icon"
                width={44}
                height={44}
              />
              </div>
              <h4 className="font-semibold font-['Baloo_2'] text-[#264653] text-sm">Build Skills</h4>
              <p className="text-[#264653] text-xs font-['Public_Sans']">Ready for real banking</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2 flex justify-center">
              <Image
                src="/BPI assets/BPI landing page assets/assets/Graduate to BPI.png"
                alt="Safe Environment Icon"
                width={44}
                height={44}
              />
              </div>
              <h4 className="font-semibold font-['Baloo_2'] text-white text-sm">Graduate to BPI</h4>
              <p className="text-white font-['Public_Sans'] text-xs">Seamless transition</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#F2F0EF] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center mt-16">
          <h2 className="text-2xl sm:text-4xl font-semibold font-['Baloo_2'] text-[#264653] text-center mb-4 sm:mb-6">Start Learning Today</h2>
          <p className="text-base sm:text-xl font-['Public_Sans'] text-[#264653] mb-6 sm:mb-8">Join the financial learning playground that prepares kids for real banking.</p>
          <div className="flex flex-col gap-3 sm:gap-4">
            <Link href="/onboarding" className="bg-[#AD1F23] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all shadow-xl font-['Public_Sans']">
              Start Learning
            </Link>
            <Link href="/parent-app" className="bg-[#F2F0EF] text-[#AD1F23] px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-purple-600 transition-all shadow-xl font-['Public_Sans']">
              Parent Dashboard
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
