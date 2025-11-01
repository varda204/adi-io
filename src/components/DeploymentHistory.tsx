import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, GitBranch, User } from "lucide-react";

const mockHistory = [
  {
    build: 142,
    version: "v2.4.1",
    timestamp: "2 hours ago",
    status: "success",
    deployer: "You",
    branch: "main",
    platform: "Vercel",
  },
  {
    build: 141,
    version: "v2.4.0",
    timestamp: "1 day ago",
    status: "success",
    deployer: "Sarah",
    branch: "main",
    platform: "Vercel",
  },
  {
    build: 140,
    version: "v2.3.9",
    timestamp: "2 days ago",
    status: "failed",
    deployer: "Mike",
    branch: "develop",
    platform: "Vercel",
  },
];

interface DeploymentHistoryProps {
  projectName: string;
}

export const DeploymentHistory = ({ projectName }: DeploymentHistoryProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Deployment History</h3>
        <div className="space-y-3">
          {mockHistory.map((deploy) => (
            <div
              key={deploy.build}
              className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  deploy.status === "success" ? "bg-success/10" : "bg-destructive/10"
                }`}
              >
                {deploy.status === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">Build #{deploy.build}</span>
                  <Badge variant="outline">{deploy.version}</Badge>
                  <Badge variant="secondary">{deploy.platform}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {deploy.timestamp}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {deploy.deployer}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    {deploy.branch}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View Logs
                </Button>
                {deploy.status === "success" && (
                  <Button size="sm" variant="outline">
                    Rollback
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
