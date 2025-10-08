import { Mic, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KordiAvatar } from "./KordiAvatar";
import { useState } from "react";

interface VoiceCommandInterfaceProps {
  onCommand?: (command: string) => void;
}

export const VoiceCommandInterface = ({ onCommand }: VoiceCommandInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recentCommands] = useState([
    { command: "Kordi, deploy feature-auth to production", time: "2m ago", status: "completed" },
    { command: "Kordi, run security scan", time: "5m ago", status: "completed" },
    { command: "Kordi, fix failing tests", time: "10m ago", status: "in-progress" },
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (onCommand && !isListening) {
      setTimeout(() => {
        onCommand("Kordi, deploy feature-auth to production");
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center gap-4 mb-6">
        <KordiAvatar size="md" state={isListening ? "monitoring" : "idle"} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">Voice Command Center</h3>
          <p className="text-sm text-muted-foreground">
            Say "Kordi" followed by your command
          </p>
        </div>
        <Button
          size="lg"
          onClick={toggleListening}
          className={`${
            isListening
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-gradient-primary hover:opacity-90"
          } transition-all`}
        >
          <Mic className={`w-4 h-4 mr-2 ${isListening ? "animate-pulse" : ""}`} />
          {isListening ? "Listening..." : "Start Voice Command"}
        </Button>
      </div>

      {/* Voice Visualization */}
      {isListening && (
        <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-center gap-2 h-16">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-primary rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 60 + 20}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Listening for "Kordi"...
          </p>
        </div>
      )}

      {/* Recent Commands */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-medium">Recent Voice Commands</h4>
        </div>
        <div className="space-y-2">
          {recentCommands.map((cmd, idx) => (
            <div
              key={idx}
              className="p-3 bg-secondary/30 rounded-lg border border-border/50 flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">{cmd.command}</p>
                <p className="text-xs text-muted-foreground">{cmd.time}</p>
              </div>
              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  cmd.status === "completed"
                    ? "bg-success/20 text-success"
                    : "bg-warning/20 text-warning animate-pulse"
                }`}
              >
                {cmd.status === "completed" ? "✓ Done" : "⏳ Running"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
