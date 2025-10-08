import { Sparkles } from "lucide-react";

interface KordiAvatarProps {
  size?: "sm" | "md" | "lg";
  showPulse?: boolean;
  className?: string;
}

export const KordiAvatar = ({ size = "md", showPulse = true, className = "" }: KordiAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-primary rounded-full flex items-center justify-center shadow-lg ${showPulse ? 'animate-pulse' : ''}`}>
        <Sparkles className={`${iconSizes[size]} text-primary-foreground`} />
      </div>
      {showPulse && (
        <div className={`absolute inset-0 ${sizeClasses[size]} bg-gradient-primary rounded-full animate-ping opacity-20`} />
      )}
    </div>
  );
};
