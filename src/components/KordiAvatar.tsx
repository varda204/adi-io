import { Sparkles, Code2, Rocket, Search, CheckCircle, AlertTriangle } from "lucide-react";

interface KordiAvatarProps {
  size?: "sm" | "md" | "lg";
  state?: "idle" | "coding" | "deploying" | "reviewing" | "monitoring" | "success" | "alert";
  showPulse?: boolean;
  className?: string;
  activity?: string;
}

export const KordiAvatar = ({ 
  size = "md", 
  state = "idle",
  showPulse = true, 
  className = "",
  activity
}: KordiAvatarProps) => {
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

  const getStateConfig = () => {
    switch (state) {
      case "coding":
        return {
          icon: <Code2 className={`${iconSizes[size]} text-primary-foreground`} />,
          animation: "animate-pulse",
          glow: "shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]",
          label: "Coding..."
        };
      case "deploying":
        return {
          icon: <Rocket className={`${iconSizes[size]} text-primary-foreground animate-bounce`} />,
          animation: "animate-pulse",
          glow: "shadow-[0_0_20px_rgba(var(--warning-rgb),0.5)]",
          label: "Deploying..."
        };
      case "reviewing":
        return {
          icon: <Search className={`${iconSizes[size]} text-primary-foreground`} />,
          animation: "animate-pulse",
          glow: "shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)]",
          label: "Reviewing..."
        };
      case "monitoring":
        return {
          icon: <Sparkles className={`${iconSizes[size]} text-primary-foreground animate-spin`} />,
          animation: "",
          glow: "shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]",
          label: "Monitoring..."
        };
      case "success":
        return {
          icon: <CheckCircle className={`${iconSizes[size]} text-success`} />,
          animation: "animate-bounce",
          glow: "shadow-[0_0_20px_rgba(var(--success-rgb),0.5)]",
          label: "Success!"
        };
      case "alert":
        return {
          icon: <AlertTriangle className={`${iconSizes[size]} text-destructive animate-pulse`} />,
          animation: "animate-pulse",
          glow: "shadow-[0_0_20px_rgba(var(--destructive-rgb),0.5)]",
          label: "Alert!"
        };
      default:
        return {
          icon: <Sparkles className={`${iconSizes[size]} text-primary-foreground`} />,
          animation: showPulse ? "animate-pulse" : "",
          glow: "shadow-lg",
          label: "Ready"
        };
    }
  };

  const config = getStateConfig();

  return (
    <div className={`relative group ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-primary rounded-full flex items-center justify-center ${config.animation} ${config.glow} transition-all`}>
        {config.icon}
      </div>
      {showPulse && state !== "idle" && (
        <div className={`absolute inset-0 ${sizeClasses[size]} bg-gradient-primary rounded-full animate-ping opacity-20`} />
      )}
      
      {/* Activity tooltip */}
      {(activity || config.label) && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-background border border-border rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap">
            <p className="text-xs font-medium">{activity || config.label}</p>
          </div>
        </div>
      )}
      
      {/* State indicator dot */}
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
        state === "success" ? "bg-success" :
        state === "alert" ? "bg-destructive" :
        state === "deploying" ? "bg-warning" :
        "bg-primary"
      } ${state !== "idle" ? "animate-pulse" : ""}`} />
    </div>
  );
};
