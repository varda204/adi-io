import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KordiAvatar } from "./KordiAvatar";
import { CheckCircle2, Clock, Shield, Rocket, Code2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface PipelineStage {
  name: string;
  status: "completed" | "running" | "pending" | "failed";
  duration?: string;
  icon: React.ReactNode;
}

export const DeploymentPipeline = () => {
  const [currentStage, setCurrentStage] = useState(2);
  const [autoRollback] = useState(true);

  const stages: PipelineStage[] = [
    {
      name: "Code Analysis",
      status: currentStage > 0 ? "completed" : "running",
      duration: "12s",
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      name: "Build",
      status: currentStage > 1 ? "completed" : currentStage === 1 ? "running" : "pending",
      duration: "1m 45s",
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      name: "Test Suite",
      status: currentStage > 2 ? "completed" : currentStage === 2 ? "running" : "pending",
      duration: currentStage >= 2 ? "Running..." : undefined,
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      name: "Security Scan",
      status: currentStage > 3 ? "completed" : currentStage === 3 ? "running" : "pending",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Deploy",
      status: currentStage > 4 ? "completed" : currentStage === 4 ? "running" : "pending",
      icon: <Rocket className="w-5 h-5" />,
    },
  ];

  const getKordiState = () => {
    if (currentStage === stages.length) return "success";
    if (currentStage >= 0) return "deploying";
    return "idle";
  };

  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">Autonomous CI/CD Pipeline</h2>
          <p className="text-sm text-muted-foreground">
            KORDI is managing your deployment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent">
            Risk Score: Low (2/10)
          </Badge>
          {autoRollback && (
            <Badge variant="outline" className="bg-warning/10 border-warning/20 text-warning">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Auto-rollback enabled
            </Badge>
          )}
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="relative mb-8">
        {/* Background line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
        
        {/* Progress line */}
        <div
          className="absolute top-8 left-0 h-0.5 bg-gradient-primary transition-all duration-500"
          style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
        />

        <div className="relative flex items-start justify-between">
          {stages.map((stage, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 flex-1">
              {/* Stage Circle */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                  stage.status === "completed"
                    ? "bg-success/10 border-success"
                    : stage.status === "running"
                    ? "bg-warning/10 border-warning animate-pulse"
                    : stage.status === "failed"
                    ? "bg-destructive/10 border-destructive"
                    : "bg-secondary border-border"
                } ${stage.status === "running" ? "scale-110" : ""}`}
              >
                {stage.status === "completed" && (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                )}
                {stage.status === "running" && (
                  <Clock className="w-6 h-6 text-warning animate-spin" />
                )}
                {stage.status === "failed" && (
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                )}
                {stage.status === "pending" && (
                  <div className="text-muted-foreground">{stage.icon}</div>
                )}
              </div>

              {/* Kordi Avatar at current stage */}
              {idx === currentStage && currentStage < stages.length && (
                <div className="absolute -top-2 animate-bounce">
                  <KordiAvatar size="sm" state={getKordiState()} showPulse={true} />
                </div>
              )}

              {/* Stage Details */}
              <div className="text-center">
                <p className="text-sm font-medium mb-1">{stage.name}</p>
                {stage.duration && (
                  <p className="text-xs text-muted-foreground">{stage.duration}</p>
                )}
                {stage.status === "running" && (
                  <p className="text-xs text-warning font-medium animate-pulse">
                    In Progress
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Info */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Branch</p>
          <p className="font-medium font-mono">feature-auth</p>
        </div>
        <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Target Environment</p>
          <p className="font-medium">Production</p>
        </div>
        <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Commit</p>
          <p className="font-medium font-mono">a3f8c2e</p>
        </div>
        <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Estimated Time</p>
          <p className="font-medium">~3 minutes remaining</p>
        </div>
      </div>

      {/* Auto-rollback Info */}
      {autoRollback && (
        <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Auto-Rollback Active</p>
              <p className="text-xs text-muted-foreground">
                If tests fail or errors are detected, KORDI will automatically rollback to the
                previous stable version within 30 seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm">
          View Detailed Logs
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-destructive border-destructive/30">
            Cancel Deployment
          </Button>
          {currentStage === stages.length && (
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Deployment Complete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
