import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { IDESelector } from "./IDESelector";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewProjectModal = ({ open, onOpenChange }: NewProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [selectedIDE, setSelectedIDE] = useState("");
  const [autoGitHub, setAutoGitHub] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!projectName || !selectedIDE) {
      toast({
        title: "Missing information",
        description: "Please provide a project name and select an IDE",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate project creation
    toast({
      title: "✨ Kordi is setting up your environment...",
      description: `Creating ${projectName} in ${selectedIDE}`,
    });

    setTimeout(() => {
      toast({
        title: "Project created!",
        description: `${projectName} is ready. Opening Workspace...`,
      });
      
      setIsCreating(false);
      onOpenChange(false);
      navigate("/dashboard/workspace");
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Project</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="my-awesome-app"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Choose IDE</Label>
            <IDESelector selected={selectedIDE} onSelect={setSelectedIDE} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="auto-github"
              checked={autoGitHub}
              onCheckedChange={(checked) => setAutoGitHub(checked as boolean)}
            />
            <Label
              htmlFor="auto-github"
              className="text-sm font-normal cursor-pointer"
            >
              Auto-link to GitHub repository
            </Label>
          </div>

          <Button
            onClick={handleCreate}
            disabled={isCreating}
            className="w-full bg-gradient-primary hover:opacity-90 shadow-primary"
          >
            {isCreating ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
