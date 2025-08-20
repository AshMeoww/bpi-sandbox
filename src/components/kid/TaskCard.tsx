import Button from "../ui/Button";

type TaskCardProps = {
  title: string;
  reward: number;
  badge?: string;
  isNew?: boolean;
  onComplete: () => void;
};

export default function TaskCard({ title, reward, badge, isNew, onComplete }: TaskCardProps) {
  return (
    <div className="p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-bold text-gray-800">{title}</div>
          <div className="text-sm text-gray-600">
            ₱{reward} reward {badge && `+ ${badge} badge`}
          </div>
        </div>
        {isNew && (
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>
      <Button onClick={onComplete} variant="success" size="lg">
        Mark Complete
      </Button>
    </div>
  );
}