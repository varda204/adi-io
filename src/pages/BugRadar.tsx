import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Zap, CheckCircle2 } from "lucide-react";

const BugRadar = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Bug Radar Command Center</h1>
                <p className="text-muted-foreground">Real-time vulnerability scanning and threat detection</p>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
                <Zap className="w-4 h-4 mr-2" />
                Run Full Scan
              </Button>
            </div>

            {/* Threat Level Overview */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-card border-destructive/30">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                  <Badge variant="destructive">CRITICAL</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">2</p>
                <p className="text-sm text-muted-foreground">Critical Vulnerabilities</p>
              </Card>

              <Card className="p-6 bg-card border-warning/30">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 text-warning" />
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">MEDIUM</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">7</p>
                <p className="text-sm text-muted-foreground">Medium Priority Issues</p>
              </Card>

              <Card className="p-6 bg-card border-success/30">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">RESOLVED</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">43</p>
                <p className="text-sm text-muted-foreground">Fixed This Week</p>
              </Card>
            </div>

            {/* Active Threats */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Active Security Threats</h2>
              <div className="space-y-3">
                <ThreatCard
                  severity="critical"
                  title="SQL Injection Vulnerability"
                  description="Unsanitized user input in authentication endpoint"
                  file="src/api/auth.ts:47"
                  cve="CVE-2024-12345"
                  autoFixAvailable
                />
                <ThreatCard
                  severity="critical"
                  title="Dependency with Known Exploit"
                  description="lodash@4.17.19 has prototype pollution vulnerability"
                  file="package.json"
                  cve="CVE-2024-54321"
                  autoFixAvailable
                />
                <ThreatCard
                  severity="medium"
                  title="Insecure API Key Storage"
                  description="API keys hardcoded in client-side code"
                  file="src/config/api.ts:12"
                  autoFixAvailable
                />
                <ThreatCard
                  severity="medium"
                  title="Missing CORS Headers"
                  description="API endpoints missing proper CORS configuration"
                  file="src/server/middleware.ts:23"
                  autoFixAvailable={false}
                />
              </div>
            </Card>

            {/* Scan History */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Recent Scans</h2>
              <div className="space-y-3">
                <ScanHistoryItem
                  time="2 minutes ago"
                  issues={9}
                  fixed={0}
                  status="completed"
                />
                <ScanHistoryItem
                  time="1 hour ago"
                  issues={12}
                  fixed={5}
                  status="completed"
                />
                <ScanHistoryItem
                  time="3 hours ago"
                  issues={8}
                  fixed={8}
                  status="completed"
                />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const ThreatCard = ({ severity, title, description, file, cve, autoFixAvailable }: any) => (
  <div className={`p-4 rounded-lg border ${
    severity === 'critical' ? 'bg-destructive/5 border-destructive/30' :
    severity === 'medium' ? 'bg-warning/5 border-warning/30' :
    'bg-secondary/30 border-border/50'
  }`}>
    <div className="flex items-start gap-4">
      <AlertTriangle className={`w-5 h-5 mt-1 ${
        severity === 'critical' ? 'text-destructive' :
        severity === 'medium' ? 'text-warning' :
        'text-muted-foreground'
      }`} />
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{title}</h3>
              <Badge variant={severity === 'critical' ? 'destructive' : 'outline'} className={
                severity === 'medium' ? 'bg-warning/10 text-warning border-warning/20' : ''
              }>
                {severity.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
            <div className="flex items-center gap-3 text-xs">
              <code className="bg-background px-2 py-1 rounded">{file}</code>
              {cve && <span className="text-muted-foreground">{cve}</span>}
            </div>
          </div>
        </div>
        {autoFixAvailable && (
          <div className="flex items-center gap-2 mt-3">
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 h-7">
              <Zap className="w-3 h-3 mr-1" />
              Auto-Fix
            </Button>
            <Button size="sm" variant="outline" className="h-7">
              Review Code
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ScanHistoryItem = ({ time, issues, fixed, status }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium mb-1">Full Security Scan</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Issues: </span>
          <span className="font-medium">{issues}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Fixed: </span>
          <span className="font-medium text-success">{fixed}</span>
        </div>
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          {status}
        </Badge>
      </div>
    </div>
  </div>
);

export default BugRadar;
