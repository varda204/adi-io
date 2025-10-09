import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-card border-border/50">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl">See Kordra in Action</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Autonomous DevOps meets intelligent coding
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Video Container */}
        <div className="relative aspect-video bg-background/50">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-primary animate-pulse cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
            <p className="text-muted-foreground text-center">
              Demo video placeholder - Click to play
            </p>
          </div>
        </div>

        {/* Demo Features Timeline */}
        <div className="p-6 pt-4 space-y-4 border-t border-border/50">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            What You'll See
          </h3>
          <div className="grid gap-3">
            <DemoFeatureItem
              time="0:00"
              title="Autonomous Project Creation"
              description="Kordra creates a complete project structure from scratch"
            />
            <DemoFeatureItem
              time="0:30"
              title="Real-Time Live Repo Sync"
              description="Watch code sync to GitHub instantly as you type"
            />
            <DemoFeatureItem
              time="1:00"
              title="One-Command Deployment"
              description="Deploy to staging and production with a single voice command"
            />
            <DemoFeatureItem
              time="1:30"
              title="Proactive Bug Fixing"
              description="Kordi detects and fixes bugs before you notice them"
            />
            <DemoFeatureItem
              time="2:00"
              title="Voice Command Interactions"
              description="Natural conversation with your AI teammate"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DemoFeatureItem = ({
  time,
  title,
  description,
}: {
  time: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4 items-start group hover:bg-secondary/50 p-3 rounded-lg transition-colors">
      <Badge variant="outline" className="mt-1 shrink-0 bg-primary/10 border-primary/20 text-primary">
        {time}
      </Badge>
      <div className="space-y-1">
        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
