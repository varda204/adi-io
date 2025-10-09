import { useState, useEffect, useRef } from "react";
import { KordiAvatar } from "@/components/KordiAvatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Send, Zap, Code, Rocket, Search, CheckCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickCommands = [
  { icon: Rocket, label: "Deploy to production", command: "Deploy this to production" },
  { icon: Code, label: "Explain this code", command: "Explain the current code" },
  { icon: Search, label: "Run bug scan", command: "Run a bug radar scan" },
  { icon: CheckCircle, label: "Create PR", command: "Create a pull request" },
];

export const GlobalKordiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceActivated, setVoiceActivated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm Kordi, your autonomous AI teammate. Say 'Hey Kordi' to activate voice control, or type to chat. What would you like me to do?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentTask, setCurrentTask] = useState("Ready to assist");
  const recognitionRef = useRef<any>(null);

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

  // Voice activation with "Hey Kordi"
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        if (transcript.toLowerCase().includes('hey kordi') || transcript.toLowerCase().includes('hey kodi')) {
          setVoiceActivated(true);
          setIsListening(true);
          setIsOpen(true);
        }
      };

      recognitionRef.current.start();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleVoice = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      setIsListening(true);
      setTimeout(() => setIsListening(false), 3000);
    } else {
      setIsListening(false);
      setVoiceActivated(false);
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
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
              {quickCommands.map((cmd, i) => (
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

          {/* Avatar Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative hover:scale-110 transition-all duration-300 cursor-pointer group"
            aria-label="Open Kordi Assistant"
          >
            <KordiAvatar
              size="lg"
              state={isListening ? "monitoring" : voiceActivated ? "coding" : "idle"}
              showPulse={true}
              activity={currentTask}
            />
            {(isListening || voiceActivated) && (
              <>
                <div className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
                <div className="absolute -inset-2 bg-accent/10 rounded-full blur-md animate-pulse" />
              </>
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
                <KordiAvatar
                  size="md"
                  state={isListening ? "monitoring" : voiceActivated ? "coding" : "idle"}
                  showPulse={false}
                />
                <div>
                  <DialogTitle>Kordi - AI Teammate</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    {isListening ? "🎤 Listening..." : voiceActivated ? "Voice activated!" : "How can I help?"}
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
            <div className="flex gap-2 flex-wrap">
              {quickCommands.map((cmd, i) => (
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
