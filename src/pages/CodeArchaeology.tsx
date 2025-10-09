import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  FileCode, 
  GitCommit, 
  MessageSquare,
  User,
  Calendar,
  ArrowRight,
  Lightbulb,
  GitBranch,
  History
} from "lucide-react";
import { KordiAvatar } from "@/components/KordiAvatar";

const CodeArchaeology = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Code Archaeology</h1>
              <p className="text-muted-foreground">
                Explore the historical context and evolution of your codebase
              </p>
            </div>

            {/* Search */}
            <Card className="p-4 bg-card border-border/50">
              <div className="flex gap-3">
                <Input 
                  placeholder="Search for any file, function, or code snippet..." 
                  className="flex-1"
                />
                <Button className="bg-gradient-primary hover:opacity-90">
                  <History className="w-4 h-4 mr-2" />
                  Search History
                </Button>
              </div>
            </Card>

            {/* File History View */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Timeline & Changes */}
              <Card className="lg:col-span-2 p-6 bg-card border-border/50">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">LoginForm.tsx</h2>
                      <p className="text-sm text-muted-foreground">src/components/auth/LoginForm.tsx</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Full File
                    </Button>
                  </div>

                  {/* Interactive Blame Map */}
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 mb-6">
                    <h3 className="text-sm font-semibold mb-3">Ownership Map</h3>
                    <div className="space-y-2">
                      <OwnershipBar author="Sarah Chen" percentage={45} color="bg-primary" />
                      <OwnershipBar author="Mike Johnson" percentage={30} color="bg-accent" />
                      <OwnershipBar author="KORDI" percentage={25} color="bg-success" />
                    </div>
                  </div>

                  {/* Code Evolution Timeline */}
                  <Tabs defaultValue="timeline" className="w-full">
                    <TabsList>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      <TabsTrigger value="changes">Changes</TabsTrigger>
                      <TabsTrigger value="discussions">Discussions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="timeline" className="mt-4 space-y-4">
                      <TimelineItem
                        date="2 days ago"
                        author="Sarah Chen"
                        commit="a3f8c2e"
                        message="Added OAuth 2.0 support"
                        pr="#234"
                        changes="+45 -12"
                      />
                      <TimelineItem
                        date="1 week ago"
                        author="KORDI"
                        commit="b7d4e9f"
                        message="Refactored validation logic"
                        pr="#221"
                        changes="+23 -34"
                        isKordi
                      />
                      <TimelineItem
                        date="2 weeks ago"
                        author="Mike Johnson"
                        commit="c2e1a8d"
                        message="Initial authentication implementation"
                        pr="#210"
                        changes="+156 -8"
                      />
                    </TabsContent>

                    <TabsContent value="changes" className="mt-4">
                      <CodeDiffView
                        before="const handleLogin = (email, password) => {"
                        after="const handleLogin = async (credentials: LoginCredentials) => {"
                        reason="Type safety and async handling"
                      />
                      <CodeDiffView
                        before="// Basic email validation"
                        after="// OAuth 2.0 flow with refresh tokens"
                        reason="Enhanced security requirements"
                      />
                    </TabsContent>

                    <TabsContent value="discussions" className="mt-4 space-y-3">
                      <DiscussionItem
                        author="Sarah Chen"
                        comment="Should we add 2FA support here?"
                        replies={3}
                        date="3 days ago"
                      />
                      <DiscussionItem
                        author="KORDI"
                        comment="Detected potential security issue in password handling. Suggested fix committed."
                        replies={1}
                        date="1 week ago"
                        isKordi
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>

              {/* Context & Insights */}
              <div className="space-y-6">
                {/* Why This Change? */}
                <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    <h3 className="text-sm font-semibold">Why This Change?</h3>
                  </div>
                  <div className="space-y-3">
                    <AIExplanation
                      title="OAuth 2.0 Addition"
                      explanation="Added to meet enterprise client requirements for SSO integration. Improved security posture and user experience."
                    />
                    <AIExplanation
                      title="Async Refactor"
                      explanation="Required for proper error handling and loading states. Prevents UI blocking during authentication."
                    />
                  </div>
                </Card>

                {/* Original Context */}
                <Card className="p-4 bg-card border-border/50">
                  <h3 className="text-sm font-semibold mb-3">Original Context</h3>
                  <div className="space-y-3">
                    <ContextItem
                      icon={<User className="w-4 h-4 text-primary" />}
                      label="Original Author"
                      value="Mike Johnson"
                    />
                    <ContextItem
                      icon={<GitCommit className="w-4 h-4 text-success" />}
                      label="Linked PR"
                      value="#210: Add Authentication"
                    />
                    <ContextItem
                      icon={<FileCode className="w-4 h-4 text-accent" />}
                      label="Ticket"
                      value="#145: User Auth System"
                    />
                    <ContextItem
                      icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
                      label="Created"
                      value="Jan 15, 2025"
                    />
                  </div>
                </Card>

                {/* Refactor Suggestions */}
                <Card className="p-4 bg-card border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <KordiAvatar size="sm" state="idle" />
                    <h3 className="text-sm font-semibold">Refactor Suggestions</h3>
                  </div>
                  <div className="space-y-3">
                    <RefactorSuggestion
                      title="Extract validation logic"
                      impact="Medium"
                      description="Separate concerns for better testability"
                    />
                    <RefactorSuggestion
                      title="Add error boundaries"
                      impact="High"
                      description="Improve error handling and UX"
                    />
                  </div>
                </Card>

                {/* Linked Design Decisions */}
                <Card className="p-4 bg-card border-border/50">
                  <h3 className="text-sm font-semibold mb-3">Design Decisions</h3>
                  <div className="space-y-2">
                    <DesignDecision
                      title="Why OAuth over Basic Auth?"
                      decision="Enterprise SSO requirement, better security"
                      date="Jan 10, 2025"
                    />
                    <DesignDecision
                      title="Form vs Modal?"
                      decision="Modal chosen for better UX flow"
                      date="Jan 8, 2025"
                    />
                  </div>
                </Card>
              </div>
            </div>

            {/* Before/After Comparison */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-lg font-semibold mb-4">Refactor Preview: Before vs After</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <h3 className="text-sm font-semibold mb-3 text-destructive">Before</h3>
                  <pre className="text-xs font-mono">
{`function login(email, password) {
  // No validation
  fetch('/api/login', {
    method: 'POST',
    body: { email, password }
  })
}`}
                  </pre>
                </div>
                <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                  <h3 className="text-sm font-semibold mb-3 text-success">After</h3>
                  <pre className="text-xs font-mono">
{`async function login(creds: LoginCreds) {
  validateCredentials(creds);
  try {
    return await authService.login(creds);
  } catch (error) {
    handleAuthError(error);
  }
}`}
                  </pre>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="flex-1 bg-success hover:bg-success/90">
                  Apply Refactor
                </Button>
                <Button variant="outline">Request Review</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const OwnershipBar = ({ author, percentage, color }: any) => (
  <div>
    <div className="flex items-center justify-between text-xs mb-1">
      <span>{author}</span>
      <span className="text-muted-foreground">{percentage}%</span>
    </div>
    <div className="w-full bg-secondary rounded-full h-2">
      <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

const TimelineItem = ({ date, author, commit, message, pr, changes, isKordi }: any) => (
  <div className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card/50 hover:border-primary/50 transition-colors">
    {isKordi ? (
      <KordiAvatar size="sm" state="idle" />
    ) : (
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
          {author.split(' ').map((n: string) => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
    )}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-sm">{author}</span>
        <Badge variant="outline" className="text-xs">{pr}</Badge>
      </div>
      <p className="text-sm mb-1">{message}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-mono">{commit}</span>
        <span>{changes}</span>
        <span>{date}</span>
      </div>
    </div>
  </div>
);

const CodeDiffView = ({ before, after, reason }: any) => (
  <div className="mb-4 p-3 rounded-lg border border-border/50 bg-secondary/30">
    <div className="space-y-2 mb-3">
      <div className="p-2 bg-destructive/10 rounded font-mono text-xs">
        <span className="text-destructive mr-2">-</span>
        {before}
      </div>
      <div className="p-2 bg-success/10 rounded font-mono text-xs">
        <span className="text-success mr-2">+</span>
        {after}
      </div>
    </div>
    <p className="text-xs text-muted-foreground italic">{reason}</p>
  </div>
);

const DiscussionItem = ({ author, comment, replies, date, isKordi }: any) => (
  <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
    <div className="flex items-start gap-3">
      {isKordi ? (
        <KordiAvatar size="sm" state="idle" />
      ) : (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-xs">
            {author.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold">{author}</span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm mb-2">{comment}</p>
        <Button variant="ghost" size="sm" className="h-6 text-xs">
          <MessageSquare className="w-3 h-3 mr-1" />
          {replies} replies
        </Button>
      </div>
    </div>
  </div>
);

const AIExplanation = ({ title, explanation }: any) => (
  <div className="p-3 bg-background/50 rounded-lg">
    <h4 className="text-xs font-semibold mb-1">{title}</h4>
    <p className="text-xs text-muted-foreground">{explanation}</p>
  </div>
);

const ContextItem = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-3">
    {icon}
    <div className="flex-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);

const RefactorSuggestion = ({ title, impact, description }: any) => (
  <div className="p-3 rounded-lg border border-border/50 bg-secondary/30 hover:border-primary/50 transition-colors cursor-pointer">
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-medium">{title}</span>
      <Badge variant={impact === 'High' ? 'default' : 'outline'} className="text-xs">
        {impact}
      </Badge>
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

const DesignDecision = ({ title, decision, date }: any) => (
  <div className="p-2 rounded-lg bg-secondary/30">
    <p className="text-xs font-medium mb-1">{title}</p>
    <p className="text-xs text-muted-foreground mb-1">{decision}</p>
    <p className="text-xs text-muted-foreground">{date}</p>
  </div>
);

export default CodeArchaeology;
