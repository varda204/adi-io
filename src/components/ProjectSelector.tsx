import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, AlertTriangle, Clock, GitPullRequest, Users, Sparkles } from "lucide-react";

const mockProjects = [
  {
    id: "kordra-frontend",
    name: "Kordra Frontend",
    status: "ready",
    lastCommit: "2 hours ago",
    lastDeploy: "4 hours ago",
    pendingPRs: 2,
    team: ["You", "Sarah", "Mike"],
    kordiRecommendation: "All checks passed. Ready to deploy!",
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    status: "blocked",
    lastCommit: "1 day ago",
    lastDeploy: "1 day ago",
    pendingPRs: 1,
    team: ["You", "Alex"],
    kordiRecommendation: "Fix 2 security issues before deploying",
  },
];

interface ProjectSelectorProps {
  selectedProject: string;
  onSelectProject: (project: string) => void;
}

export const ProjectSelector = ({ selectedProject, onSelectProject }: ProjectSelectorProps) => {
  const currentProject = mockProjects.find((p) => p.id === selectedProject);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Select Project</label>
        <Select value={selectedProject} onValueChange={onSelectProject}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mockProjects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentProject && (
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{currentProject.name}</h3>
              <div className="flex items-center gap-2">
                <Badge
                  variant={currentProject.status === "ready" ? "outline" : "destructive"}
                  className={
                    currentProject.status === "ready"
                      ? "bg-success/10 text-success border-success/20"
                      : ""
                  }
                >
                  {currentProject.status === "ready" ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 mr-1" />
                  )}
                  {currentProject.status === "ready" ? "Ready" : "Blocked"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Last Commit</div>
                <div className="font-medium">{currentProject.lastCommit}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Last Deploy</div>
                <div className="font-medium">{currentProject.lastDeploy}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GitPullRequest className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Pending PRs</div>
                <div className="font-medium">{currentProject.pendingPRs}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Team</div>
                <div className="font-medium">{currentProject.team.length} members</div>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Kordi's Recommendation</p>
                <p className="text-sm text-muted-foreground">
                  {currentProject.kordiRecommendation}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
