import React from "react";
import Card from "../ui/Card";

type BalanceCardProps = {
  balance: number;
  title?: string;
};

export default function BalanceCard({ balance, title = "You saved a total of" }: BalanceCardProps) {
  return (
    <Card className="!bg-[#AD1F23]">
      <div className="text-xl font-medium text-white mb-1 text-left font-['Baloo_2']">{title}</div>
      <div className="text-5xl font-['Public_Sans'] font-medium text-white text-left">₱{balance.toFixed(2)}</div>
    </Card>
  );
}
