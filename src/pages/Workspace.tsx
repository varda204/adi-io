import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  File, Folder, GitCommit, MessageSquare, Clock, 
  Code, AlertCircle, CheckCircle2, Play, User,
  GitBranch, Lightbulb, Sparkles, Zap, MessageCircle, Activity
} from "lucide-react";
import { KordiAvatar } from "@/components/KordiAvatar";
import { ContextAwareWelcome } from "@/components/ContextAwareWelcome";

const Workspace = () => {
  const [selectedFile, setSelectedFile] = useState("auth.ts");
  const [kordiMode, setKordiMode] = useState("assisted");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <TopNav />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 flex">
          {/* LEFT SIDEBAR - File Tree + Intelligent Suggestions */}
          <div className="w-72 border-r border-border/50 bg-card/30 flex flex-col">
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Files</h3>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20 animate-pulse">
                    Live
                  </Badge>
                </div>
              </div>
              <FileTree />
            </div>

            {/* Intelligent File Suggestions */}
            <div className="p-4 border-b border-border/50 bg-primary/5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">Suggestions</h3>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <File className="w-3 h-3 mr-2" />
                  Generate auth tests
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Folder className="w-3 h-3 mr-2" />
                  Create API routes
                </Button>
              </div>
            </div>

            {/* Branch Management */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-sm">Branches</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-primary/10 rounded">
                  <span className="text-xs font-medium">main</span>
                  <CheckCircle2 className="w-3 h-3 text-success" />
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Sparkles className="w-3 h-3 mr-2 text-accent" />
                  Create feature/payments
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="p-4 border-b border-border/50">
                <h3 className="font-semibold text-sm">Live Commits</h3>
              </div>
              <ScrollArea className="h-[calc(100vh-550px)]">
                <div className="p-4 space-y-3">
                  <CommitItem
                    message="feat: add user auth"
                    time="Just now"
                    confidence={94}
                    status="syncing"
                  />
                  <CommitItem
                    message="fix: resolve memory leak"
                    time="2m ago"
                    confidence={98}
                    status="synced"
                  />
                  <CommitItem
                    message="refactor: optimize queries"
                    time="5m ago"
                    confidence={92}
                    status="synced"
                  />
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* CENTER - Code Editor */}
          <div className="flex-1 flex flex-col">
            {/* Context-Aware Welcome */}
            <div className="p-4 border-b border-border/50">
              <ContextAwareWelcome
                isNewProject={false}
                projectName="Kordra Frontend"
                recentActivity={{
                  commits: 3,
                  prs: 2,
                  lastFile: "auth.ts",
                }}
              />
            </div>

            <div className="h-14 border-b border-border/50 flex items-center justify-between px-6 bg-card/30">
              <div className="flex items-center gap-3">
                <File className="w-4 h-4 text-accent" />
                <span className="font-medium">{selectedFile}</span>
                <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                  Modified
                </Badge>
                <span className="text-xs text-muted-foreground animate-pulse">• AI typing...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg">
                  <span className="text-xs text-muted-foreground">Kordi Mode:</span>
                  <Button 
                    variant={kordiMode === "manual" ? "default" : "ghost"} 
                    size="sm" 
                    className="h-6 px-2 text-xs"
                    onClick={() => setKordiMode("manual")}
                  >
                    Manual
                  </Button>
                  <Button 
                    variant={kordiMode === "assisted" ? "default" : "ghost"} 
                    size="sm" 
                    className="h-6 px-2 text-xs"
                    onClick={() => setKordiMode("assisted")}
                  >
                    Assisted
                  </Button>
                  <Button 
                    variant={kordiMode === "autonomous" ? "default" : "ghost"} 
                    size="sm" 
                    className="h-6 px-2 text-xs"
                    onClick={() => setKordiMode("autonomous")}
                  >
                    Autonomous
                  </Button>
                </div>
                <Button size="sm" variant="outline">
                  <Play className="w-3 h-3 mr-1" />
                  Run Tests
                </Button>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  <Zap className="w-3 h-3 mr-1" />
                  Deploy Now
                </Button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-auto font-mono text-sm relative">
              <CodeEditor />
              {/* AI Micro-comment */}
              <div className="absolute top-20 right-8 bg-accent/10 border border-accent/30 rounded-lg p-2 text-xs flex items-start gap-2 animate-fade-in">
                <Sparkles className="w-3 h-3 text-accent mt-0.5" />
                <span className="text-accent">Optimized this loop! -33% execution time</span>
              </div>
            </div>

            {/* Bottom Panel - Guardrails + Refactor Preview */}
            <div className="border-t border-border/50 bg-card/30">
              <Tabs defaultValue="guardrails" className="w-full">
                <TabsList className="w-full grid grid-cols-3 rounded-none border-b border-border/50">
                  <TabsTrigger value="guardrails">Smart Push Guardrails</TabsTrigger>
                  <TabsTrigger value="refactor">Refactor Preview</TabsTrigger>
                  <TabsTrigger value="pr">Auto-PR</TabsTrigger>
                </TabsList>
                
                <TabsContent value="guardrails" className="m-0 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">All Checks Passed</h3>
                    <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Push to GitHub
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <GuardrailCheck label="Tests" status="passed" count="147/147" />
                    <GuardrailCheck label="Lint" status="passed" count="0 issues" />
                    <GuardrailCheck label="Security" status="passed" count="Safe" />
                    <GuardrailCheck label="Performance" status="passed" count="+12%" />
                  </div>
                </TabsContent>

                <TabsContent value="refactor" className="m-0 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-destructive">Before (42 lines)</h4>
                      <div className="p-3 bg-destructive/5 border border-destructive/20 rounded text-xs font-mono">
                        <pre className="text-muted-foreground">function getUserData(id) {"{"}<br/>  const user = db.query(...);<br/>  const posts = db.query(...);<br/>  // ... complex logic<br/>{"}"}</pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-success">After (18 lines, -57%)</h4>
                      <div className="p-3 bg-success/5 border border-success/20 rounded text-xs font-mono">
                        <pre className="text-muted-foreground">async function getUserData(id) {"{"}<br/>  return await userService<br/>    .getUserWithPosts(id);<br/>{"}"}</pre>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-gradient-primary hover:opacity-90">
                    <Zap className="w-3 h-3 mr-1" />
                    Apply Refactor
                  </Button>
                </TabsContent>

                <TabsContent value="pr" className="m-0 p-4">
                  <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm">Ready to create PR</h4>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        94% confident
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      feat: Add JWT authentication system
                    </p>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                        Create PR #234
                      </Button>
                      <Button variant="outline">Edit</Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* RIGHT SIDEBAR - PR Review + Auto Docs + Notifications */}
          <div className="w-96 border-l border-border/50 bg-card/30">
            <Tabs defaultValue="pr" className="h-full flex flex-col">
              <TabsList className="w-full grid grid-cols-3 rounded-none border-b border-border/50">
                <TabsTrigger value="pr">PRs</TabsTrigger>
                <TabsTrigger value="docs">Docs</TabsTrigger>
                <TabsTrigger value="notifications">
                  <MessageCircle className="w-3 h-3" />
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pr" className="flex-1 m-0 overflow-auto">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    <PRReviewCard
                      number={234}
                      title="Add user authentication"
                      author="Sarah J."
                      status="open"
                      aiSummary="Implements JWT-based auth with proper validation. No security concerns detected."
                    />
                    <PRReviewCard
                      number={233}
                      title="Fix memory leak"
                      author="Michael C."
                      status="approved"
                      aiSummary="Resolves session handling issue. All tests passing. Ready to merge."
                    />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="docs" className="flex-1 m-0 overflow-auto">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    <AutoDocPreview
                      file="API.md"
                      status="updated"
                      content="## Authentication\n\nNew JWT-based authentication system..."
                    />
                    <AutoDocPreview
                      file="CHANGELOG.md"
                      status="syncing"
                      content="### v2.3.0\n\n- feat: Add user authentication\n- fix: Resolve memory leak..."
                    />
                    <AutoDocPreview
                      file="README.md"
                      status="updated"
                      content="# Project Setup\n\nUpdated with new auth instructions..."
                    />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="notifications" className="flex-1 m-0 overflow-auto">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-3">
                    <NotificationCard
                      platform="Slack"
                      message="Mike: PR #234 ready for merge"
                      time="2m ago"
                    />
                    <NotificationCard
                      platform="Linear"
                      message="New issue: KOR-142 assigned to you"
                      time="15m ago"
                    />
                    <NotificationCard
                      platform="GitHub"
                      message="Deployment to staging completed"
                      time="1h ago"
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Components
const FileTree = () => (
  <div className="space-y-1 text-sm">
    <FileTreeItem icon={<Folder className="w-4 h-4 text-accent" />} name="src" />
    <div className="ml-4 space-y-1">
      <FileTreeItem icon={<File className="w-4 h-4 text-primary" />} name="auth.ts" modified />
      <FileTreeItem icon={<File className="w-4 h-4" />} name="api.ts" />
      <FileTreeItem icon={<File className="w-4 h-4 text-success" />} name="utils.ts" isNew />
    </div>
  </div>
);

const FileTreeItem = ({ icon, name, modified, isNew }: any) => (
  <div className="flex items-center gap-2 p-1.5 rounded hover:bg-secondary/50 cursor-pointer">
    {icon}
    <span className={modified ? "text-warning" : ""}>{name}</span>
    {isNew && <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">New</Badge>}
  </div>
);

const CommitItem = ({ message, time, confidence, status }: any) => (
  <div className="p-3 bg-card border border-border/50 rounded-lg">
    <div className="flex items-start gap-2 mb-2">
      <GitCommit className="w-4 h-4 text-accent mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{message}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>{time}</span>
          <span>•</span>
          <span className="text-success">{confidence}% confident</span>
        </div>
      </div>
    </div>
    <Badge variant="outline" className={`text-xs ${
      status === 'syncing' ? 'bg-accent/10 text-accent border-accent/20 animate-pulse' :
      'bg-success/10 text-success border-success/20'
    }`}>
      {status === 'syncing' ? 'Syncing to GitHub...' : 'Synced'}
    </Badge>
  </div>
);

const CodeEditor = () => (
  <div className="space-y-1">
    <div className="text-muted-foreground">
      <span className="text-primary">export</span> <span className="text-accent">const</span>{" "}
      <span className="text-warning">authenticateUser</span> = <span className="text-primary">async</span> (
    </div>
    <div className="ml-4 text-muted-foreground">
      <span className="text-accent">email</span>: <span className="text-primary">string</span>,
    </div>
    <div className="ml-4 text-muted-foreground">
      <span className="text-accent">password</span>: <span className="text-primary">string</span>
    </div>
    <div className="text-muted-foreground">) {"=> {"}</div>
    <div className="ml-4 text-muted-foreground">
      <span className="text-primary">const</span> <span className="text-accent">user</span> ={" "}
      <span className="text-primary">await</span> <span className="text-warning">findUser</span>(email);
    </div>
    <div className="ml-4 text-muted-foreground">
      <span className="text-primary">if</span> (!user) <span className="text-primary">return</span>{" "}
      <span className="text-primary">null</span>;
    </div>
    <div className="text-muted-foreground">{"};"}</div>
  </div>
);

const GuardrailCheck = ({ label, status, count }: any) => (
  <div className="p-3 bg-card border border-success/30 rounded-lg">
    <div className="flex items-center gap-2 mb-1">
      <CheckCircle2 className="w-4 h-4 text-success" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-xs text-success">{count}</p>
  </div>
);

const NotificationCard = ({ platform, message, time }: any) => (
  <Card className="p-3 bg-card border-border/50 hover:border-primary/30 transition-colors">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <MessageCircle className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-accent mb-1">{platform}</p>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  </Card>
);

const PRReviewCard = ({ number, title, author, status, aiSummary }: any) => (
  <Card className="p-4 bg-card border-border/50">
    <div className="flex items-start justify-between mb-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold">#{number}</span>
          <Badge variant={status === 'approved' ? 'secondary' : 'outline'} 
                 className={status === 'approved' ? 'bg-success/10 text-success' : ''}>
            {status}
          </Badge>
        </div>
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <User className="w-3 h-3" />
          {author}
        </p>
      </div>
    </div>
    <div className="p-2 bg-accent/5 border border-accent/20 rounded text-xs">
      <p className="text-muted-foreground mb-1 flex items-center gap-1">
        <KordiAvatar size="sm" showPulse={false} />
        AI Summary:
      </p>
      <p>{aiSummary}</p>
    </div>
  </Card>
);

const AutoDocPreview = ({ file, status, content }: any) => (
  <Card className="p-4 bg-card border-border/50">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <File className="w-4 h-4 text-primary" />
        <span className="font-medium text-sm">{file}</span>
      </div>
      <Badge variant="outline" className={`text-xs ${
        status === 'syncing' ? 'bg-accent/10 text-accent border-accent/20 animate-pulse' :
        'bg-success/10 text-success border-success/20'
      }`}>
        {status}
      </Badge>
    </div>
    <div className="p-2 bg-background border border-border/50 rounded text-xs font-mono">
      <pre className="text-muted-foreground whitespace-pre-wrap">{content}</pre>
    </div>
  </Card>
);

export default Workspace;
