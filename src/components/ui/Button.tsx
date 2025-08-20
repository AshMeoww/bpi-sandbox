type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
};

export default function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  className = ""
}: ButtonProps) {
  const baseClasses = "font-bold rounded-xl transition-all shadow-lg";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    secondary: "bg-gray-300 text-gray-700",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "w-full py-3 text-lg"
  };

  const disabledClasses = disabled ? "bg-gray-300 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}