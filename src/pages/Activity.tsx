import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KordiAvatar } from "@/components/KordiAvatar";
import { 
  GitCommit, 
  GitPullRequest, 
  Rocket, 
  MessageSquare, 
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  Code,
  FileCode
} from "lucide-react";

const Activity = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Activity Feed</h1>
              <p className="text-muted-foreground">Live updates from your team and KORDI</p>
            </div>

            {/* Live Activity Feed */}
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <h2 className="text-xl font-semibold">Live Activity</h2>
              </div>

              <div className="space-y-4">
                {/* KORDI Activities */}
                <ActivityItem
                  isKordi
                  action="deployed"
                  target="build #132 to production"
                  time="2 minutes ago"
                  icon={Rocket}
                  iconColor="text-success"
                />
                
                <ActivityItem
                  isKordi
                  action="auto-committed"
                  target="authentication flow updates"
                  time="5 minutes ago"
                  icon={GitCommit}
                  iconColor="text-primary"
                  details="feat: implement OAuth 2.0 flow (auto)"
                />

                <ActivityItem
                  isKordi
                  action="fixed security vulnerability"
                  target="in user authentication module"
                  time="12 minutes ago"
                  icon={AlertTriangle}
                  iconColor="text-warning"
                />

                {/* Team Activities */}
                <ActivityItem
                  user="Mike Johnson"
                  action="reviewed and approved"
                  target="PR #234"
                  time="15 minutes ago"
                  icon={GitPullRequest}
                  iconColor="text-success"
                />

                <ActivityItem
                  user="Sarah Chen"
                  action="pushed 3 commits to"
                  target="feature/payment-integration"
                  time="23 minutes ago"
                  icon={GitCommit}
                  iconColor="text-primary"
                />

                <ActivityItem
                  isKordi
                  action="optimized database queries"
                  target="40% performance improvement"
                  time="35 minutes ago"
                  icon={Code}
                  iconColor="text-success"
                />

                <ActivityItem
                  user="Emily Davis"
                  action="commented on"
                  target="PR #233"
                  time="1 hour ago"
                  icon={MessageSquare}
                  iconColor="text-muted-foreground"
                  details="Great work on the new dashboard!"
                />

                <ActivityItem
                  isKordi
                  action="created branch"
                  target="feature/auth-145 from ticket #145"
                  time="1 hour ago"
                  icon={GitBranch}
                  iconColor="text-primary"
                />

                <ActivityItem
                  user="David Wilson"
                  action="merged"
                  target="PR #231 into main"
                  time="2 hours ago"
                  icon={CheckCircle2}
                  iconColor="text-success"
                />

                <ActivityItem
                  isKordi
                  action="ran automated tests"
                  target="all 147 tests passing ✓"
                  time="2 hours ago"
                  icon={CheckCircle2}
                  iconColor="text-success"
                />

                <ActivityItem
                  user="Alex Martinez"
                  action="opened new PR"
                  target="#235: Implement dark mode toggle"
                  time="3 hours ago"
                  icon={GitPullRequest}
                  iconColor="text-primary"
                />

                <ActivityItem
                  isKordi
                  action="updated documentation"
                  target="API v2.3 endpoint descriptions"
                  time="3 hours ago"
                  icon={FileCode}
                  iconColor="text-primary"
                />

                <ActivityItem
                  user="Sarah Chen"
                  action="deployed to"
                  target="staging environment"
                  time="4 hours ago"
                  icon={Rocket}
                  iconColor="text-warning"
                />

                <ActivityItem
                  isKordi
                  action="detected and fixed"
                  target="memory leak in API service"
                  time="5 hours ago"
                  icon={AlertTriangle}
                  iconColor="text-destructive"
                />

                <ActivityItem
                  user="Mike Johnson"
                  action="created branch"
                  target="fix/checkout-bug-146"
                  time="6 hours ago"
                  icon={GitBranch}
                  iconColor="text-primary"
                />
              </div>
            </Card>

            {/* Collaboration Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-card border-border/50">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Today's Commits</h3>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-success mt-1">+8 from yesterday</p>
              </Card>
              <Card className="p-4 bg-card border-border/50">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Active PRs</h3>
                <p className="text-2xl font-bold">7</p>
                <p className="text-xs text-muted-foreground mt-1">3 awaiting review</p>
              </Card>
              <Card className="p-4 bg-card border-border/50">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">KORDI Actions</h3>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-primary mt-1">Autonomous today</p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const ActivityItem = ({ isKordi, user, action, target, time, icon: Icon, iconColor, details }: any) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50">
      {isKordi ? (
        <KordiAvatar size="sm" state="idle" />
      ) : (
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
            {user?.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1">
          <Icon className={`w-4 h-4 mt-0.5 ${iconColor}`} />
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-semibold">{isKordi ? 'KORDI' : user}</span>
              {' '}
              <span className="text-muted-foreground">{action}</span>
              {' '}
              <span className="font-medium">{target}</span>
            </p>
            {details && (
              <p className="text-xs text-muted-foreground font-mono mt-1 bg-secondary/50 px-2 py-1 rounded inline-block">
                {details}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
