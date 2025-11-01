import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Mic, Video, UserPlus, Check, Code, GitCommit, Clock } from "lucide-react";
import { KordiAvatar } from "@/components/KordiAvatar";

const Team = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <TopNav />
        <div className="flex flex-1">
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

            {/* Live Team Activity Feed */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Live Team Activity</h2>
              <div className="space-y-3">
                <ActivityFeedItem
                  member="KORDI"
                  action="deployed build #142 to staging"
                  time="Just now"
                  isKordi
                />
                <ActivityFeedItem
                  member="Sarah Johnson"
                  action="approved PR #234"
                  time="3m ago"
                />
                <ActivityFeedItem
                  member="Michael Chen"
                  action="pushed 5 commits to feature/payments"
                  time="12m ago"
                />
                <ActivityFeedItem
                  member="KORDI"
                  action="fixed security vulnerability in auth.ts"
                  time="25m ago"
                  isKordi
                />
                <ActivityFeedItem
                  member="Emily Davis"
                  action="started code review on PR #233"
                  time="1h ago"
                />
              </div>
            </Card>

            {/* Ownership Map */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Code Ownership Map</h2>
              <div className="space-y-4">
                <OwnershipMapItem
                  module="Authentication"
                  owner="Sarah Johnson"
                  contributors={["Michael C.", "KORDI"]}
                  files={12}
                />
                <OwnershipMapItem
                  module="API Endpoints"
                  owner="Michael Chen"
                  contributors={["David W.", "KORDI"]}
                  files={24}
                />
                <OwnershipMapItem
                  module="UI Components"
                  owner="Emily Davis"
                  contributors={["Sarah J.", "KORDI"]}
                  files={38}
                />
                <OwnershipMapItem
                  module="Deployment Pipeline"
                  owner="David Wilson"
                  contributors={["KORDI"]}
                  files={8}
                />
              </div>
            </Card>

            {/* Refactor Preview */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Recent Refactors</h2>
              <div className="space-y-4">
                <RefactorPreviewCard
                  title="Query Optimization"
                  before="87 lines"
                  after="42 lines"
                  improvement="-52% code, +40% performance"
                  author="KORDI"
                />
                <RefactorPreviewCard
                  title="Component Restructure"
                  before="156 lines"
                  after="98 lines"
                  improvement="-37% code, better reusability"
                  author="Sarah Johnson"
                />
              </div>
            </Card>

            {/* Code Archaeology */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Code Archaeology</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Understand codebase history and context for onboarding and non-technical members
              </p>
              
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="context">Context</TabsTrigger>
                  <TabsTrigger value="discussions">Talks</TabsTrigger>
                  <TabsTrigger value="uml">UML</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="space-y-3 mt-4">
                  <TimelineItem
                    date="Today"
                    event="Authentication refactor completed"
                    author="KORDI & Sarah J."
                  />
                  <TimelineItem
                    date="Yesterday"
                    event="Payment integration added"
                    author="Michael C."
                  />
                  <TimelineItem
                    date="3 days ago"
                    event="Initial project setup"
                    author="Sarah J."
                  />
                </TabsContent>

                <TabsContent value="context" className="mt-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <p className="text-sm font-medium mb-1">Why this module exists</p>
                      <p className="text-xs text-muted-foreground">
                        Authentication module handles user login, JWT tokens, and session management. 
                        Critical for security and user experience.
                      </p>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <p className="text-sm font-medium mb-1">Key dependencies</p>
                      <p className="text-xs text-muted-foreground">
                        bcrypt, jsonwebtoken, express-session
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="discussions" className="mt-4">
                  <div className="space-y-3">
                    <DiscussionItem
                      topic="Should we use JWT or sessions?"
                      participants={["Sarah J.", "Michael C."]}
                      conclusion="JWT for better scalability"
                    />
                    <DiscussionItem
                      topic="Token expiration time?"
                      participants={["Team"]}
                      conclusion="15 minutes with refresh token"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="uml" className="mt-4">
                  <div className="p-6 bg-secondary/30 rounded-lg text-center">
                    <Code className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      UML diagram for authentication flow
                    </p>
                    <Button size="sm" className="mt-3" variant="outline">
                      Generate Diagram
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Project Membership */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Project Membership</h2>
              <div className="space-y-4">
                <ProjectMembershipItem
                  project="Kordra Frontend"
                  members={["Sarah J.", "Michael C.", "KORDI"]}
                  role="Lead Developer"
                  contributions="247 commits • 12 PRs"
                />
                <ProjectMembershipItem
                  project="API Gateway"
                  members={["Michael C.", "KORDI"]}
                  role="Backend Engineer"
                  contributions="89 commits • 5 PRs"
                />
                <ProjectMembershipItem
                  project="Analytics Dashboard"
                  members={["Emily D.", "Sarah J.", "KORDI"]}
                  role="Frontend Developer"
                  contributions="134 commits • 8 PRs"
                />
              </div>
              <Button className="w-full mt-4" variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Assign Member to Project
              </Button>
            </Card>

            {/* Team Heatmap */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Team Activity Heatmap</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-10 rounded ${
                        i % 3 === 0 ? 'bg-success/20' :
                        i % 3 === 1 ? 'bg-primary/20' :
                        'bg-secondary/20'
                      } hover:opacity-80 cursor-pointer transition-opacity`}
                      title={`${Math.floor(Math.random() * 50)} commits`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Less active</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-secondary/20 rounded" />
                    <div className="w-4 h-4 bg-primary/20 rounded" />
                    <div className="w-4 h-4 bg-success/20 rounded" />
                  </div>
                  <span>More active</span>
                </div>
              </div>
            </Card>

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

            {/* Manager Dashboard */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Manager Dashboard</h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <KordiAvatar size="sm" showPulse={false} />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">AI-Generated PR Summary</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        <strong>PR #234:</strong> Improved login flow with JWT authentication. 
                        Added 6 new tests, no regressions detected. Security scan passed. 
                        Ready for production deployment.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Share to Slack
                        </Button>
                        <Button size="sm" variant="outline">Email Summary</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Team Velocity</p>
                    <p className="text-2xl font-bold">47 <span className="text-sm text-success">commits/week</span></p>
                  </div>
                  <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Bugs Fixed</p>
                    <p className="text-2xl font-bold">23 <span className="text-sm text-muted-foreground">this week</span></p>
                  </div>
                  <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Test Coverage</p>
                    <p className="text-2xl font-bold text-success">+8%</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 pt-6">
                <h3 className="font-semibold mb-4">Automated Onboarding</h3>
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <h4 className="font-medium mb-2">Welcome Alex! 👋</h4>
                  <p className="text-sm text-muted-foreground mb-3">Your personalized onboarding guide is ready</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Key files: auth.ts, api.ts, utils.ts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Project experts: Sarah (auth), Michael (backend)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Recent changes: 12 commits in last 24h</span>
                    </li>
                  </ul>
                  <Button size="sm" className="mt-3 bg-accent hover:bg-accent/90 text-accent-foreground">
                    Start Interactive Tour with Kordi
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const ProjectMembershipItem = ({ project, members, role, contributions }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="font-semibold mb-1">{project}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
        Active
      </Badge>
    </div>
    <div className="flex items-center gap-2 mb-2">
      {members.map((member: string, i: number) => (
        <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold">
          {member.split(' ')[0][0]}
        </div>
      ))}
    </div>
    <p className="text-xs text-muted-foreground">{contributions}</p>
  </div>
);

const TeamMember = ({ name, role, status, activity, commits, isKordi }: any) => {
  const initials = name.split(' ').map((n: string) => n[0]).join('');
  const ideStatus = status === 'online' ? 'VS Code' : status === 'away' ? 'Cursor (Idle)' : 'Offline';
  const emotionalCue = status === 'online' ? '🟢' : status === 'away' ? '🟡 Needs review' : '🔴 Blocked';
  
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
            <Badge variant="outline" className="text-xs">
              {role}
            </Badge>
            {!isKordi && (
              <span className="text-xs">{emotionalCue}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{activity}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <GitCommit className="w-3 h-3" />
              {commits} commits
            </span>
            {!isKordi && (
              <>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Code className="w-3 h-3" />
                  {ideStatus}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Mic className="w-3 h-3" />
                  {status === 'online' ? 'Voice Active' : 'No voice'}
                </span>
              </>
            )}
          </div>
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

const ActivityFeedItemTechnical = ({ user, action, target, time }: any) => (
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

const ActivityFeedItem = ({ member, action, time, isKordi }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
    {isKordi ? <KordiAvatar size="sm" showPulse={false} /> : (
      <Avatar className="w-8 h-8"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">{member.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback></Avatar>
    )}
    <div className="flex-1"><p className="text-sm"><span className="font-semibold">{member}</span> <span className="text-muted-foreground">{action}</span></p><p className="text-xs text-muted-foreground mt-1">{time}</p></div>
  </div>
);

const OwnershipMapItem = ({ module, owner, contributors, files }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50"><div className="flex items-center justify-between mb-2"><h3 className="font-semibold">{module}</h3><Badge variant="outline" className="text-xs">{files} files</Badge></div><p className="text-sm text-muted-foreground mb-2">Owner: <span className="font-medium text-foreground">{owner}</span></p><p className="text-xs text-muted-foreground">Contributors: {contributors.join(', ')}</p></div>
);

const RefactorPreviewCard = ({ title, before, after, improvement, author }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50"><div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-sm">{title}</h3><Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">{improvement}</Badge></div><div className="flex items-center gap-3 text-xs text-muted-foreground mb-2"><span className="text-destructive">{before}</span><span>→</span><span className="text-success">{after}</span></div><p className="text-xs text-muted-foreground">By {author}</p></div>
);

const TimelineItem = ({ date, event, author }: any) => (
  <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg"><Clock className="w-4 h-4 text-accent mt-0.5" /><div className="flex-1"><p className="text-sm font-medium">{event}</p><p className="text-xs text-muted-foreground">{date} • {author}</p></div></div>
);

const DiscussionItem = ({ topic, participants, conclusion }: any) => (
  <div className="p-3 bg-secondary/30 rounded-lg"><p className="text-sm font-medium mb-1">{topic}</p><p className="text-xs text-muted-foreground mb-2">Participants: {participants.join(', ')}</p><p className="text-xs"><span className="text-success font-medium">Conclusion:</span> {conclusion}</p></div>
);

export default Team;
