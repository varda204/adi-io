import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { DeploymentPipeline } from "@/components/DeploymentPipeline";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Rocket, Server, AlertTriangle, Shield, Package, 
  CheckCircle2, Zap, TrendingUp, Activity, Cloud, Clock 
} from "lucide-react";
import { DeploymentPRCard, ScanResultCard } from "@/components/SystemHealthComponents";

const SystemHealth = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <TopNav />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">System Health & Deployments</h1>
                <p className="text-muted-foreground">Monitor deployments, bugs, and dependencies</p>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
                <Rocket className="w-4 h-4 mr-2" />
                Deploy Now
              </Button>
            </div>

            {/* Health Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-6 bg-card border-success/30">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-6 h-6 text-success" />
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    HEALTHY
                  </Badge>
                </div>
                <p className="text-3xl font-bold mb-1">99.8%</p>
                <p className="text-sm text-muted-foreground">System Uptime</p>
              </Card>

              <Card className="p-6 bg-card border-warning/30">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    ACTIVE
                  </Badge>
                </div>
                <p className="text-3xl font-bold mb-1">9</p>
                <p className="text-sm text-muted-foreground">Active Bugs</p>
              </Card>

              <Card className="p-6 bg-card border-destructive/30">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-6 h-6 text-destructive" />
                  <Badge variant="destructive">URGENT</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">2</p>
                <p className="text-sm text-muted-foreground">Security Patches</p>
              </Card>

              <Card className="p-6 bg-card border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-6 h-6 text-primary" />
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    UPDATES
                  </Badge>
                </div>
                <p className="text-3xl font-bold mb-1">12</p>
                <p className="text-sm text-muted-foreground">Dependency Updates</p>
              </Card>
            </div>

            {/* Health Tabs */}
            <Tabs defaultValue="tests" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tests">Test Suite Health</TabsTrigger>
                <TabsTrigger value="bugs">Bug Radar</TabsTrigger>
                <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
              </TabsList>

              <TabsContent value="tests" className="space-y-6">
                {/* Kordi's Voice Summary */}
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Kordi's System Assessment</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        "Your system is 94% stable. 2 flaky tests detected. Safe to deploy."
                      </p>
                      <div className="flex items-center gap-3">
                        <Button className="bg-success hover:bg-success/90 text-success-foreground">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Deploy Now
                        </Button>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Test Suite Overview */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="p-4 bg-success/5 border-success/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <h3 className="font-semibold">Passing</h3>
                    </div>
                    <p className="text-3xl font-bold">145/147</p>
                    <p className="text-xs text-muted-foreground mt-1">98.6% pass rate</p>
                  </Card>
                  <Card className="p-4 bg-warning/5 border-warning/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      <h3 className="font-semibold">Flaky</h3>
                    </div>
                    <p className="text-3xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground mt-1">Need attention</p>
                  </Card>
                  <Card className="p-4 bg-primary/5 border-primary/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Coverage</h3>
                    </div>
                    <p className="text-3xl font-bold">87%</p>
                    <p className="text-xs text-muted-foreground mt-1">+8% this week</p>
                  </Card>
                  <Card className="p-4 bg-accent/5 border-accent/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold">Runtime</h3>
                    </div>
                    <p className="text-3xl font-bold">2.4s</p>
                    <p className="text-xs text-muted-foreground mt-1">Average time</p>
                  </Card>
                </div>

                {/* Recent Test Runs */}
                <Card className="p-6 bg-card border-border/50">
                  <h3 className="font-semibold mb-4">Recent Test Runs</h3>
                  <div className="space-y-3">
                    <TestRunCard
                      time="5 minutes ago"
                      status="passed"
                      passed={147}
                      failed={0}
                      duration="2.3s"
                    />
                    <TestRunCard
                      time="2 hours ago"
                      status="warning"
                      passed={145}
                      failed={2}
                      duration="2.5s"
                    />
                    <TestRunCard
                      time="Yesterday"
                      status="passed"
                      passed={147}
                      failed={0}
                      duration="2.4s"
                    />
                  </div>
                </Card>

                {/* Test Confidence Score per PR */}
                <Card className="p-6 bg-card border-border/50">
                  <h3 className="font-semibold mb-4">Test Confidence Score per PR</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">PR #234 - Add authentication</span>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          94% confident
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">All tests passing • 12% auto-rollback risk</p>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">PR #233 - Fix memory leak</span>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          98% confident
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">All tests passing • 5% auto-rollback risk</p>
                    </div>
                  </div>
                </Card>

                {/* Security Scan Summary */}
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Security Scan Summary</h3>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Up to date
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 bg-card rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Last Scan</p>
                      <p className="font-semibold">5 minutes ago</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Patches Applied</p>
                      <p className="font-semibold text-success">2 this week</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Vulnerabilities</p>
                      <p className="font-semibold text-success">0 critical</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="bugs" className="space-y-4">
                {/* Bug Overview */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-destructive/5 border-destructive/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <h3 className="font-semibold">Critical</h3>
                    </div>
                    <p className="text-3xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground mt-1">Needs immediate attention</p>
                  </Card>
                  <Card className="p-4 bg-warning/5 border-warning/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      <h3 className="font-semibold">Medium</h3>
                    </div>
                    <p className="text-3xl font-bold">7</p>
                    <p className="text-xs text-muted-foreground mt-1">To be addressed soon</p>
                  </Card>
                  <Card className="p-4 bg-success/5 border-success/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <h3 className="font-semibold">Resolved</h3>
                    </div>
                    <p className="text-3xl font-bold">43</p>
                    <p className="text-xs text-muted-foreground mt-1">Fixed this month</p>
                  </Card>
                </div>

                {/* Recent Scans */}
                <Card className="p-6 bg-card border-border/50">
                  <h3 className="font-semibold mb-4">Recent Security Scans</h3>
                  <div className="space-y-3">
                    <ScanResultCard
                      time="5 minutes ago"
                      status="passed"
                      issues={0}
                    />
                    <ScanResultCard
                      time="2 hours ago"
                      status="warning"
                      issues={2}
                    />
                    <ScanResultCard
                      time="Yesterday"
                      status="passed"
                      issues={0}
                    />
                  </div>
                </Card>
                <ThreatCard
                  severity="critical"
                  title="SQL Injection Vulnerability"
                  description="Unsanitized user input in authentication endpoint"
                  file="src/api/auth.ts:47"
                />
                <ThreatCard
                  severity="medium"
                  title="Memory Leak in Session Handling"
                  description="Sessions not properly cleaned up after logout"
                  file="src/lib/session.ts:23"
                />
              </TabsContent>

              <TabsContent value="dependencies" className="space-y-4">
                {/* Recommended Updates */}
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <h3 className="font-semibold mb-4">Recommended Updates</h3>
                  <div className="space-y-3">
                    <DependencyCard
                      name="react-router-dom"
                      currentVersion="6.10.0"
                      latestVersion="6.22.0"
                      healthScore={45}
                      critical
                    />
                    <DependencyCard
                      name="typescript"
                      currentVersion="5.3.3"
                      latestVersion="5.4.2"
                      healthScore={88}
                    />
                  </div>
                </Card>

                {/* Recent Updates */}
                <Card className="p-6 bg-card border-border/50">
                  <h3 className="font-semibold mb-4">Recent Updates</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm font-mono">react</p>
                        <p className="text-xs text-muted-foreground">18.3.1 → 18.3.2</p>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Updated
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm font-mono">vite</p>
                        <p className="text-xs text-muted-foreground">5.0.0 → 5.2.0</p>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Updated
                      </Badge>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Components
const PlatformButton = ({ name, active }: { name: string; active?: boolean }) => (
  <Button
    variant={active ? "default" : "outline"}
    className={active ? "bg-primary/20 text-primary border-primary/30" : ""}
  >
    <Cloud className="w-4 h-4 mr-2" />
    {name}
  </Button>
);

const PipelineBar = () => (
  <div className="flex items-center gap-2">
    {["Build", "Test", "Security Scan", "Deploy", "Verify"].map((stage, i) => (
      <div key={stage} className="flex items-center flex-1">
        <div className="flex-1 flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            i < 4 ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary animate-pulse'
          }`}>
            {i < 4 ? <CheckCircle2 className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
          </div>
          <span className="text-xs mt-2">{stage}</span>
        </div>
        {i < 4 && (
          <div className={`flex-1 h-1 ${i < 3 ? 'bg-success' : 'bg-primary animate-pulse'}`} />
        )}
      </div>
    ))}
  </div>
);

const DeploymentRow = ({ build, env, status, time, version }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          status === 'success' ? 'bg-success/10' : 'bg-destructive/10'
        }`}>
          <span className="text-sm font-mono">#{build}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{env}</span>
            <Badge variant={status === 'success' ? 'secondary' : 'destructive'}
                   className={status === 'success' ? 'bg-success/10 text-success' : ''}>
              {status}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{time}</span>
            <code className="bg-background px-2 py-0.5 rounded text-xs">{version}</code>
          </div>
        </div>
      </div>
      <Button size="sm" variant="outline">View Logs</Button>
    </div>
  </div>
);

const ThreatCard = ({ severity, title, description, file }: any) => (
  <Card className={`p-4 ${
    severity === 'critical' ? 'bg-destructive/5 border-destructive/30' :
    'bg-warning/5 border-warning/30'
  }`}>
    <div className="flex items-start gap-3">
      <AlertTriangle className={`w-5 h-5 mt-1 ${
        severity === 'critical' ? 'text-destructive' : 'text-warning'
      }`} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold">{title}</h3>
          <Badge variant={severity === 'critical' ? 'destructive' : 'outline'}
                 className={severity === 'medium' ? 'bg-warning/10 text-warning border-warning/20' : ''}>
            {severity.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <code className="text-xs bg-background px-2 py-1 rounded">{file}</code>
        <div className="flex gap-2 mt-3">
          <Button size="sm" className="bg-gradient-primary hover:opacity-90">
            <Zap className="w-3 h-3 mr-1" />
            Auto-Fix
          </Button>
          <Button size="sm" variant="outline">Review</Button>
        </div>
      </div>
    </div>
  </Card>
);

const TestRunCard = ({ time, status, passed, failed, duration }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          status === 'passed' ? 'bg-success/10' : 'bg-warning/10'
        }`}>
          {status === 'passed' ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-warning" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{time}</p>
          <p className="text-xs text-muted-foreground">
            {passed} passed, {failed} failed • {duration}
          </p>
        </div>
      </div>
      <Button size="sm" variant="outline">View</Button>
    </div>
  </div>
);

const DependencyCard = ({ name, currentVersion, latestVersion, healthScore, critical }: any) => (
  <Card className={`p-4 ${critical ? 'bg-destructive/5 border-destructive/30' : 'bg-card border-border/50'}`}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold font-mono text-sm">{name}</h3>
          {critical && <Badge variant="destructive">CRITICAL</Badge>}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            {currentVersion} → {latestVersion}
          </span>
          <span className={`font-medium ${
            healthScore >= 80 ? 'text-success' :
            healthScore >= 60 ? 'text-warning' : 'text-destructive'
          }`}>
            Health: {healthScore}%
          </span>
        </div>
      </div>
      <Button size="sm" className="bg-gradient-primary hover:opacity-90">
        <Zap className="w-3 h-3 mr-1" />
        Update
      </Button>
    </div>
  </Card>
);

export default SystemHealth;
