import { KordiAvatar } from "./KordiAvatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProactiveSuggestionProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

export const ProactiveSuggestion = ({ message, actionLabel, onAction, onDismiss }: ProactiveSuggestionProps) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 shadow-lg animate-fade-in">
      <div className="flex items-start gap-3">
        <KordiAvatar size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-sm font-medium">KORDI suggests:</p>
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0"
                onClick={onDismiss}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
          <p className="text-sm mb-3">{message}</p>
          {actionLabel && onAction && (
            <Button 
              size="sm" 
              className="bg-gradient-primary hover:opacity-90 h-8"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
