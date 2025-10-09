import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitCommit, FileCode, Sparkles, CheckCircle2 } from "lucide-react";

export const LiveRepoSync = () => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Live Repo Sync</h2>
          <Badge className="bg-success/10 text-success border-success/30 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
            Up-to-date
          </Badge>
        </div>
        <Badge className="bg-gradient-primary text-primary-foreground gap-1.5 animate-pulse">
          <Sparkles className="w-3 h-3" />
          Magic Mode
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Commit Stream */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Real-time Commit Stream</h3>
          <div className="space-y-3">
            <CommitItem
              message="feat: update login flow (auto)"
              branch="feature/auth-145"
              time="2 seconds ago"
              status="syncing"
            />
            <CommitItem
              message="fix: resolve API timeout issue (auto)"
              branch="main"
              time="45 seconds ago"
              status="synced"
            />
            <CommitItem
              message="refactor: optimize database queries (auto)"
              branch="develop"
              time="2 minutes ago"
              status="synced"
            />
          </div>
        </div>

        {/* File Tree Updates */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Auto-updating File Tree</h3>
          <div className="space-y-2 font-mono text-xs">
            <FileItem name="src/auth/LoginForm.tsx" status="modified" />
            <FileItem name="src/api/endpoints.ts" status="modified" />
            <FileItem name="src/components/UserDashboard.tsx" status="new" />
            <FileItem name="src/utils/validation.ts" status="new" />
            <FileItem name="tests/auth.test.ts" status="modified" />
          </div>
        </div>
      </div>

      {/* Branch Auto-creation */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">Branch Auto-Creation</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">feature/auth-145</p>
              <p className="text-xs text-muted-foreground">Auto-created from ticket</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">fix/checkout-146</p>
              <p className="text-xs text-muted-foreground">Synced with GitHub</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const CommitItem = ({ message, branch, time, status }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50">
    <GitCommit className={`w-4 h-4 mt-0.5 ${status === 'syncing' ? 'text-warning animate-pulse' : 'text-success'}`} />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{message}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-muted-foreground font-mono">{branch}</span>
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground">{time}</span>
        {status === 'syncing' && (
          <Badge variant="outline" className="text-xs h-5 bg-warning/10 text-warning border-warning/30">
            Syncing...
          </Badge>
        )}
      </div>
    </div>
  </div>
);

const FileItem = ({ name, status }: any) => {
  const statusConfig: any = {
    new: { icon: "📄", color: "text-success", label: "NEW" },
    modified: { icon: "📝", color: "text-warning", label: "MOD" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2 p-2 rounded hover:bg-secondary/50 transition-colors">
      <span>{config.icon}</span>
      <FileCode className="w-3 h-3 text-muted-foreground" />
      <span className="flex-1">{name}</span>
      <Badge variant="outline" className={`text-xs h-5 ${config.color}`}>
        {config.label}
      </Badge>
    </div>
  );
};
