import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, GitCommit, AlertCircle, X } from "lucide-react";
import { KordiAvatar } from "./KordiAvatar";
import { useState } from "react";

interface ContextAwareWelcomeProps {
  isNewProject: boolean;
  projectName: string;
  recentActivity?: {
    commits: number;
    prs: number;
    lastFile?: string;
  };
}

export const ContextAwareWelcome = ({
  isNewProject,
  projectName,
  recentActivity,
}: ContextAwareWelcomeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 animate-fade-in relative">
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-6 w-6 p-0"
        onClick={() => setIsVisible(false)}
      >
        <X className="w-4 h-4" />
      </Button>

      <div className="flex items-start gap-4">
        <KordiAvatar size="md" showPulse={true} />
        <div className="flex-1">
          {isNewProject ? (
            <>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Welcome to {projectName}!
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                I've set up your project structure, initialized Git, and configured
                your build pipeline. Ready to start coding?
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  Start Interactive Tour
                </Button>
                <Button size="sm" variant="outline">
                  View Setup Summary
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Welcome back to {projectName}!
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                While you were away:
              </p>
              <div className="space-y-2 mb-4">
                {recentActivity && (
                  <>
                    <div className="flex items-center gap-2 text-sm">
                      <GitCommit className="w-3 h-3 text-accent" />
                      <span>
                        {recentActivity.commits} commits since last session
                      </span>
                      <Badge variant="outline" className="text-xs">
                        View changes
                      </Badge>
                    </div>
                    {recentActivity.prs > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-3 h-3 text-warning" />
                        <span>
                          {recentActivity.prs} PRs awaiting your review
                        </span>
                      </div>
                    )}
                    {recentActivity.lastFile && (
                      <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-3 h-3 text-success" />
                        <span>
                          You left off debugging{" "}
                          <code className="text-xs bg-secondary px-1 rounded">
                            {recentActivity.lastFile}
                          </code>
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Resume
                        </Badge>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  View Summary
                </Button>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
