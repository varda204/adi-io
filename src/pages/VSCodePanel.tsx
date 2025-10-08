import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileCode, 
  GitCommit, 
  FolderTree, 
  Send,
  Clock,
  CheckCircle2,
  Code2
} from "lucide-react";
import { KordiAvatar } from "@/components/KordiAvatar";
import { VoiceIndicator } from "@/components/VoiceIndicator";
import { IDESelector } from "@/components/IDESelector";
import { useState } from "react";

const VSCodePanel = () => {
  const [selectedIDE, setSelectedIDE] = useState("VS Code");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">Multi-IDE Integration</h1>
                  <VoiceIndicator active={false} />
                </div>
                <p className="text-muted-foreground">KORDI works seamlessly across all your favorite IDEs</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Code2 className="w-3 h-3 mr-1" />
                {selectedIDE}
              </Badge>
            </div>

            {/* IDE Selection */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-4">Select IDE Environment</h2>
              <IDESelector selected={selectedIDE} onSelect={setSelectedIDE} />
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* File Explorer */}
              <Card className="lg:col-span-2 p-6 bg-card border-border/50">
                <Tabs defaultValue="files" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="files">
                      <FolderTree className="w-4 h-4 mr-2" />
                      Files
                    </TabsTrigger>
                    <TabsTrigger value="commits">
                      <GitCommit className="w-4 h-4 mr-2" />
                      Commits
                    </TabsTrigger>
                    <TabsTrigger value="deployments">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Deployments
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="files" className="space-y-2">
                    <FileItem name="src" type="folder" />
                    <div className="ml-6 space-y-2">
                      <FileItem name="components" type="folder" />
                      <div className="ml-6 space-y-2">
                        <FileItem name="Header.tsx" type="file" modified />
                        <FileItem name="Footer.tsx" type="file" />
                        <FileItem name="Button.tsx" type="file" modified />
                      </div>
                      <FileItem name="pages" type="folder" />
                      <div className="ml-6 space-y-2">
                        <FileItem name="Home.tsx" type="file" />
                        <FileItem name="About.tsx" type="file" modified />
                      </div>
                      <FileItem name="utils" type="folder" />
                      <FileItem name="App.tsx" type="file" />
                    </div>
                    <FileItem name="package.json" type="file" />
                    <FileItem name="README.md" type="file" />
                  </TabsContent>

                  <TabsContent value="commits" className="space-y-3">
                    <CommitItem
                      hash="a3f8c2e"
                      message="feat: Add user authentication flow"
                      time="5 minutes ago"
                      files={3}
                      auto
                    />
                    <CommitItem
                      hash="b7d4e9f"
                      message="fix: Resolve memory leak in session handling"
                      time="2 hours ago"
                      files={2}
                      auto
                    />
                    <CommitItem
                      hash="c2e1a8d"
                      message="refactor: Optimize database queries"
                      time="5 hours ago"
                      files={4}
                    />
                    <CommitItem
                      hash="d9f3b2c"
                      message="docs: Update API documentation"
                      time="1 day ago"
                      files={1}
                    />
                  </TabsContent>

                  <TabsContent value="deployments" className="space-y-3">
                    <DeploymentItem
                      env="Production"
                      status="success"
                      time="2 hours ago"
                      build="#127"
                    />
                    <DeploymentItem
                      env="Staging"
                      status="success"
                      time="4 hours ago"
                      build="#126"
                    />
                    <DeploymentItem
                      env="Development"
                      status="building"
                      time="Just now"
                      build="#128"
                    />
                  </TabsContent>
                </Tabs>
              </Card>

              {/* KORDI Chat Sidebar */}
              <Card className="p-6 bg-card border-border/50 flex flex-col h-[600px]">
                <div className="flex items-center gap-3 mb-6">
                  <KordiAvatar size="md" />
                  <div>
                    <h2 className="text-lg font-semibold">KORDI</h2>
                    <p className="text-xs text-muted-foreground">Your autonomous AI teammate</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4 mb-4 overflow-auto">
                  <AIChatMessage
                    type="assistant"
                    message="I noticed you modified Button.tsx. Would you like me to update the corresponding tests?"
                  />
                  <AIChatMessage
                    type="user"
                    message="Yes, please also check if there are any accessibility issues"
                  />
                  <AIChatMessage
                    type="assistant"
                    message="Great! I've updated the tests and found 2 accessibility improvements. Adding proper ARIA labels and keyboard navigation support."
                  />
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <Clock className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm text-primary">Analyzing code...</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input 
                    placeholder="Ask about your code..." 
                    className="flex-1"
                  />
                  <Button size="icon" className="bg-gradient-primary hover:opacity-90">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const FileItem = ({ name, type, modified }: any) => (
  <div className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-lg cursor-pointer group">
    <FileCode className={`w-4 h-4 ${type === 'folder' ? 'text-accent' : 'text-muted-foreground'}`} />
    <span className="text-sm group-hover:text-foreground transition-colors">{name}</span>
    {modified && (
      <span className="ml-auto w-2 h-2 bg-warning rounded-full"></span>
    )}
  </div>
);

const CommitItem = ({ hash, message, time, files, auto }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        <code className="text-xs bg-background px-2 py-1 rounded">{hash}</code>
        {auto && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Auto</span>
        )}
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
    <p className="text-sm mb-1">{message}</p>
    <p className="text-xs text-muted-foreground">{files} files changed</p>
  </div>
);

const DeploymentItem = ({ env, status, time, build }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${
          status === 'success' ? 'bg-success' : 'bg-warning animate-pulse'
        }`} />
        <span className="font-medium">{env}</span>
      </div>
      <code className="text-xs bg-background px-2 py-1 rounded">{build}</code>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className={`${
        status === 'success' ? 'text-success' : 'text-warning'
      }`}>
        {status === 'success' ? 'Deployed' : 'Building...'}
      </span>
      <span className="text-muted-foreground">{time}</span>
    </div>
  </div>
);

const AIChatMessage = ({ type, message }: any) => (
  <div className={`flex gap-3 ${type === 'user' ? 'justify-end' : ''}`}>
    {type === 'assistant' && (
      <KordiAvatar size="sm" showPulse={false} className="flex-shrink-0" />
    )}
    <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${
      type === 'user' 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-secondary'
    }`}>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

export default VSCodePanel;
