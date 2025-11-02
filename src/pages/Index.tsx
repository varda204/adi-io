import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Shield, Mic, FileText, Users, Rocket, Mail, Github, Twitter, GitPullRequest, Database, Search, Workflow, MessageSquare, BookOpen, FileCode } from "lucide-react";
import { Link } from "react-router-dom";
import { KordiAvatar } from "@/components/KordiAvatar";
import { DemoModal } from "@/components/DemoModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<'yaml' | 'flow' | 'principles' | 'api'>('yaml');

  useEffect(() => {
    // Check if user is signed in (you can replace with actual auth logic)
    const checkAuth = () => {
      // For now, check localStorage or session
      const auth = localStorage.getItem('isAuthenticated');
      setIsSignedIn(auth === 'true');
    };
    checkAuth();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated flowing particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/50 to-accent/20 opacity-70" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 animate-pulse" 
            style={{ animationDuration: '4s' }} 
          />
          
          {/* Floating code snippets with different paths */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 text-primary/20 font-mono text-sm animate-float">const deploy = () =&gt; prod()</div>
            <div className="absolute top-40 right-20 text-accent/20 font-mono text-sm animate-float" style={{animationDelay: "1s"}}>if (bug) fix()</div>
            <div className="absolute bottom-40 left-40 text-primary/20 font-mono text-sm animate-float" style={{animationDelay: "2s"}}>git commit -m "feat"</div>
            <div className="absolute top-60 right-40 text-success/20 font-mono text-sm animate-float" style={{animationDelay: "0.5s"}}>npm run build ✓</div>
            <div className="absolute bottom-20 right-10 text-warning/20 font-mono text-sm animate-float" style={{animationDelay: "1.5s"}}>test.passed()</div>
          </div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}} />
        </div>
        
        <div className="relative container mx-auto px-4 py-6">
          {/* Professional Navigation */}
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-12">
              <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
                <KordiAvatar size="md" showPulse={false} className="shadow-glow" />
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block animate-shimmer bg-[length:200%_100%]">
                    Kordra
                  </span>
                  <span className="text-xs text-accent">Powered by KORDI</span>
                </div>
              </a>
              
              <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <button onClick={() => scrollToSection('hero')} className="text-foreground/90 hover:text-primary transition-all hover:scale-105">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-foreground/90 hover:text-primary transition-all hover:scale-105">About</button>
                <button onClick={() => scrollToSection('features')} className="text-foreground/90 hover:text-primary transition-all hover:scale-105">Features</button>
                <button onClick={() => { setDocsOpen(true); setSelectedDoc('yaml'); }} className="text-foreground/90 hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Docs
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-foreground/90 hover:text-primary transition-all hover:scale-105">Contact</button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="hover:bg-secondary/50 hover:scale-105 transition-all">Dashboard</Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      localStorage.removeItem('isAuthenticated');
                      setIsSignedIn(false);
                    }}
                    className="hover:bg-destructive/10 hover:text-destructive hover:scale-105 transition-all"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" className="hover:bg-secondary/50 hover:scale-105 transition-all">Sign In</Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-primary hover:opacity-90 shadow-glow hover:scale-105 transition-all">
                      Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in" id="hero">
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
              <Link to={isSignedIn ? "/dashboard" : "/auth"}>
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-10 py-6 hover:scale-105 transition-all">
                  {isSignedIn ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 border-primary/30 hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all"
                onClick={() => setIsDemoOpen(true)}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Try Kordra
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 border-primary/30 hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all"
                onClick={() => { setDocsOpen(true); setSelectedDoc('yaml'); }}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View Docs
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
          <h2 className="text-4xl font-bold mb-4">Built for Modern Development</h2>
          <p className="text-xl text-muted-foreground">Everything you need in one intelligent workspace</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DetailedFeatureCard
            icon={<GitPullRequest className="w-8 h-8" />}
            title="Autonomous PR Creation"
            description="KORDI automatically generates pull requests with smart commit messages and change summaries"
            onLearnMore={() => { setDocsOpen(true); setSelectedDoc('flow'); }}
          />
          <DetailedFeatureCard
            icon={<Database className="w-8 h-8" />}
            title="Live GitHub Sync"
            description="Real-time bidirectional sync keeps your workspace and repository perfectly in sync"
            onLearnMore={() => { setDocsOpen(true); setSelectedDoc('flow'); }}
          />
          <DetailedFeatureCard
            icon={<Search className="w-8 h-8" />}
            title="Code Archaeology"
            description="AI-powered insights into your codebase history with visual timelines and impact analysis"
            onLearnMore={() => { setDocsOpen(true); setSelectedDoc('principles'); }}
          />
          <DetailedFeatureCard
            icon={<Workflow className="w-8 h-8" />}
            title="Smart Deployment"
            description="Intelligent deployment orchestration with confidence scoring and auto-rollback"
            onLearnMore={() => { setDocsOpen(true); setSelectedDoc('yaml'); }}
          />
          <DetailedFeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Team-Aware Suggestions"
            description="Context-aware AI that understands your team's workflow and collaboration patterns"
            onLearnMore={() => { setDocsOpen(true); setSelectedDoc('principles'); }}
          />
          <DetailedFeatureCard
            icon={<Mic className="w-8 h-8" />}
            title="Voice-First Control"
            description="Natural voice commands for coding, deployment, and code review - 'Deploy to production'"
            onLearnMore={() => { setDocsOpen(true); setSelectedDoc('api'); }}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-20" id="about">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">About Kordra</h2>
            <p className="text-xl text-muted-foreground">
              Your cognitive teammate for autonomous development
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower developers with an AI teammate that thinks, codes, and ships alongside them—handling the repetitive tasks so you can focus on building what matters.
              </p>
            </div>
            <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground">
                A future where every developer has a proactive AI partner that understands context, anticipates needs, and collaborates naturally through voice and text.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Docs & Resources Section */}
      <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Documentation & Resources</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Everything you need to master Kordra
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button onClick={() => { setDocsOpen(true); setSelectedDoc('yaml'); }} className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card text-left">
              <FileCode className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">YAML Config</h3>
              <p className="text-sm text-muted-foreground">Sample deployment configurations</p>
            </button>
            <button onClick={() => { setDocsOpen(true); setSelectedDoc('flow'); }} className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card text-left">
              <Workflow className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Deployment Flow</h3>
              <p className="text-sm text-muted-foreground">Visual deployment diagrams</p>
            </button>
            <button onClick={() => { setDocsOpen(true); setSelectedDoc('principles'); }} className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card text-left">
              <MessageSquare className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">UX Principles</h3>
              <p className="text-sm text-muted-foreground">How Kordi thinks and works</p>
            </button>
            <button onClick={() => { setDocsOpen(true); setSelectedDoc('api'); }} className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card text-left">
              <Code className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">API Reference</h3>
              <p className="text-sm text-muted-foreground">Integration documentation</p>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-20" id="contact">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Have questions? Want to collaborate? Join our community.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <a href="mailto:hello@kordra.dev" className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">hello@kordra.dev</p>
            </a>
            <a href="https://github.com/kordra" target="_blank" rel="noopener noreferrer" className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card">
              <Github className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-muted-foreground">@kordra</p>
            </a>
            <a href="https://twitter.com/kordra" target="_blank" rel="noopener noreferrer" className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card">
              <Twitter className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Twitter</h3>
              <p className="text-sm text-muted-foreground">@kordra</p>
            </a>
            <a href="https://discord.gg/kordra" target="_blank" rel="noopener noreferrer" className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Discord</h3>
              <p className="text-sm text-muted-foreground">Join community</p>
            </a>
            <a href="https://linkedin.com/company/kordra" target="_blank" rel="noopener noreferrer" className="group bg-card border border-border/50 hover:border-primary/50 rounded-2xl p-8 transition-all hover:shadow-card">
              <Users className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-muted-foreground">Connect with us</p>
            </a>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="mailto:beta@kordra.dev?subject=Join%20Beta%20Program" className="inline-block">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow">
                <Rocket className="w-5 h-5 mr-2" />
                Join Beta Program
              </Button>
            </a>
            <a href="https://github.com/kordra/contribute" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                <Github className="w-5 h-5 mr-2" />
                Become a Contributor
              </Button>
            </a>
          </div>
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

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Kordra. All rights reserved.</p>
        </div>
      </footer>
      
      <DemoModal open={isDemoOpen} onOpenChange={setIsDemoOpen} />
      
      {/* Documentation Dialog */}
      <Dialog open={docsOpen} onOpenChange={setDocsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedDoc === 'yaml' && 'Sample YAML Configuration'}
              {selectedDoc === 'flow' && 'Deployment Flow Diagrams'}
              {selectedDoc === 'principles' && 'Kordi UX Principles'}
              {selectedDoc === 'api' && 'API Reference'}
            </DialogTitle>
            <DialogDescription>
              {selectedDoc === 'yaml' && 'Example deployment configurations for Kordra projects'}
              {selectedDoc === 'flow' && 'Visual guide to Kordra\'s deployment pipeline'}
              {selectedDoc === 'principles' && 'Understanding how Kordi thinks and collaborates'}
              {selectedDoc === 'api' && 'Integration endpoints and usage examples'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6">
            {selectedDoc === 'yaml' && (
              <div className="space-y-4">
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
{`project: kordra-frontend
platform: vercel
build_command: npm run build
output_dir: dist
env:
  NODE_ENV: production
  API_KEY: \${API_KEY}
auto_deploy: true
rollback: auto
confidence_score: 94%
tests:
  total: 147
  passed: 147
  coverage: 89%
kordi_mode: assisted
notifications:
  - slack
  - email
branches:
  production: main
  staging: develop`}
                </pre>
                <p className="text-sm text-muted-foreground">
                  This configuration enables automatic deployments with smart rollback and comprehensive test coverage tracking.
                </p>
              </div>
            )}
            
            {selectedDoc === 'flow' && (
              <div className="space-y-4">
                <div className="bg-card border border-border/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Deployment Pipeline</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                      <div>
                        <p className="font-semibold">Code Push</p>
                        <p className="text-muted-foreground">Kordi detects changes and analyzes impact</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
                      <div>
                        <p className="font-semibold">Test Suite</p>
                        <p className="text-muted-foreground">Runs automated tests with coverage analysis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
                      <div>
                        <p className="font-semibold">Confidence Score</p>
                        <p className="text-muted-foreground">Kordi calculates deployment safety</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">4</div>
                      <div>
                        <p className="font-semibold">Deploy</p>
                        <p className="text-muted-foreground">Automated or assisted deployment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">5</div>
                      <div>
                        <p className="font-semibold">Monitor</p>
                        <p className="text-muted-foreground">Health checks with auto-rollback if needed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedDoc === 'principles' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-card border border-border/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🧠 Context-Aware Intelligence</h4>
                    <p className="text-sm text-muted-foreground">
                      Kordi understands your project context, team dynamics, and coding patterns to provide relevant suggestions.
                    </p>
                  </div>
                  <div className="bg-card border border-border/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🤝 Progressive Autonomy</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose your collaboration style: Manual, Assisted, Proactive, or Autonomous mode.
                    </p>
                  </div>
                  <div className="bg-card border border-border/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🎯 Emotional Resonance</h4>
                    <p className="text-sm text-muted-foreground">
                      Kordi adapts its tone and suggestions based on your workflow state and emotional context.
                    </p>
                  </div>
                  <div className="bg-card border border-border/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🔄 Continuous Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      The AI learns from your coding style, preferences, and team patterns over time.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {selectedDoc === 'api' && (
              <div className="space-y-4">
                <div className="bg-card border border-border/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Voice Commands API</h4>
                  <pre className="bg-secondary p-3 rounded text-xs overflow-x-auto">
{`// Activate voice control
kordi.voice.activate()

// Send voice command
kordi.voice.command("deploy to production")

// Listen for responses
kordi.voice.onResponse((response) => {
  console.log(response)
})`}
                  </pre>
                </div>
                <div className="bg-card border border-border/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Deployment API</h4>
                  <pre className="bg-secondary p-3 rounded text-xs overflow-x-auto">
{`// Trigger deployment
await kordi.deploy({
  project: "kordra-frontend",
  environment: "production",
  mode: "assisted"
})

// Check deployment status
const status = await kordi.getDeploymentStatus(buildId)`}
                  </pre>
                </div>
                <div className="bg-card border border-border/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Code Analysis API</h4>
                  <pre className="bg-secondary p-3 rounded text-xs overflow-x-auto">
{`// Analyze code changes
const analysis = await kordi.analyze({
  files: ["src/auth.ts", "src/api.ts"],
  depth: "full"
})

// Get AI suggestions
const suggestions = await kordi.suggest(analysis)`}
                  </pre>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={() => setSelectedDoc('yaml')}>YAML</Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedDoc('flow')}>Flow</Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedDoc('principles')}>Principles</Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedDoc('api')}>API</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DetailedFeatureCard = ({ 
  icon, 
  title, 
  description, 
  onLearnMore 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  onLearnMore: () => void;
}) => {
  return (
    <div className="group relative bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-card animate-fade-in">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity" />
      <div className="relative space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <button 
          onClick={onLearnMore}
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 group/btn"
        >
          Learn More 
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Index;
