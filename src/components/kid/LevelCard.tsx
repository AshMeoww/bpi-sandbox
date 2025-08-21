import Card from "../ui/Card";

type LevelCardProps = {
  level: number;
  xp: number;
  xpToNext: number;
};

export default function LevelCard({ level, xp, xpToNext }: LevelCardProps) {
  return (
    <div className="flex justify-center items-center w-full">
      <Card>
        <div className="relative w-[300px] h-48 bg-gray-200 rounded-lg mb-2 items-center justify-center flex mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/BPI assets/jar.png"
              alt="Level jar"
              className="w-12 h-12"
            />
          </div>
        </div>
        <div className="text-2xl font-black text-yellow-600 mb-1 text-center">Level {level}</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(xp / xpToNext) * 100}%` }}
          ></div>
        </div>
        <div className="text-xs text-yellow-700 text-center">{xpToNext - xp} XP to go</div>
      </Card>
    </div>
  );
}
