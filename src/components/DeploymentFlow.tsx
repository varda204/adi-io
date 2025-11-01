import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Rocket, CheckCircle2, AlertTriangle, GitBranch, Shield, TestTube } from "lucide-react";

interface DeploymentFlowProps {
  projectName: string;
}

export const DeploymentFlow = ({ projectName }: DeploymentFlowProps) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [platform, setPlatform] = useState("vercel");
  const { toast } = useToast();

  const handleDeploy = () => {
    setIsDeploying(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          toast({
            title: "Deployment successful!",
            description: `${projectName} is now live on ${platform}`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Kordi Confidence Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Ready to Deploy</h3>
            <p className="text-muted-foreground mb-4">
              I've analyzed your latest changes and everything looks good to go.
            </p>
            <div className="flex items-center gap-4">
              <Badge className="bg-success/10 text-success border-success/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                94% Confidence
              </Badge>
              <Badge className="bg-success/10 text-success border-success/20">
                <TestTube className="w-3 h-3 mr-1" />
                147/147 Tests Passed
              </Badge>
              <Badge className="bg-success/10 text-success border-success/20">
                <Shield className="w-3 h-3 mr-1" />
                Security Safe
              </Badge>
            </div>
          </div>
          <div className="text-4xl font-bold text-primary">94%</div>
        </div>
      </Card>

      {/* Deployment Configuration */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Deployment Configuration</h3>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vercel">Vercel</SelectItem>
                  <SelectItem value="netlify">Netlify</SelectItem>
                  <SelectItem value="railway">Railway</SelectItem>
                  <SelectItem value="aws">AWS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Branch</label>
              <Select defaultValue="main">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="develop">develop</SelectItem>
                  <SelectItem value="staging">staging</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Build Command</label>
            <div className="bg-secondary/30 rounded-lg p-3 font-mono text-sm">
              npm run build
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Environment Variables</label>
            <div className="bg-secondary/30 rounded-lg p-3 space-y-1 text-sm">
              <div className="font-mono">NODE_ENV: production</div>
              <div className="font-mono">API_KEY: ${'{'}API_KEY{'}'}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Deployment Progress */}
      {isDeploying && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Deploying...</h3>
          <Progress value={progress} className="mb-4" />
          <div className="space-y-2 text-sm text-muted-foreground">
            {progress >= 0 && <div>✓ Installing dependencies...</div>}
            {progress >= 20 && <div>✓ Running tests...</div>}
            {progress >= 40 && <div>✓ Building project...</div>}
            {progress >= 60 && <div>✓ Optimizing assets...</div>}
            {progress >= 80 && <div>✓ Deploying to {platform}...</div>}
            {progress >= 100 && <div className="text-success">✓ Deployment complete!</div>}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleDeploy}
          disabled={isDeploying}
          className="bg-gradient-primary hover:opacity-90 shadow-glow"
        >
          <Rocket className="w-4 h-4 mr-2" />
          {isDeploying ? "Deploying..." : "Deploy Now"}
        </Button>
        <Button variant="outline">Hold</Button>
        <Button variant="outline">Rollback to Previous</Button>
      </div>
    </div>
  );
};
