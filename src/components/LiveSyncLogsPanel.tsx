import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitCommit, GitPullRequest, Upload, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const mockLogs = [
  {
    id: 1,
    type: "commit",
    message: "Committed auth.ts (feat: add JWT auth)",
    timestamp: "14:02:01",
    status: "success",
  },
  {
    id: 2,
    type: "pr",
    message: "Created PR #234 — Add user authentication",
    timestamp: "14:02:05",
    status: "success",
  },
  {
    id: 3,
    type: "push",
    message: "Synced to GitHub — main branch",
    timestamp: "14:02:10",
    status: "success",
  },
  {
    id: 4,
    type: "deployment",
    message: "Deployment triggered — Build #142",
    timestamp: "14:03:00",
    status: "success",
  },
  {
    id: 5,
    type: "commit",
    message: "Committed utils.ts (fix: handle edge case)",
    timestamp: "14:05:23",
    status: "success",
  },
  {
    id: 6,
    type: "push",
    message: "Push failed — merge conflict detected",
    timestamp: "14:06:12",
    status: "error",
  },
];

interface LiveSyncLogsPanelProps {
  projectName: string;
}

export const LiveSyncLogsPanel = ({ projectName }: LiveSyncLogsPanelProps) => {
  const [filter, setFilter] = useState("all");

  const filteredLogs = mockLogs.filter((log) => {
    if (filter === "all") return true;
    return log.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "commit":
        return <GitCommit className="w-4 h-4" />;
      case "pr":
        return <GitPullRequest className="w-4 h-4" />;
      case "push":
        return <Upload className="w-4 h-4" />;
      case "deployment":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Live Sync Logs</h3>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="commit">Commits</SelectItem>
              <SelectItem value="pr">Pull Requests</SelectItem>
              <SelectItem value="push">Push Events</SelectItem>
              <SelectItem value="deployment">Deployments</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  log.status === "success"
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {log.status === "error" ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  getIcon(log.type)
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-muted-foreground">
                    [{log.timestamp}]
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {log.type}
                  </Badge>
                </div>
                <p className="text-sm">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">What Are Sync Logs?</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Live sync logs show real-time activity between Kordra and your GitHub repository:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Track every commit, push, and PR creation</li>
            <li>Monitor deployment triggers and status</li>
            <li>Identify sync errors and conflicts</li>
            <li>Maintain audit trail for compliance</li>
            <li>Debug GitHub integration issues</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};
