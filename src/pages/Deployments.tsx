import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, CheckCircle2, Clock, XCircle, GitBranch } from "lucide-react";
import { VoiceCommandInterface } from "@/components/VoiceCommandInterface";
import { DeploymentPipeline } from "@/components/DeploymentPipeline";
import { VoiceIndicator } from "@/components/VoiceIndicator";

const Deployments = () => {
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
                <p className="text-muted-foreground">One-command deployment with KORDI</p>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
                <Rocket className="w-4 h-4 mr-2" />
                Quick Deploy
              </Button>
            </div>

            {/* Voice Command Interface */}
            <VoiceCommandInterface />

            {/* Active Deployment Pipeline */}
            <DeploymentPipeline />

            {/* Environment Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <EnvironmentCard
                name="Production"
                status="healthy"
                uptime="99.9%"
                lastDeploy="2h ago"
                version="v2.4.1"
              />
              <EnvironmentCard
                name="Staging"
                status="deploying"
                uptime="100%"
                lastDeploy="Just now"
                version="v2.5.0-rc.1"
              />
              <EnvironmentCard
                name="Development"
                status="healthy"
                uptime="98.5%"
                lastDeploy="15m ago"
                version="v2.5.0-dev"
              />
            </div>

            {/* Deployment History */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Deployment History</h2>
              <div className="space-y-4">
                <DeploymentRow
                  build="#128"
                  environment="Staging"
                  status="deploying"
                  branch="main"
                  commit="a3f8c2e"
                  message="feat: Add user authentication"
                  time="Just now"
                  duration="Building..."
                />
                <DeploymentRow
                  build="#127"
                  environment="Production"
                  status="success"
                  branch="main"
                  commit="b7d4e9f"
                  message="fix: Resolve session handling bug"
                  time="2 hours ago"
                  duration="2m 34s"
                />
                <DeploymentRow
                  build="#126"
                  environment="Staging"
                  status="success"
                  branch="develop"
                  commit="c2e1a8d"
                  message="refactor: Optimize database queries"
                  time="4 hours ago"
                  duration="3m 12s"
                />
                <DeploymentRow
                  build="#125"
                  environment="Production"
                  status="failed"
                  branch="main"
                  commit="d9f3b2c"
                  message="chore: Update dependencies"
                  time="1 day ago"
                  duration="Failed at 1m 45s"
                />
                <DeploymentRow
                  build="#124"
                  environment="Development"
                  status="success"
                  branch="feature/new-ui"
                  commit="e4a2c7f"
                  message="feat: Redesign dashboard UI"
                  time="1 day ago"
                  duration="2m 56s"
                />
              </div>
            </Card>

            {/* Deployment Pipeline */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Deployment Pipeline</h2>
              <div className="flex items-center justify-between">
                <PipelineStage name="Build" status="success" />
                <div className="flex-1 h-0.5 bg-success mx-4" />
                <PipelineStage name="Test" status="success" />
                <div className="flex-1 h-0.5 bg-success mx-4" />
                <PipelineStage name="Security Scan" status="running" />
                <div className="flex-1 h-0.5 bg-border mx-4" />
                <PipelineStage name="Deploy" status="pending" />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const EnvironmentCard = ({ name, status, uptime, lastDeploy, version }: any) => (
  <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">{name}</h3>
      <Badge variant={status === 'healthy' ? 'default' : 'secondary'} className={
        status === 'healthy' ? 'bg-success/20 text-success' : 
        status === 'deploying' ? 'bg-warning/20 text-warning' : ''
      }>
        {status}
      </Badge>
    </div>
    <div className="space-y-2 text-sm">
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
  </Card>
);

const DeploymentRow = ({ build, environment, status, branch, commit, message, time, duration }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
        status === 'success' ? 'bg-success/10' : 
        status === 'deploying' ? 'bg-warning/10' : 
        'bg-destructive/10'
      }`}>
        {status === 'success' && <CheckCircle2 className="w-5 h-5 text-success" />}
        {status === 'deploying' && <Clock className="w-5 h-5 text-warning animate-pulse" />}
        {status === 'failed' && <XCircle className="w-5 h-5 text-destructive" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <code className="text-sm bg-background px-2 py-1 rounded">{build}</code>
          <Badge variant="outline" className="text-xs">{environment}</Badge>
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
    </div>
  </div>
);

const PipelineStage = ({ name, status }: any) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
      status === 'success' ? 'bg-success/10 border-success' : 
      status === 'running' ? 'bg-warning/10 border-warning' : 
      'bg-secondary border-border'
    }`}>
      {status === 'success' && <CheckCircle2 className="w-5 h-5 text-success" />}
      {status === 'running' && <Clock className="w-5 h-5 text-warning animate-pulse" />}
      {status === 'pending' && <div className="w-2 h-2 bg-muted-foreground rounded-full" />}
    </div>
    <span className="text-sm font-medium">{name}</span>
  </div>
);

export default Deployments;
