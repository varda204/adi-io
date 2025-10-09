import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Rocket, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Server,
  Shield,
  RotateCcw,
  XCircle,
  GitBranch,
  Settings,
  TrendingUp,
  Container
} from "lucide-react";
import { KordiAvatar } from "@/components/KordiAvatar";
import { VoiceCommandInterface } from "@/components/VoiceCommandInterface";
import { DeploymentPipeline } from "@/components/DeploymentPipeline";
import { VoiceIndicator } from "@/components/VoiceIndicator";
import { useState } from "react";

const Deployments = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("Vercel");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">Autonomous Deployments</h1>
                  <VoiceIndicator active={true} />
                </div>
                <p className="text-muted-foreground">Multi-platform deployment with one command</p>
              </div>
            </div>

            {/* Voice Command Interface */}
            <VoiceCommandInterface />

            {/* Deployment Target Selector */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-lg font-semibold mb-4">Deployment Platform</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <PlatformButton
                  name="Vercel"
                  icon="▲"
                  selected={selectedPlatform === "Vercel"}
                  onClick={() => setSelectedPlatform("Vercel")}
                />
                <PlatformButton
                  name="AWS"
                  icon="☁️"
                  selected={selectedPlatform === "AWS"}
                  onClick={() => setSelectedPlatform("AWS")}
                />
                <PlatformButton
                  name="Netlify"
                  icon="◆"
                  selected={selectedPlatform === "Netlify"}
                  onClick={() => setSelectedPlatform("Netlify")}
                />
                <PlatformButton
                  name="Docker"
                  icon={<Container className="w-4 h-4" />}
                  selected={selectedPlatform === "Docker"}
                  onClick={() => setSelectedPlatform("Docker")}
                />
                <PlatformButton
                  name="GitHub"
                  icon="🐙"
                  selected={selectedPlatform === "GitHub"}
                  onClick={() => setSelectedPlatform("GitHub")}
                />
                <PlatformButton
                  name="Custom"
                  icon={<Settings className="w-4 h-4" />}
                  selected={selectedPlatform === "Custom"}
                  onClick={() => setSelectedPlatform("Custom")}
                />
              </div>

              {/* Platform Configuration */}
              <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border/50">
                <h3 className="text-sm font-semibold mb-3">{selectedPlatform} Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Build Command</label>
                    <Input defaultValue="npm run build" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Environment Variables</label>
                    <Input placeholder="VITE_API_URL=https://api.example.com" className="mt-1" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Smart Deployment Recommendation */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="flex items-start gap-4">
                <KordiAvatar size="md" state="idle" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">KORDI Recommends Deployment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Build #132 is ready for staging deployment. All checks passed with 94% confidence.
                  </p>
                  
                  {/* Risk Assessment */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-xs font-semibold">Tests</span>
                      </div>
                      <p className="text-sm font-bold">147/147</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-success" />
                        <span className="text-xs font-semibold">Security</span>
                      </div>
                      <p className="text-sm font-bold text-success">Safe</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-warning" />
                        <span className="text-xs font-semibold">Risk</span>
                      </div>
                      <p className="text-sm font-bold text-warning">Low</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-success hover:bg-success/90">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve Deployment
                    </Button>
                    <Button variant="outline">
                      Hold
                    </Button>
                    <Button variant="outline" className="text-destructive">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Rollback
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Active Deployment Pipeline */}
            <DeploymentPipeline />

            {/* Build → Test → Deploy → Verify Pipeline */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Pipeline Progress</h2>
              <div className="space-y-4">
                <PipelineBar stage="Build" status="completed" progress={100} time="45s" />
                <PipelineBar stage="Test" status="completed" progress={100} time="1m 23s" />
                <PipelineBar stage="Security Scan" status="running" progress={65} time="Running..." />
                <PipelineBar stage="Deploy" status="pending" progress={0} time="Waiting..." />
                <PipelineBar stage="Verify" status="pending" progress={0} time="Waiting..." />
              </div>

              {/* Auto-Rollback */}
              <div className="mt-6 p-4 bg-warning/5 rounded-lg border border-warning/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <h3 className="text-sm font-semibold">Auto-Rollback Enabled</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  If tests fail → automatic rollback in 30 seconds
                </p>
              </div>
            </Card>

            {/* Docker Containerization */}
            {selectedPlatform === "Docker" && (
              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <Container className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Docker Containerization</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3">Container Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Image</span>
                        <code className="text-xs">kordra:latest</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size</span>
                        <span>234 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge className="bg-success/20 text-success">Running</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg font-mono text-xs">
                    <p className="text-success">✓ Building Docker image...</p>
                    <p className="text-success">✓ Layer 1/5 complete</p>
                    <p className="text-success">✓ Layer 2/5 complete</p>
                    <p className="text-warning">⟳ Layer 3/5 in progress...</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Environment Health & Logs */}
            <div className="grid md:grid-cols-3 gap-4">
              <EnvironmentCard
                name="Production"
                status="healthy"
                uptime="99.9%"
                lastDeploy="2h ago"
                version="v2.4.1"
                health={98}
              />
              <EnvironmentCard
                name="Staging"
                status="deploying"
                uptime="100%"
                lastDeploy="Just now"
                version="v2.5.0-rc.1"
                health={100}
              />
              <EnvironmentCard
                name="Development"
                status="healthy"
                uptime="98.5%"
                lastDeploy="15m ago"
                version="v2.5.0-dev"
                health={95}
              />
            </div>

            {/* Deployment History with Rollback */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Deployment History</h2>
              <div className="space-y-4">
                <DeploymentRow
                  build="#132"
                  environment="Staging"
                  status="deploying"
                  branch="main"
                  commit="a3f8c2e"
                  message="feat: Add user authentication"
                  time="Just now"
                  duration="Building..."
                />
                <DeploymentRow
                  build="#131"
                  environment="Production"
                  status="success"
                  branch="main"
                  commit="b7d4e9f"
                  message="fix: Resolve session handling bug"
                  time="2 hours ago"
                  duration="2m 34s"
                  canRollback
                />
                <DeploymentRow
                  build="#130"
                  environment="Staging"
                  status="success"
                  branch="develop"
                  commit="c2e1a8d"
                  message="refactor: Optimize database queries"
                  time="4 hours ago"
                  duration="3m 12s"
                />
              </div>
            </Card>

            {/* Deployment Logs */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-4">Live Deployment Logs</h2>
              <div className="p-4 bg-black/90 rounded-lg font-mono text-xs text-green-400 max-h-64 overflow-auto">
                <p>[12:45:23] Starting deployment process...</p>
                <p>[12:45:24] Installing dependencies...</p>
                <p>[12:45:45] Running build command...</p>
                <p>[12:46:12] Build completed successfully</p>
                <p>[12:46:13] Running tests...</p>
                <p className="text-yellow-400">[12:46:45] Security scan in progress...</p>
                <p className="animate-pulse">[12:46:46] █</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const PlatformButton = ({ name, icon, selected, onClick }: any) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-lg border-2 transition-all ${
      selected
        ? "border-primary bg-primary/10"
        : "border-border/50 hover:border-border"
    }`}
  >
    <div className="flex flex-col items-center gap-2">
      <div className="text-2xl">{icon}</div>
      <span className="text-xs font-medium">{name}</span>
    </div>
  </button>
);

const PipelineBar = ({ stage, status, progress, time }: any) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        {status === "completed" && <CheckCircle2 className="w-4 h-4 text-success" />}
        {status === "running" && <Clock className="w-4 h-4 text-warning animate-pulse" />}
        {status === "pending" && <div className="w-4 h-4 rounded-full border-2 border-border" />}
        <span className="text-sm font-medium">{stage}</span>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
    <Progress value={progress} className="h-2" />
  </div>
);

const EnvironmentCard = ({ name, status, uptime, lastDeploy, version, health }: any) => (
  <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">{name}</h3>
      <Badge
        variant={status === "healthy" ? "default" : "secondary"}
        className={
          status === "healthy"
            ? "bg-success/20 text-success"
            : status === "deploying"
            ? "bg-warning/20 text-warning"
            : ""
        }
      >
        {status}
      </Badge>
    </div>
    <div className="space-y-2 text-sm mb-4">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Uptime</span>
        <span className="font-medium">{uptime}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Last Deploy</span>
        <span className="font-medium">{lastDeploy}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Version</span>
        <code className="text-xs bg-background px-2 py-1 rounded">{version}</code>
      </div>
    </div>
    
    {/* Health Stats */}
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-muted-foreground">Health</span>
        <span className="font-semibold">{health}%</span>
      </div>
      <Progress value={health} className="h-1" />
    </div>
  </Card>
);

const DeploymentRow = ({ build, environment, status, branch, commit, message, time, duration, canRollback }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          status === "success"
            ? "bg-success/10"
            : status === "deploying"
            ? "bg-warning/10"
            : "bg-destructive/10"
        }`}
      >
        {status === "success" && <CheckCircle2 className="w-5 h-5 text-success" />}
        {status === "deploying" && <Clock className="w-5 h-5 text-warning animate-pulse" />}
        {status === "failed" && <XCircle className="w-5 h-5 text-destructive" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <code className="text-sm bg-background px-2 py-1 rounded">{build}</code>
          <Badge variant="outline" className="text-xs">
            {environment}
          </Badge>
          <span className="text-sm text-muted-foreground">{time}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <GitBranch className="w-3 h-3 text-muted-foreground" />
          <span className="text-sm">{branch}</span>
          <code className="text-xs bg-background px-2 py-1 rounded">{commit}</code>
        </div>

        <p className="text-sm mb-2">{message}</p>
        <p className="text-xs text-muted-foreground">Duration: {duration}</p>
      </div>

      {canRollback && (
        <Button variant="outline" size="sm" className="flex-shrink-0">
          <RotateCcw className="w-3 h-3 mr-1" />
          Rollback
        </Button>
      )}
    </div>
  </div>
);

export default Deployments;
