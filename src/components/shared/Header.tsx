import Link from "next/link";

type HeaderProps = {
  title: string;
  subtitle?: string;
  logoHref?: string;
  actionButton?: {
    href: string;
    label: string;
  };
  gradient?: string;
};

export default function Header({ 
  title, 
  subtitle, 
  logoHref = "/", 
  actionButton,
  gradient = "bg-white/10 backdrop-blur-sm"
}: HeaderProps) {
  return (
    <header className="text-center mb-6">
      <div className="flex justify-between items-center mb-4">
        <Link href={logoHref} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
        </Link>
        {actionButton && (
          <Link 
            href={actionButton.href} 
            className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/30 transition-all text-xs font-medium"
          >
            {actionButton.label}
          </Link>
        )}
      </div>
      <div className={`${gradient} rounded-2xl p-4`}>
        <h1 className="text-2xl font-black text-white mb-2">{title}</h1>
        {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
      </div>
    </header>
  );
}