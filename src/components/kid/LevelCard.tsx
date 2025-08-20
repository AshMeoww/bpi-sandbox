import Card from "../ui/Card";

type LevelCardProps = {
  level: number;
  xp: number;
  xpToNext: number;
};

export default function LevelCard({ level, xp, xpToNext }: LevelCardProps) {
  return (
    <Card>
      <div className="text-2xl font-black text-yellow-600 mb-1">Level {level}</div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(xp / xpToNext) * 100}%` }}
        ></div>
      </div>
      <div className="text-xs text-yellow-700">{xpToNext - xp} XP to go</div>
    </Card>
  );
}