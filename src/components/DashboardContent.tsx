import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  GitCommit, 
  Rocket, 
  Bug, 
  Package,
  TrendingUp,
  Send,
  Shield,
  Zap
} from "lucide-react";
import { KordiAvatar } from "./KordiAvatar";
import { LiveDraftCard } from "./LiveDraftCard";
import { ProactiveSuggestion } from "./ProactiveSuggestion";
import { VoiceIndicator } from "./VoiceIndicator";

export const DashboardContent = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Welcome back, Developer</h1>
            <VoiceIndicator active={false} />
          </div>
          <p className="text-muted-foreground">KORDI is actively working on your projects</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
          <Zap className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Proactive Suggestions */}
      <div className="space-y-3">
        <ProactiveSuggestion
          message="Hey! I optimized your database queries - 40% faster! Want to review the changes?"
          actionLabel="Review Changes"
          onAction={() => console.log("Review")}
        />
        <ProactiveSuggestion
          message="Production deployment ready - Approve rollout to main?"
          actionLabel="Approve Deployment"
          onAction={() => console.log("Approve")}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard
          icon={<GitCommit className="w-5 h-5" />}
          label="Auto Commits"
          value="127"
          change="+12%"
          trend="up"
        />
        <StatCard
          icon={<Rocket className="w-5 h-5" />}
          label="Deployments"
          value="24"
          change="+8%"
          trend="up"
        />
        <StatCard
          icon={<Bug className="w-5 h-5" />}
          label="Bugs Fixed"
          value="43"
          change="-15%"
          trend="down"
        />
        <StatCard
          icon={<Package className="w-5 h-5" />}
          label="Dependencies"
          value="156"
          change="+3"
          trend="neutral"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Autonomous Actions */}
        <Card className="lg:col-span-2 p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Live Autonomous Actions</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">KORDI Active</span>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            <LiveDraftCard
              status="draft"
              title="Auto-committing auth changes"
              action="Review"
            />
            <LiveDraftCard
              status="live"
              title="Deploying to staging"
              progress={75}
            />
            <LiveDraftCard
              status="alert"
              title="Security vulnerability detected"
              action="Fix Now"
            />
          </div>
          <h3 className="text-lg font-semibold mb-4 mt-6">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem
              type="commit"
              title="Auto-committed 5 files"
              description="Updated authentication flow and added new components"
              time="2 minutes ago"
              icon={<GitCommit className="w-4 h-4 text-primary" />}
            />
            <ActivityItem
              type="deployment"
              title="Deployed to staging"
              description="Build #127 completed successfully"
              time="15 minutes ago"
              icon={<Rocket className="w-4 h-4 text-success" />}
            />
            <ActivityItem
              type="bug"
              title="Fixed critical bug"
              description="Resolved memory leak in user session handling"
              time="1 hour ago"
              icon={<Bug className="w-4 h-4 text-warning" />}
            />
            <ActivityItem
              type="dependency"
              title="Updated dependencies"
              description="React 18.3.1 → 18.3.2, TypeScript 5.4.5 → 5.5.0"
              time="3 hours ago"
              icon={<Package className="w-4 h-4 text-accent" />}
            />
          </div>
        </Card>

        {/* KORDI Chat */}
        <Card className="p-6 bg-card border-border/50 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <KordiAvatar size="md" />
            <div>
              <h2 className="text-lg font-semibold">KORDI</h2>
              <p className="text-xs text-muted-foreground">Your autonomous AI teammate</p>
            </div>
          </div>
          <div className="flex-1 space-y-4 mb-4 overflow-auto max-h-96">
            <ChatMessage
              type="assistant"
              message="Hi! I'm KORDI, your autonomous AI teammate. I noticed your test coverage dropped to 67%. I've already started generating tests for the new components!"
            />
            <ChatMessage
              type="user"
              message="Great! Focus on the authentication components first"
            />
            <ChatMessage
              type="assistant"
              message="Done! I've generated 12 test cases for auth and they're already committed. Your coverage is now at 89%. Want me to deploy to staging?"
            />
          </div>
          <div className="flex gap-2">
            <Input placeholder="Ask KORDI anything..." className="flex-1" />
            <Button size="icon" className="bg-gradient-primary hover:opacity-90 flex-shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectCard
            name="E-commerce Platform"
            status="active"
            commits={47}
            lastDeploy="2h ago"
          />
          <ProjectCard
            name="Mobile App API"
            status="building"
            commits={23}
            lastDeploy="Building..."
          />
          <ProjectCard
            name="Admin Dashboard"
            status="active"
            commits={89}
            lastDeploy="1d ago"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, change, trend }: any) => (
  <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className={`text-sm font-medium flex items-center gap-1 ${
        trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
      }`}>
        {trend === 'up' && <TrendingUp className="w-3 h-3" />}
        {change}
      </span>
    </div>
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </Card>
);

const ActivityItem = ({ icon, title, description, time }: any) => (
  <div className="flex gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
    <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium mb-1">{title}</p>
      <p className="text-sm text-muted-foreground truncate">{description}</p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
  </div>
);

const ChatMessage = ({ type, message }: any) => (
  <div className={`flex gap-3 ${type === 'user' ? 'justify-end' : ''}`}>
    {type === 'assistant' && (
      <KordiAvatar size="sm" showPulse={false} className="flex-shrink-0" />
    )}
    <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${
      type === 'user' 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-secondary'
    }`}>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const ProjectCard = ({ name, status, commits, lastDeploy }: any) => (
  <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all group cursor-pointer">
    <div className="flex items-start justify-between mb-4">
      <h3 className="font-semibold group-hover:text-primary transition-colors">{name}</h3>
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
      }`}>
        {status}
      </span>
    </div>
    <div className="space-y-2 text-sm text-muted-foreground">
      <p>{commits} commits this week</p>
      <p>Last deploy: {lastDeploy}</p>
    </div>
  </Card>
);
