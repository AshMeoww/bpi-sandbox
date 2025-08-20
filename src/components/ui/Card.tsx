type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
};

export default function Card({ children, className = "", padding = "md" }: CardProps) {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4", 
    lg: "p-6"
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}