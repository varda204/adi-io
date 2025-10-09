import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { KordiAvatar } from "@/components/KordiAvatar";
import { Plus, GitBranch, ExternalLink, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const Projects = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Projects</h1>
                <p className="text-muted-foreground">Manage your projects with autonomous AI assistance</p>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Active Projects */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Active Projects</h2>
              <div className="space-y-4">
                <ProjectCard
                  name="E-Commerce Platform"
                  status="deploying"
                  progress={75}
                  kordiAction="Optimizing database queries"
                  branch="feature/payment-integration"
                  lastCommit="2 minutes ago"
                  deployments={12}
                />
                <ProjectCard
                  name="Mobile Dashboard App"
                  status="testing"
                  progress={45}
                  kordiAction="Running automated tests"
                  branch="develop"
                  lastCommit="15 minutes ago"
                  deployments={8}
                />
                <ProjectCard
                  name="Analytics Service"
                  status="active"
                  progress={100}
                  kordiAction="Monitoring production"
                  branch="main"
                  lastCommit="1 hour ago"
                  deployments={24}
                />
              </div>
            </Card>

            {/* Ticket-to-Branch Automation */}
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Ticket-to-Branch Automation Hub</h2>
                  <p className="text-sm text-muted-foreground mt-1">Automatically create branches from project tickets</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Auto Branch Creation</span>
                  <Switch defaultChecked />
                </div>
              </div>

              {/* Integration Logos */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Integrated with:</span>
                <Badge variant="outline" className="gap-2">
                  <GitBranch className="w-3 h-3" />
                  GitHub Issues
                </Badge>
                <Badge variant="outline">Linear</Badge>
                <Badge variant="outline">Jira</Badge>
              </div>

              {/* Automation Table */}
              <div className="space-y-3">
                <TicketRow
                  ticketId="145"
                  title="Add user authentication"
                  branch="feature/auth-145"
                  status="completed"
                />
                <TicketRow
                  ticketId="146"
                  title="Fix checkout bug"
                  branch="fix/checkout-146"
                  status="in-progress"
                />
                <TicketRow
                  ticketId="147"
                  title="Implement dark mode"
                  branch="feature/dark-mode-147"
                  status="active"
                />
                <TicketRow
                  ticketId="148"
                  title="Optimize API responses"
                  branch="perf/api-optimization-148"
                  status="awaiting"
                />
              </div>
            </Card>

            {/* Documentation Panel */}
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Auto-Generated Documentation</h2>
                  <p className="text-sm text-muted-foreground mt-1">KORDI keeps your docs synchronized with every commit</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Auto-Sync with Commits</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Updates */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-4">Recent Updates</h3>
                  <DocUpdate
                    title="API v2.3 Documentation"
                    action="Updated endpoint descriptions"
                    time="5 minutes ago"
                  />
                  <DocUpdate
                    title="Authentication Guide"
                    action="Added OAuth flow diagram"
                    time="1 hour ago"
                  />
                  <DocUpdate
                    title="Database Schema"
                    action="Synced with latest migrations"
                    time="3 hours ago"
                  />
                </div>

                {/* Preview Pane */}
                <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">API_DOCUMENTATION.md</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-2 font-mono">
                    <p># API v2.3 - Authentication</p>
                    <p className="text-success">+ Added OAuth 2.0 flow details</p>
                    <p className="text-success">+ Updated token refresh examples</p>
                    <p></p>
                    <p>## Endpoints</p>
                    <p className="text-warning">~ Modified rate limiting section</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Conversations */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Recent Conversations with KORDI</h2>
              <div className="space-y-4">
                <ConversationItem
                  message="Can you optimize the database queries in the user service?"
                  response="I've analyzed the queries and implemented indexing on the email field. Performance improved by 40%."
                  time="10 minutes ago"
                />
                <ConversationItem
                  message="Deploy the auth feature to staging"
                  response="Deploying feature/auth-145 to staging. Running tests... Deployment successful!"
                  time="1 hour ago"
                />
                <ConversationItem
                  message="What's the status of bug #146?"
                  response="I've fixed the checkout bug and created PR #247. All tests passing, ready for review."
                  time="3 hours ago"
                />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const ProjectCard = ({ name, status, progress, kordiAction, branch, lastCommit, deployments }: any) => {
  const statusConfig: any = {
    deploying: { color: "text-warning", bg: "bg-warning/10 border-warning/30", label: "Deploying" },
    testing: { color: "text-primary", bg: "bg-primary/10 border-primary/30", label: "Testing" },
    active: { color: "text-success", bg: "bg-success/10 border-success/30", label: "Active" },
  };

  const config = statusConfig[status];

  return (
    <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all bg-card/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            <Badge className={`${config.bg} ${config.color} border`}>
              {config.label}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              {branch}
            </span>
            <span>•</span>
            <span>{lastCommit}</span>
            <span>•</span>
            <span>{deployments} deployments</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="w-3 h-3 mr-1" />
          Open
        </Button>
      </div>

      {/* KORDI Action */}
      <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
        <KordiAvatar size="sm" state="coding" />
        <div className="flex-1">
          <p className="text-sm font-medium">KORDI is working</p>
          <p className="text-xs text-muted-foreground">{kordiAction}</p>
        </div>
      </div>

      {/* Progress */}
      {progress < 100 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
};

const TicketRow = ({ ticketId, title, branch, status }: any) => {
  const statusConfig: any = {
    completed: { icon: CheckCircle2, color: "text-success", label: "Completed" },
    "in-progress": { icon: Clock, color: "text-warning", label: "In Progress" },
    active: { icon: GitBranch, color: "text-primary", label: "Active" },
    awaiting: { icon: AlertCircle, color: "text-muted-foreground", label: "Awaiting Approval" },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <Badge variant="outline" className="font-mono">#{ticketId}</Badge>
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground font-mono">{branch}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className={`text-xs ${config.color}`}>{config.label}</span>
      </div>
    </div>
  );
};

const DocUpdate = ({ title, action, time }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
    <KordiAvatar size="sm" state="idle" />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{action}</p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
  </div>
);

const ConversationItem = ({ message, response, time }: any) => (
  <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-card/50">
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">
        You
      </div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
    </div>
    <div className="flex gap-3">
      <KordiAvatar size="sm" state="idle" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{response}</p>
        <p className="text-xs text-muted-foreground mt-2">{time}</p>
      </div>
    </div>
  </div>
);

export default Projects;
