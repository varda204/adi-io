import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KordiAvatar } from "@/components/KordiAvatar";
import { Check, Loader2, Sparkles } from "lucide-react";

interface OneCommandSetupProps {
  onComplete: () => void;
  onBack: () => void;
}

export const OneCommandSetup = ({ onComplete, onBack }: OneCommandSetupProps) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const setupSteps = [
    { label: "Creating GitHub repository", duration: 2000 },
    { label: "Initializing README and documentation", duration: 1500 },
    { label: "Installing dependencies", duration: 2500 },
    { label: "Configuring CI/CD pipeline", duration: 2000 },
    { label: "Setting up environment variables", duration: 1500 },
    { label: "Ready to code!", duration: 1000 },
  ];

  const handleInitialize = async () => {
    setIsInitializing(true);
    
    for (let i = 0; i < setupSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, setupSteps[i].duration));
    }
    
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <KordiAvatar 
          size="lg" 
          state={isInitializing ? "coding" : "idle"}
          className="mx-auto mb-4"
          activity={isInitializing ? setupSteps[currentStep]?.label : undefined}
        />
        <h2 className="text-3xl font-bold">One-Command Setup</h2>
        <p className="text-muted-foreground">
          Let Kordi set up your entire project infrastructure in seconds
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20">
        <div className="space-y-4">
          {setupSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                currentStep === index && isInitializing
                  ? "bg-primary/20 border border-primary/30"
                  : currentStep > index
                  ? "bg-success/10 border border-success/20"
                  : "bg-background/50 border border-border/30"
              }`}
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {currentStep > index ? (
                  <Check className="w-5 h-5 text-success" />
                ) : currentStep === index && isInitializing ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-muted" />
                )}
              </div>
              <span
                className={`text-sm ${
                  currentStep === index && isInitializing
                    ? "text-primary font-medium"
                    : currentStep > index
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="bg-card/50 border border-border/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium">What Kordi will do:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Create and configure your GitHub repository</li>
              <li>Set up complete project documentation</li>
              <li>Install and configure all dependencies</li>
              <li>Configure automated CI/CD workflows</li>
              <li>Prepare your development environment</li>
            </ul>
          </div>
        </div>
      </div>

      {!isInitializing ? (
        <div className="flex gap-4">
          <Button onClick={onBack} variant="outline" className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleInitialize}
            className="flex-1 bg-gradient-primary hover:opacity-90 shadow-primary"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Initialize Repository & Environment
          </Button>
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground">
            Kordi is setting up your project... ✨
          </p>
        </div>
      )}
    </div>
  );
};
