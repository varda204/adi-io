import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface LiveDraftCardProps {
  status: "draft" | "live" | "alert";
  title: string;
  action?: string;
  progress?: number;
}

export const LiveDraftCard = ({ status, title, action, progress }: LiveDraftCardProps) => {
  const statusConfig = {
    draft: {
      icon: <Loader2 className="w-4 h-4 text-warning animate-spin" />,
      color: "border-warning/30 bg-warning/5",
      badge: "🟡 DRAFT"
    },
    live: {
      icon: <Loader2 className="w-4 h-4 text-success animate-spin" />,
      color: "border-success/30 bg-success/5",
      badge: "🟢 LIVE"
    },
    alert: {
      icon: <AlertCircle className="w-4 h-4 text-destructive animate-pulse" />,
      color: "border-destructive/30 bg-destructive/5",
      badge: "🔴 ALERT"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`p-3 rounded-lg border ${config.color} transition-all hover:border-primary/50`}>
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold">{config.badge}</span>
          </div>
          <p className="text-sm font-medium mb-1">{title}</p>
          {progress !== undefined && (
            <div className="w-full bg-secondary rounded-full h-1.5 mb-2">
              <div 
                className="bg-success h-1.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {action && (
            <Button size="sm" variant="outline" className="h-7 text-xs mt-2">
              {action}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
