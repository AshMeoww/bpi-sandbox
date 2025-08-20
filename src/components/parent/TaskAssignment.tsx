import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

type TaskAssignmentProps = {
  onCreateTask: (title: string, reward: number, badge: string) => void;
};

export default function TaskAssignment({ onCreateTask }: TaskAssignmentProps) {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState("");
  const [badge, setBadge] = useState("");

  const handleSubmit = () => {
    if (!title || !reward) return;
    onCreateTask(title, Number(reward), badge);
    setTitle("");
    setReward("");
    setBadge("");
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Assign New Task</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Task title (e.g., Clean your room)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-black"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Reward (₱)"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-black"
          />
          <select
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-black"
          >
            <option value="">No Badge</option>
            <option value="Helper">Helper Badge</option>
            <option value="Cleaner">Cleaner Badge</option>
            <option value="Organizer">Organizer Badge</option>
          </select>
        </div>
        <Button onClick={handleSubmit} variant="primary" size="lg">
          Assign Task
        </Button>
      </div>
    </Card>
  );
}