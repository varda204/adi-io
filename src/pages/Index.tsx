import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Shield, Mic, FileText, Users, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { KordiAvatar } from "@/components/KordiAvatar";
import { DemoModal } from "@/components/DemoModal";

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated coding background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/50 to-accent/20 opacity-70" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          {/* Floating code snippets */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 text-primary/20 font-mono text-sm animate-float">const deploy = () =&gt; prod()</div>
            <div className="absolute top-40 right-20 text-accent/20 font-mono text-sm animate-float" style={{animationDelay: "1s"}}>if (bug) fix()</div>
            <div className="absolute bottom-40 left-40 text-primary/20 font-mono text-sm animate-float" style={{animationDelay: "2s"}}>git commit -m "feat"</div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 py-6">
          {/* Professional Navigation */}
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-12">
              <Link to="/dashboard" className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
                <KordiAvatar size="md" showPulse={false} className="shadow-glow" />
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block animate-shimmer bg-[length:200%_100%]">
                    Kordra
                  </span>
                  <span className="text-xs text-accent">Powered by KORDI</span>
                </div>
              </Link>
              
              <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link to="/dashboard" className="text-foreground/90 hover:text-primary transition-all hover:scale-105">Home</Link>
                <a href="#about" className="text-foreground/90 hover:text-primary transition-all hover:scale-105">About</a>
                <a href="#features" className="text-foreground/90 hover:text-primary transition-all hover:scale-105">Resources</a>
                <a href="#contact" className="text-foreground/90 hover:text-primary transition-all hover:scale-105">Contact</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost" className="hover:bg-secondary/50 hover:scale-105 transition-all">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-primary hover:opacity-90 shadow-glow hover:scale-105 transition-all">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in" id="about">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-full text-sm mb-4 shadow-glow animate-glow">
              <Mic className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-foreground font-medium">Say "Hey Kordi" to activate voice control</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="block mb-4 animate-slide-in">Your Autonomous</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                AI Teammate
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: "0.2s"}}>
              Code smarter, not harder. KORDI is your autonomous AI teammate that proactively handles commits, deployments, 
              bug fixes, and code reviews. Voice-enabled and ready to collaborate.
            </p>

            <div className="flex items-center justify-center gap-4 pt-6 animate-scale-in" style={{animationDelay: "0.4s"}}>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-10 py-6 hover:scale-105 transition-all">
                  Start Building Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 border-primary/30 hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all"
                onClick={() => setIsDemoOpen(true)}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <p className="text-sm text-accent mt-6 italic animate-fade-in" style={{animationDelay: "0.6s"}}>
              ✨ See Kordra in action — autonomous DevOps meets intelligent coding
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20" id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Built for Modern Development</h2>
          <p className="text-muted-foreground">Everything you need in one intelligent workspace</p>
        </div>
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
