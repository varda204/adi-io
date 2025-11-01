import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  Users,
  GitBranch,
  GitPullRequest,
  Clock,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  Package,
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  lastModified: string;
  lastDeploy: string;
  kordiAction: string;
  healthScore: "stable" | "needs-review";
  updates: string[];
  team: string[];
  starred: boolean;
  status: string;
  commits: number;
  openPRs: number;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isStarred, setIsStarred] = useState(project.starred);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOpenProject = () => {
    toast({
      title: "Opening workspace...",
      description: `Loading ${project.name}`,
    });

    setTimeout(() => {
      navigate("/dashboard/workspace");
    }, 800);
  };

  return (
    <Card className="p-6 hover:border-primary/50 transition-all hover:shadow-glow group cursor-pointer">
      <div onClick={handleOpenProject}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                variant={project.healthScore === "stable" ? "outline" : "destructive"}
                className={
                  project.healthScore === "stable"
                    ? "bg-success/10 text-success border-success/20"
                    : ""
                }
              >
                {project.healthScore === "stable" ? (
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                ) : (
                  <AlertTriangle className="w-3 h-3 mr-1" />
                )}
                {project.healthScore === "stable" ? "Stable" : "Needs Review"}
              </Badge>
              {project.status === "archived" && (
                <Badge variant="secondary">Archived</Badge>
              )}
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setIsStarred(!isStarred);
            }}
            className={isStarred ? "text-warning" : ""}
          >
            <Star className={`w-4 h-4 ${isStarred ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <GitBranch className="w-4 h-4" />
            <span>{project.commits} commits</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GitPullRequest className="w-4 h-4" />
            <span>{project.openPRs} open PRs</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{project.lastModified}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Rocket className="w-4 h-4" />
            <span>{project.lastDeploy}</span>
          </div>
        </div>

        {/* Kordi's Last Action */}
        <div className="bg-secondary/30 rounded-lg p-3 mb-4">
          <p className="text-xs text-accent font-semibold mb-1">Kordi's Last Action</p>
          <p className="text-sm">{project.kordiAction}</p>
        </div>

        {/* Updates Available */}
        {project.updates.length > 0 && (
          <div className="flex items-start gap-2 mb-4 p-2 bg-warning/10 rounded-lg">
            <Package className="w-4 h-4 text-warning mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-warning mb-1">Updates Available</p>
              <p className="text-xs text-muted-foreground">{project.updates.join(", ")}</p>
            </div>
          </div>
        )}

        {/* Team Members */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <div className="flex -space-x-2">
            {project.team.map((member, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold"
                title={member}
              >
                {member.charAt(0)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
