import { useState, useEffect } from "react";
import { KordiAvatar } from "@/components/KordiAvatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Send, Zap, Code, Rocket, Search, CheckCircle, Users, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type KordiMode = "solo" | "team" | "project";
type EmotionalTone = "calm" | "focused" | "excited" | "debugging";

const quickCommands = {
  solo: [
    { icon: Rocket, label: "Summarize commits", command: "Summarize my last commits" },
    { icon: Code, label: "Prep test suite", command: "Prepare a test suite for my code" },
    { icon: Search, label: "Check dependencies", command: "Check for dependency updates" },
    { icon: CheckCircle, label: "Generate docs", command: "Generate documentation" },
  ],
  team: [
    { icon: Users, label: "Team sync", command: "Show me what the team is working on" },
    { icon: Code, label: "Review PRs", command: "Show pending pull requests for review" },
    { icon: Rocket, label: "Coordinate deploy", command: "Coordinate team deployment" },
    { icon: CheckCircle, label: "Check blockers", command: "Check for team blockers" },
  ],
  project: [
    { icon: Search, label: "Debug tests", command: "Help me debug the failing tests" },
    { icon: Code, label: "Explain context", command: "Explain the project context" },
    { icon: Rocket, label: "Deploy status", command: "Show deployment status" },
    { icon: CheckCircle, label: "Code health", command: "Check overall code health" },
  ],
};

const modeGreetings = {
  solo: {
    calm: "Hey! Want me to summarize your last commits or prep a test suite?",
    focused: "Ready to dive in. What are we building today?",
    excited: "Let's ship something amazing! What's first?",
    debugging: "I see you're working through something. Need help debugging?",
  },
  team: {
    calm: "Your team is active. Sarah's working on auth.ts. Want to sync or review her PR?",
    focused: "3 PRs pending review, 2 deployments queued. Where should we focus?",
    excited: "Team velocity is up 23%! Ready to coordinate the next sprint?",
    debugging: "Mike flagged a blocker in payments. Want to help resolve it?",
  },
  project: {
    calm: "You're in api-gateway. I noticed 3 failing tests—want help debugging?",
    focused: "This project has 847 files. I can help you navigate or refactor.",
    excited: "Test coverage is at 94%! Want to push that to 100%?",
    debugging: "I detected a memory leak in worker.ts. Let me show you.",
  },
};

interface ContextAwareKordiPanelProps {
  mode?: KordiMode;
  projectName?: string;
}

export const ContextAwareKordiPanel = ({ 
  mode = "solo", 
  projectName = "current project" 
}: ContextAwareKordiPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [emotionalTone, setEmotionalTone] = useState<EmotionalTone>("calm");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentTask, setCurrentTask] = useState("Ready to assist");

  // Initialize with context-aware greeting
  useEffect(() => {
    const greeting = modeGreetings[mode][emotionalTone];
    setMessages([
      {
        role: "assistant",
        content: greeting,
        timestamp: new Date(),
      },
    ]);
  }, [mode, emotionalTone]);

  // Determine emotional tone based on context (simplified)
  useEffect(() => {
    const determineEmotionalTone = () => {
      // This would be based on actual project state
      const hour = new Date().getHours();
      if (hour >= 9 && hour < 12) return "focused";
      if (hour >= 12 && hour < 17) return "calm";
      if (hour >= 17 && hour < 21) return "excited";
      return "debugging";
    };
    
    setEmotionalTone(determineEmotionalTone());
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: `I'll help you with that! Let me ${inputValue.toLowerCase()}...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleQuickCommand = (command: string) => {
    setInputValue(command);
  };

  const toggleVoice = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      setIsListening(true);
      setTimeout(() => setIsListening(false), 3000);
    } else {
      setIsListening(false);
    }
  };

  // Determine Kordi's visual state based on mode
  const getKordiState = () => {
    if (isListening) return "monitoring";
    if (mode === "team") return "reviewing";
    if (mode === "project") return "coding";
    return "idle";
  };

  // Determine mood ring color
  const getMoodColor = () => {
    switch (mode) {
      case "solo": return "bg-success/30";
      case "team": return "bg-primary/30";
      case "project": return "bg-accent/30";
      default: return "bg-success/30";
    }
  };

  return (
    <>
      {/* Floating Assistant Button with Mood Ring */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Current Task Badge */}
        {currentTask !== "Ready to assist" && (
          <Badge className="bg-primary/90 text-primary-foreground shadow-primary animate-fade-in">
            <Zap className="w-3 h-3 mr-1 animate-pulse" />
            {currentTask}
          </Badge>
        )}

        {/* Quick Commands Sidebar - shown on hover */}
        <div className="group relative">
          <div className="absolute bottom-0 right-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-card border border-border/50 rounded-lg shadow-card p-2 space-y-1 w-48">
              <p className="text-xs font-semibold text-muted-foreground px-2 py-1">
                Quick Commands
              </p>
              {quickCommands[mode].map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsOpen(true);
                    handleQuickCommand(cmd.command);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-secondary/50 transition-colors text-sm"
                >
                  <cmd.icon className="w-4 h-4 text-accent" />
                  <span>{cmd.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Button with Mood Ring */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative hover:scale-110 transition-all duration-300 cursor-pointer group"
            aria-label="Open Kordi Assistant"
          >
            <KordiAvatar
              size="lg"
              state={getKordiState()}
              showPulse={true}
              activity={currentTask}
            />
            {/* Mood Ring */}
            <div className={`absolute -inset-1 ${getMoodColor()} rounded-full blur-sm animate-pulse`} 
              style={{ animationDuration: '3s' }} 
            />
            {(isListening) && (
              <div className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
            )}
          </button>
        </div>
      </div>

      {/* Chat Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0 bg-card border-border/50 animate-scale-in">
          <DialogHeader className="p-6 pb-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <KordiAvatar
                    size="md"
                    state={getKordiState()}
                    showPulse={false}
                  />
                  <div className={`absolute -inset-0.5 ${getMoodColor()} rounded-full blur-sm`} />
                </div>
                <div>
                  <DialogTitle className="flex items-center gap-2">
                    Kordi - AI Teammate
                    <Badge variant="outline" className="text-xs">
                      {mode === "solo" ? <User className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                      {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                    </Badge>
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    {isListening ? "🎤 Listening..." : `Working on ${projectName}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isVoiceMode ? "default" : "outline"}
                  onClick={toggleVoice}
                  className={isVoiceMode ? "bg-accent hover:bg-accent/90" : ""}
                >
                  {isListening ? (
                    <Mic className="w-4 h-4 animate-pulse" />
                  ) : isVoiceMode ? (
                    <Mic className="w-4 h-4" />
                  ) : (
                    <MicOff className="w-4 h-4" />
                  )}
                  <span className="ml-2">
                    {isVoiceMode ? "Voice" : "Text"}
                  </span>
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <KordiAvatar size="sm" showPulse={false} />
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 border border-border/50"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold">
                      You
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Commands */}
          <div className="px-6 py-3 border-t border-border/50">
            <Tabs defaultValue={mode} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-2">
                <TabsTrigger value="solo">Solo</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="project">Project</TabsTrigger>
              </TabsList>
              {(['solo', 'team', 'project'] as KordiMode[]).map((m) => (
                <TabsContent key={m} value={m} className="mt-0">
                  <div className="flex gap-2 flex-wrap">
                    {quickCommands[m].map((cmd, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickCommand(cmd.command)}
                        className="text-xs"
                      >
                        <cmd.icon className="w-3 h-3 mr-1" />
                        {cmd.label}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Input */}
          <div className="p-6 pt-3 border-t border-border/50">
            {isVoiceMode && isListening ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-accent rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 30 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Listening for your command...
                </span>
              </div>
            ) : (
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask Kordi anything..."
                  className="min-h-[60px] resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-primary hover:opacity-90 shadow-primary"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
