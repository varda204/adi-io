import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Mic, Video, UserPlus } from "lucide-react";
import { KordiAvatar } from "@/components/KordiAvatar";

const Team = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Team Collaboration</h1>
                <p className="text-muted-foreground">Work together with your team in real-time</p>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Team Members */}
              <Card className="lg:col-span-2 p-6 bg-card border-border/50">
                <h2 className="text-xl font-semibold mb-6">Team Members</h2>
                <div className="space-y-3">
                  <TeamMember
                    name="KORDI"
                    role="AI Teammate"
                    status="online"
                    activity="Auto-committing changes to main branch"
                    commits={127}
                    isKordi
                  />
                  <TeamMember
                    name="Sarah Johnson"
                    role="Lead Developer"
                    status="online"
                    activity="Reviewing PR #234"
                    commits={47}
                  />
                  <TeamMember
                    name="Michael Chen"
                    role="Backend Engineer"
                    status="online"
                    activity="Working on API endpoints"
                    commits={32}
                  />
                  <TeamMember
                    name="Emily Davis"
                    role="Frontend Developer"
                    status="away"
                    activity="Last seen 15m ago"
                    commits={28}
                  />
                  <TeamMember
                    name="David Wilson"
                    role="DevOps Engineer"
                    status="offline"
                    activity="Last seen 2h ago"
                    commits={19}
                  />
                </div>
              </Card>

              {/* Voice Chat */}
              <Card className="p-6 bg-card border-border/50">
                <h2 className="text-xl font-semibold mb-6">Voice Channel</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="font-medium">Daily Standup</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <VoiceParticipant name="Sarah J." speaking />
                      <VoiceParticipant name="Michael C." />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Mic className="w-4 h-4 mr-2" />
                      Join Channel
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Pull Requests */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Recent Pull Requests</h2>
              <div className="space-y-3">
                <PRCard
                  number={234}
                  title="feat: Add user authentication flow"
                  author="Sarah Johnson"
                  status="open"
                  comments={5}
                  approvals={2}
                  changes="+324 -87"
                />
                <PRCard
                  number={233}
                  title="fix: Resolve memory leak in session handling"
                  author="Michael Chen"
                  status="approved"
                  comments={3}
                  approvals={3}
                  changes="+45 -23"
                />
                <PRCard
                  number={232}
                  title="refactor: Optimize database queries"
                  author="Emily Davis"
                  status="merged"
                  comments={8}
                  approvals={3}
                  changes="+156 -98"
                />
              </div>
            </Card>

            {/* Team Activity */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Team Activity Feed</h2>
              <div className="space-y-3">
                <ActivityFeedItem
                  user="Sarah Johnson"
                  action="opened pull request"
                  target="#234"
                  time="5 minutes ago"
                />
                <ActivityFeedItem
                  user="Michael Chen"
                  action="pushed commits to"
                  target="main"
                  time="15 minutes ago"
                />
                <ActivityFeedItem
                  user="Emily Davis"
                  action="commented on"
                  target="#233"
                  time="1 hour ago"
                />
                <ActivityFeedItem
                  user="David Wilson"
                  action="deployed to"
                  target="staging"
                  time="2 hours ago"
                />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const TeamMember = ({ name, role, status, activity, commits, isKordi }: any) => {
  const initials = name.split(' ').map((n: string) => n[0]).join('');
  
  return (
    <div className={`p-4 rounded-lg border transition-colors ${
      isKordi 
        ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:border-primary/50' 
        : 'bg-secondary/30 border-border/50 hover:border-primary/50'
    }`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          {isKordi ? (
            <KordiAvatar size="md" />
          ) : (
            <>
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                status === 'online' ? 'bg-success' : 
                status === 'away' ? 'bg-warning' : 
                'bg-muted-foreground'
              }`} />
            </>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{name}</h3>
            <Badge variant={isKordi ? "default" : "outline"} className={isKordi ? "bg-primary/20 text-primary text-xs" : "text-xs"}>
              {role}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{activity}</p>
          <p className="text-xs text-muted-foreground">{commits} {isKordi ? 'autonomous commits' : 'commits'} this week</p>
        </div>
      </div>
    </div>
  );
};

const VoiceParticipant = ({ name, speaking }: any) => (
  <div className={`flex items-center gap-2 p-2 rounded-lg ${speaking ? 'bg-accent/20' : 'bg-background'}`}>
    <div className={`w-2 h-2 rounded-full ${speaking ? 'bg-accent animate-pulse' : 'bg-muted-foreground'}`} />
    <span className="text-sm">{name}</span>
    <Mic className={`w-3 h-3 ml-auto ${speaking ? 'text-accent' : 'text-muted-foreground'}`} />
  </div>
);

const PRCard = ({ number, title, author, status, comments, approvals, changes }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
        status === 'merged' ? 'bg-primary/10' : 
        status === 'approved' ? 'bg-success/10' : 
        'bg-secondary'
      }`}>
        <span className="text-sm font-mono">#{number}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold truncate">{title}</h3>
          <Badge variant={
            status === 'merged' ? 'default' : 
            status === 'approved' ? 'secondary' : 
            'outline'
          } className={
            status === 'merged' ? 'bg-primary/20 text-primary' : 
            status === 'approved' ? 'bg-success/20 text-success' : ''
          }>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">by {author}</p>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">{comments} comments</span>
          <span className="text-muted-foreground">{approvals} approvals</span>
          <code className="text-xs bg-background px-2 py-1 rounded">{changes}</code>
        </div>
      </div>
    </div>
  </div>
);

const ActivityFeedItem = ({ user, action, target, time }: any) => (
  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
    <Avatar className="w-8 h-8">
      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
        {user.split(' ').map((n: string) => n[0]).join('')}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="text-sm">
        <span className="font-medium">{user}</span>{' '}
        <span className="text-muted-foreground">{action}</span>{' '}
        <code className="text-xs bg-background px-2 py-1 rounded">{target}</code>
      </p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
  </div>
);

export default Team;
