import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Shield, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { KordiAvatar } from "@/components/KordiAvatar";
import { DemoModal } from "@/components/DemoModal";

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 opacity-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        
        <div className="relative container mx-auto px-4 py-20">
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3">
              <KordiAvatar size="md" showPulse={false} />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                  Kordra
                </span>
                <span className="text-xs text-muted-foreground">Powered by KORDI</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-4">
              <Mic className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-foreground">Meet KORDI - Your autonomous AI teammate</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Ship code faster with{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI autonomy
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              KORDI is your always-on autonomous AI teammate that proactively handles commits, deployments, 
              bug fixes, and code reviews. Works with VS Code, Cursor, JetBrains, and more. Voice-enabled and ready to collaborate.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-primary text-lg px-8">
                  Start Building Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-border/50"
                onClick={() => setIsDemoOpen(true)}
              >
                Watch Demo
              </Button>
            </div>
            
            <p className="text-sm text-accent/80 mt-4 italic">
              See Kordra in action — autonomous DevOps meets intelligent coding
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Code className="w-8 h-8" />}
            title="Multi-IDE Support"
            description="KORDI works seamlessly with VS Code, Cursor, JetBrains, Neovim, Zed, and more"
          />
          <FeatureCard
            icon={<Mic className="w-8 h-8" />}
            title="Voice-First Control"
            description="Command KORDI with your voice - 'Deploy to production' or 'Fix that bug'"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Proactive Security"
            description="KORDI detects vulnerabilities and suggests fixes before you even ask"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl p-12 border border-primary/20 shadow-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50" />
          <div className="relative text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to ship faster?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers using Kordra to automate their workflow
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-primary text-lg px-8">
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <DemoModal open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="group relative bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-card">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity" />
      <div className="relative space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Index;
