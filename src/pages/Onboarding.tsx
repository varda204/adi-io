import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IDESelector } from "@/components/IDESelector";
import { KordiAvatar } from "@/components/KordiAvatar";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedIDE, setSelectedIDE] = useState("VS Code");
  const [autonomyLevel, setAutonomyLevel] = useState(50);
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/dashboard");
  };

  const getAutonomyLabel = (value: number) => {
    if (value <= 33) return { label: "Manual", desc: "You approve every change" };
    if (value <= 66) return { label: "Assisted", desc: "Kordi suggests, you decide" };
    return { label: "Autonomous", desc: "Kordi handles everything" };
  };

  const currentLevel = getAutonomyLabel(autonomyLevel);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 opacity-50" />
      
      <div className="w-full max-w-2xl relative">
        {/* Progress - Only 2 steps now */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step >= s ? 'bg-primary border-primary' : 'border-border'
              }`}>
                {step > s ? (
                  <Check className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <span className={step >= s ? 'text-primary-foreground' : 'text-muted-foreground'}>{s}</span>
                )}
              </div>
              {s < 2 && <div className={`w-20 h-0.5 ${step > s ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <Card className="p-8 bg-card border-border/50 shadow-card">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <KordiAvatar size="lg" className="mx-auto mb-4" />
                <h2 className="text-3xl font-bold">Connect Your IDE</h2>
                <p className="text-muted-foreground">KORDI works seamlessly with your favorite development environment</p>
              </div>

              <IDESelector selected={selectedIDE} onSelect={setSelectedIDE} />

              <Button onClick={() => setStep(2)} className="w-full bg-gradient-primary hover:opacity-90 shadow-primary">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <KordiAvatar size="lg" className="mx-auto mb-4" state="idle" />
                <h2 className="text-3xl font-bold">Choose Autonomy Level</h2>
                <p className="text-muted-foreground">How autonomous do you want Kordi to be?</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">{currentLevel.label}</h3>
                    <p className="text-muted-foreground">{currentLevel.desc}</p>
                  </div>

                  <div className="space-y-2 px-4">
                    <Slider
                      value={[autonomyLevel]}
                      onValueChange={(value) => setAutonomyLevel(value[0])}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Manual</span>
                      <span>Assisted</span>
                      <span>Autonomous</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-secondary/30 border border-border/50 rounded-lg">
                  <h4 className="font-semibold text-sm">What Kordi will do:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className={autonomyLevel >= 33 ? "" : "text-muted-foreground"}>
                        {autonomyLevel >= 66 ? "Auto-commit changes" : "Suggest commits"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className={autonomyLevel >= 50 ? "" : "text-muted-foreground"}>
                        {autonomyLevel >= 66 ? "Auto-deploy to staging" : "Recommend deployments"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Proactive bug detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className={autonomyLevel >= 66 ? "" : "text-muted-foreground"}>
                        {autonomyLevel >= 66 ? "Auto-update dependencies" : "Monitor dependencies"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleComplete} className="flex-1 bg-gradient-primary hover:opacity-90 shadow-primary">
                  Complete Setup →
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Kordi Connected - Ready to start your first project
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
