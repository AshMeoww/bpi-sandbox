import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type NavItem = {
  href: string;
  icon: string;
  label: string;
  isActive?: boolean;
  isAvatar?: boolean;
};

type BottomNavigationProps = {
  items: NavItem[];
};

export default function BottomNavigation({ items }: BottomNavigationProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <nav className="fixed inset-x-0 bottom-0 z-50 bg-[#1F4E79] border-t px-4 py-2">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around items-center">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 ${
                  item.isActive ? "text-white" : "text-white/80"
                }`}
              >
                <div className="w-6 h-6 mb-1">
                  <Image
                    src="/BPI assets/beige-home.png"
                    alt={item.label}
                    width={24}
                    height={24}
                  />
                </div>
                <span className={`text-xs ${item.isActive ? "font-bold" : "font-medium"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }
  
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-[#1F4E79] border-t px-4 py-2">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 ${
                item.isActive ? "text-white" : "text-white/80"
              }`}
            >
              <div className={`mb-1 ${item.isAvatar ? 'w-8 h-8' : 'w-6 h-6'}`}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={item.isAvatar ? 32 : 24}
                  height={item.isAvatar ? 32 : 24}
                  className={item.isAvatar ? 'rounded-full border-2 border-white/50' : ''}
                />
              </div>
              <span className={`text-xs ${item.isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}