import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

interface DeploymentSettingsProps {
  projectName: string;
}

export const DeploymentSettings = ({ projectName }: DeploymentSettingsProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Deployment configuration updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Kordi Auto-Detection */}
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold mb-2">Kordi Auto-Detected Configuration</h3>
            <p className="text-sm text-muted-foreground">
              This is a Next.js app. I've prepped Vercel with <code className="bg-secondary/50 px-1 rounded">next build</code>. Ready to deploy?
            </p>
          </div>
        </div>
      </Card>

      {/* Platform Configuration */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Platform Configuration</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="platform">Deployment Platform</Label>
            <Select defaultValue="vercel">
              <SelectTrigger id="platform">
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
            <Label htmlFor="build-cmd">Build Command</Label>
            <Input id="build-cmd" defaultValue="npm run build" className="font-mono" />
          </div>

          <div>
            <Label htmlFor="output-dir">Output Directory</Label>
            <Input id="output-dir" defaultValue="dist" className="font-mono" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-deploy">Auto-Deploy on Push</Label>
              <p className="text-sm text-muted-foreground">
                Automatically deploy when changes are pushed to main branch
              </p>
            </div>
            <Switch id="auto-deploy" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Environment Variables */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Environment Variables</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Key</Label>
              <Input defaultValue="NODE_ENV" className="font-mono" />
            </div>
            <div>
              <Label>Value</Label>
              <Input defaultValue="production" className="font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input placeholder="API_KEY" className="font-mono" />
            </div>
            <div>
              <Input placeholder="***********" type="password" className="font-mono" />
            </div>
          </div>
          <Button variant="outline" size="sm">
            + Add Variable
          </Button>
        </div>
      </Card>

      {/* Rollback Policy */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Rollback Policy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-rollback">Auto-Rollback on Failure</Label>
              <p className="text-sm text-muted-foreground">
                Automatically rollback if deployment fails health checks
              </p>
            </div>
            <Switch id="auto-rollback" defaultChecked />
          </div>
        </div>
      </Card>

      <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
        Save Settings
      </Button>
    </div>
  );
};
