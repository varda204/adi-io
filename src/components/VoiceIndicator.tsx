import { Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VoiceIndicatorProps {
  active?: boolean;
  className?: string;
}

export const VoiceIndicator = ({ active = false, className = "" }: VoiceIndicatorProps) => {
  if (!active) return null;

  return (
    <Badge variant="outline" className={`bg-accent/10 border-accent/20 text-accent ${className}`}>
      <Mic className="w-3 h-3 mr-1 animate-pulse" />
      Voice Active
    </Badge>
  );
};
