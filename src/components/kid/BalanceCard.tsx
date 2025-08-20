import Card from "../ui/Card";

type BalanceCardProps = {
  balance: number;
  title?: string;
};

export default function BalanceCard({ balance, title = "My Balance" }: BalanceCardProps) {
  return (
    <Card>
      <div className="text-xs font-bold text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-black text-green-600">₱{balance.toFixed(2)}</div>
      <div className="text-xs text-green-700">Available</div>
    </Card>
  );
}