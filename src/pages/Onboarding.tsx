import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, FolderGit2, Code2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 opacity-50" />
      
      <div className="w-full max-w-2xl relative">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
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
              {s < 3 && <div className={`w-20 h-0.5 ${step > s ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <Card className="p-8 bg-card border-border/50 shadow-card">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FolderGit2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold">Create Your First Project</h2>
                <p className="text-muted-foreground">Set up your project to get started with Kordra</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="my-awesome-app" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repo-url">Repository URL (optional)</Label>
                  <Input id="repo-url" placeholder="https://github.com/username/repo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="framework">Framework</Label>
                  <select id="framework" className="w-full h-10 px-3 rounded-lg bg-background border border-input">
                    <option>Next.js</option>
                    <option>React</option>
                    <option>Vue</option>
                    <option>Svelte</option>
                  </select>
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full bg-gradient-primary hover:opacity-90">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Code2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold">Install IDE Extension</h2>
                <p className="text-muted-foreground">Connect Kordra to your development environment</p>
              </div>

              <div className="space-y-4">
                <Card className="p-6 bg-secondary/50 border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">VS Code Extension</h3>
                      <p className="text-sm text-muted-foreground">
                        Install the Kordra extension from the VS Code marketplace
                      </p>
                      <code className="block p-3 bg-background rounded-lg text-sm font-mono mt-2">
                        ext install kordra.kordra-ai
                      </code>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary/50 border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Authentication Token</h3>
                      <p className="text-sm text-muted-foreground">
                        Copy this token to authenticate your IDE
                      </p>
                      <code className="block p-3 bg-background rounded-lg text-sm font-mono mt-2 select-all">
                        kda_live_a1b2c3d4e5f6g7h8i9j0
                      </code>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-gradient-primary hover:opacity-90">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success-foreground" />
                </div>
                <h2 className="text-3xl font-bold">All Set!</h2>
                <p className="text-muted-foreground">Configure your autonomy preferences</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border/50">
                  <div>
                    <h4 className="font-medium">Auto-commit changes</h4>
                    <p className="text-sm text-muted-foreground">Automatically commit your changes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border/50">
                  <div>
                    <h4 className="font-medium">Auto-deploy to staging</h4>
                    <p className="text-sm text-muted-foreground">Deploy changes to staging environment</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border/50">
                  <div>
                    <h4 className="font-medium">Bug detection alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified of potential issues</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border/50">
                  <div>
                    <h4 className="font-medium">Dependency monitoring</h4>
                    <p className="text-sm text-muted-foreground">Monitor and update dependencies</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded" />
                </div>
              </div>

              <Button onClick={handleComplete} className="w-full bg-gradient-primary hover:opacity-90 shadow-primary">
                Go to Dashboard
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
