import Link from "next/link";

type NavItem = {
  href: string;
  icon: string;
  label: string;
  isActive?: boolean;
  isRounded?: boolean;
};

type BottomNavigationProps = {
  items: NavItem[];
};

export default function BottomNavigation({ items }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 ${
                item.isActive ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-6 h-6 mb-1 ${
                  item.isActive ? "bg-purple-600" : "bg-gray-400"
                } ${item.isRounded ? "rounded-full" : "rounded-lg"}`}
              ></div>
              <span className={`text-xs ${item.isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}