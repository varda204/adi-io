import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  FileCode, 
  GitCommit, 
  FolderTree, 
  Send,
  Clock,
  CheckCircle2,
  Code2,
  Sparkles,
  Mic,
  GitBranch,
  Shield,
  AlertCircle,
  FileText,
  MessageSquare,
  Bell,
  Lightbulb,
  Zap
} from "lucide-react";
import { KordiAvatar } from "@/components/KordiAvatar";
import { VoiceIndicator } from "@/components/VoiceIndicator";
import { IDESelector } from "@/components/IDESelector";
import { LiveRepoSync } from "@/components/LiveRepoSync";
import { useState } from "react";

const VSCodePanel = () => {
  const [selectedIDE, setSelectedIDE] = useState("VS Code");
  const [isProactiveMode, setIsProactiveMode] = useState(true);
  const [magicMode, setMagicMode] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        {/* LEFT SIDEBAR - File Suggestions */}
        <div className="w-64 border-r border-border/50 p-4 space-y-4 bg-card/30">
          <div>
            <h3 className="text-sm font-semibold mb-3">Intelligent Suggestions</h3>
            <div className="space-y-2">
              <SuggestionCard
                icon={<Lightbulb className="w-4 h-4 text-warning" />}
                title="Need auth files?"
                action="Click to create"
              />
              <SuggestionCard
                icon={<FileCode className="w-4 h-4 text-primary" />}
                title="Missing test files"
                action="Generate tests"
              />
              <SuggestionCard
                icon={<Shield className="w-4 h-4 text-success" />}
                title="Security config"
                action="Add CORS setup"
              />
            </div>
          </div>

          <Card className="p-3 bg-secondary/30 border-border/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Project Optimizer</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Restructure for better organization?
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Preview Changes
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Auto-approve</span>
                <Switch />
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Quick Actions</h3>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <FileText className="w-3 h-3 mr-2" />
              View All Files
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <GitBranch className="w-3 h-3 mr-2" />
              Branch Manager
            </Button>
          </div>
        </div>

        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="border-b border-border/50 p-4 bg-card/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  <h1 className="text-xl font-bold">IDE Integration</h1>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {selectedIDE}
                </Badge>
                <VoiceIndicator active={false} />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {isProactiveMode ? 'Proactive Mode' : 'Reactive Mode'}
                  </span>
                  <Switch checked={isProactiveMode} onCheckedChange={setIsProactiveMode} />
                </div>
                <Badge className={`gap-1.5 ${magicMode ? 'bg-gradient-primary animate-pulse' : 'bg-secondary'}`}>
                  <Sparkles className="w-3 h-3" />
                  Magic Mode {magicMode ? 'ON' : 'OFF'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* IDE Selection */}
              <Card className="p-6 bg-card border-border/50">
                <h2 className="text-lg font-semibold mb-4">Select IDE Environment</h2>
                <IDESelector selected={selectedIDE} onSelect={setSelectedIDE} />
              </Card>

              {/* Live Repo Sync */}
              <LiveRepoSync />

              {/* MAIN EDITOR AREA */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Editor with Live Commit Feed */}
                <Card className="lg:col-span-2 p-6 bg-card border-border/50">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-4">Live Commit Feed</h2>
                    <div className="space-y-3">
                      <CommitStreamItem
                        message="feat: add user authentication"
                        confidence={94}
                        time="2 seconds ago"
                        status="committing"
                      />
                      <CommitStreamItem
                        message="fix: resolve API timeout issue"
                        confidence={87}
                        time="45 seconds ago"
                        status="committed"
                      />
                      <CommitStreamItem
                        message="refactor: optimize database queries"
                        confidence={92}
                        time="2 minutes ago"
                        status="committed"
                      />
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-4 mt-4">
                    <Tabs defaultValue="files" className="w-full">
                      <TabsList>
                        <TabsTrigger value="files">Files</TabsTrigger>
                        <TabsTrigger value="commits">Commits</TabsTrigger>
                        <TabsTrigger value="history">Code History</TabsTrigger>
                      </TabsList>

                      <TabsContent value="files" className="space-y-2 mt-4">
                        <FileItem name="src/auth/LoginForm.tsx" modified icon="📝" />
                        <FileItem name="src/api/endpoints.ts" modified icon="📝" />
                        <FileItem name="src/components/Dashboard.tsx" new icon="📄" />
                        <FileItem name="tests/auth.test.ts" new icon="📄" />
                      </TabsContent>

                      <TabsContent value="commits" className="space-y-3 mt-4">
                        <CommitHistoryItem
                          hash="a3f8c2e"
                          message="feat: Add user authentication flow"
                          time="5 minutes ago"
                          files={3}
                          auto
                        />
                        <CommitHistoryItem
                          hash="b7d4e9f"
                          message="fix: Resolve memory leak"
                          time="2 hours ago"
                          files={2}
                          auto
                        />
                      </TabsContent>

                      <TabsContent value="history" className="mt-4">
                        <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                          <p className="text-sm text-muted-foreground">
                            Right-click any code block to select "Explain Code History"
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </Card>

                {/* RIGHT SIDEBAR - PR Review & Voice */}
                <div className="space-y-6">
                  {/* PR Review Panel */}
                  <Card className="p-4 bg-card border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold">PR Reviews</h3>
                      <Badge variant="outline" className="text-xs">3 Open</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <PRReviewItem
                        number={234}
                        title="Add login flow"
                        comments={5}
                        status="approved"
                      />
                      <PRReviewItem
                        number={235}
                        title="Fix checkout bug"
                        comments={2}
                        status="pending"
                      />
                    </div>

                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-start gap-2">
                        <Bell className="w-4 h-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-xs font-medium">New Slack message</p>
                          <p className="text-xs text-muted-foreground">Mike: PR #234 ready for merge</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Branch Suggestions */}
                  <Card className="p-4 bg-card border-border/50">
                    <h3 className="text-sm font-semibold mb-3">Branch Suggestions</h3>
                    <div className="space-y-2">
                      <BranchSuggestion
                        ticket="#145"
                        branch="feature/auth-145"
                      />
                      <BranchSuggestion
                        ticket="#146"
                        branch="fix/checkout-146"
                      />
                    </div>
                  </Card>

                  {/* Voice + Chat Interface */}
                  <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <KordiAvatar size="sm" state="idle" />
                        <div>
                          <h3 className="text-sm font-semibold">KORDI Voice</h3>
                          <p className="text-xs text-muted-foreground">Say "Deploy this"</p>
                        </div>
                      </div>
                      <Button size="icon" variant="outline" className="rounded-full">
                        <Mic className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 p-2 bg-background/50 rounded">
                        <div className="flex-1 h-8 flex items-center gap-1">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-primary/30 rounded-full"
                              style={{ height: `${Math.random() * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <VoiceCommand command="Deploy this" response="Deploying to staging..." />
                      <VoiceCommand command="Explain LoginForm.tsx" response="This file handles..." />
                    </div>
                  </Card>
                </div>
              </div>

              {/* BOTTOM PANEL - Smart Guardrails */}
              <Card className="p-6 bg-card border-border/50">
                <h2 className="text-lg font-semibold mb-4">Smart Push Guardrails</h2>
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <GuardrailCheck label="Tests" status="passed" value="147/147" />
                  <GuardrailCheck label="Lint" status="passed" value="No issues" />
                  <GuardrailCheck label="Security" status="passed" value="Safe" />
                  <GuardrailCheck label="Performance" status="warning" value="Bundle +2KB" />
                </div>

                <div className="border-t border-border/50 pt-4 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Auto Documentation Sync</h3>
                    <Badge variant="outline" className="text-xs">Live Preview</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-secondary/30 rounded-lg font-mono text-xs">
                      <p className="text-success">+ Added authentication endpoints</p>
                      <p className="text-success">+ Updated API v2.3 docs</p>
                      <p className="text-warning">~ Modified rate limiting</p>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        README.md, API_DOCS.md updated automatically as you code
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button className="flex-1 bg-success hover:bg-success/90">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Push Changes
                  </Button>
                  <Button variant="outline">Review</Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const SuggestionCard = ({ icon, title, action }: any) => (
  <div className="p-3 rounded-lg border border-border/50 bg-card hover:border-primary/50 transition-colors cursor-pointer">
    <div className="flex items-start gap-2">
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium">{title}</p>
        <p className="text-xs text-primary">{action}</p>
      </div>
    </div>
  </div>
);

const CommitStreamItem = ({ message, confidence, time, status }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50">
    <KordiAvatar size="sm" state={status === 'committing' ? 'coding' : 'idle'} />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <p className="text-sm font-medium">KORDI {status === 'committing' ? 'committing' : 'committed'}:</p>
        <Badge variant="outline" className="text-xs bg-success/10 text-success">
          {confidence}% confident
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground font-mono">{message}</p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
    {status === 'committing' && (
      <Zap className="w-4 h-4 text-warning animate-pulse" />
    )}
  </div>
);

const FileItem = ({ name, modified, new: isNew, icon }: any) => (
  <div className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-lg cursor-pointer">
    <span>{icon}</span>
    <span className="text-sm flex-1">{name}</span>
    {modified && <Badge variant="outline" className="text-xs bg-warning/10 text-warning">MOD</Badge>}
    {isNew && <Badge variant="outline" className="text-xs bg-success/10 text-success">NEW</Badge>}
  </div>
);

const CommitHistoryItem = ({ hash, message, time, files, auto }: any) => (
  <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-center gap-2 mb-1">
      <code className="text-xs bg-background px-2 py-1 rounded">{hash}</code>
      {auto && <Badge variant="outline" className="text-xs bg-primary/10 text-primary">Auto</Badge>}
    </div>
    <p className="text-sm">{message}</p>
    <p className="text-xs text-muted-foreground mt-1">{files} files • {time}</p>
  </div>
);

const PRReviewItem = ({ number, title, comments, status }: any) => (
  <div className="p-3 rounded-lg border border-border/50 bg-secondary/30 hover:border-primary/50 transition-colors cursor-pointer">
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-medium">PR #{number}</span>
      <Badge variant={status === 'approved' ? 'default' : 'outline'} className="text-xs">
        {status === 'approved' ? 'Approved' : 'Pending'}
      </Badge>
    </div>
    <p className="text-xs text-muted-foreground mb-2">{title}</p>
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <MessageSquare className="w-3 h-3" />
      {comments} comments
    </div>
  </div>
);

const BranchSuggestion = ({ ticket, branch }: any) => (
  <div className="p-2 rounded-lg bg-secondary/30 border border-border/50">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium">{ticket}</p>
        <p className="text-xs text-muted-foreground font-mono">{branch}</p>
      </div>
      <Button size="sm" variant="ghost" className="h-6 text-xs">
        Create
      </Button>
    </div>
  </div>
);

const VoiceCommand = ({ command, response }: any) => (
  <div className="p-2 rounded-lg bg-background/50">
    <p className="text-xs font-medium">"{command}"</p>
    <p className="text-xs text-muted-foreground">{response}</p>
  </div>
);

const GuardrailCheck = ({ label, status, value }: any) => (
  <div className="p-3 rounded-lg border border-border/50 bg-card/50">
    <div className="flex items-center gap-2 mb-2">
      {status === 'passed' ? (
        <CheckCircle2 className="w-4 h-4 text-success" />
      ) : (
        <AlertCircle className="w-4 h-4 text-warning" />
      )}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-xs text-muted-foreground">{value}</p>
  </div>
);

export default VSCodePanel;
