import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, AlertCircle, CheckCircle2, Zap } from "lucide-react";

const DependencyGuardian = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dependency Guardian Hub</h1>
                <p className="text-muted-foreground">Health monitoring and automatic update management</p>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
                <Zap className="w-4 h-4 mr-2" />
                Update All
              </Button>
            </div>

            {/* Health Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-6 h-6 text-primary" />
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-3xl font-bold mb-1">156</p>
                <p className="text-sm text-muted-foreground">Total Dependencies</p>
              </Card>

              <Card className="p-6 bg-card border-success/30">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">HEALTHY</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">142</p>
                <p className="text-sm text-muted-foreground">Up to Date</p>
              </Card>

              <Card className="p-6 bg-card border-warning/30">
                <div className="flex items-center justify-between mb-4">
                  <AlertCircle className="w-6 h-6 text-warning" />
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">UPDATES</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">12</p>
                <p className="text-sm text-muted-foreground">Updates Available</p>
              </Card>

              <Card className="p-6 bg-card border-destructive/30">
                <div className="flex items-center justify-between mb-4">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  <Badge variant="destructive">CRITICAL</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">2</p>
                <p className="text-sm text-muted-foreground">Security Patches</p>
              </Card>
            </div>

            {/* Critical Updates */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Critical Security Updates</h2>
              <div className="space-y-3">
                <DependencyCard
                  name="react-router-dom"
                  currentVersion="6.10.0"
                  latestVersion="6.22.0"
                  healthScore={45}
                  critical
                  description="Contains security vulnerability CVE-2024-12345"
                />
                <DependencyCard
                  name="axios"
                  currentVersion="0.27.2"
                  latestVersion="1.6.7"
                  healthScore={52}
                  critical
                  description="Multiple security patches available"
                />
              </div>
            </Card>

            {/* Recommended Updates */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Recommended Updates</h2>
              <div className="space-y-3">
                <DependencyCard
                  name="typescript"
                  currentVersion="5.3.3"
                  latestVersion="5.4.2"
                  healthScore={88}
                  description="New features and performance improvements"
                />
                <DependencyCard
                  name="@tanstack/react-query"
                  currentVersion="5.20.0"
                  latestVersion="5.28.4"
                  healthScore={85}
                  description="Bug fixes and optimizations"
                />
                <DependencyCard
                  name="tailwindcss"
                  currentVersion="3.4.1"
                  latestVersion="3.4.3"
                  healthScore={92}
                  description="Minor updates and fixes"
                />
              </div>
            </Card>

            {/* Update History */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-6">Recent Updates</h2>
              <div className="space-y-3">
                <UpdateHistoryItem
                  package="react"
                  from="18.2.0"
                  to="18.3.1"
                  time="2 hours ago"
                  auto
                />
                <UpdateHistoryItem
                  package="vite"
                  from="5.0.12"
                  to="5.2.0"
                  time="1 day ago"
                  auto
                />
                <UpdateHistoryItem
                  package="eslint"
                  from="8.56.0"
                  to="8.57.0"
                  time="3 days ago"
                />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const DependencyCard = ({ name, currentVersion, latestVersion, healthScore, critical, description }: any) => (
  <div className={`p-4 rounded-lg border ${
    critical ? 'bg-destructive/5 border-destructive/30' : 'bg-secondary/30 border-border/50'
  }`}>
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold font-mono text-sm">{name}</h3>
          {critical && <Badge variant="destructive" className="text-xs">CRITICAL</Badge>}
        </div>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Current: </span>
            <code className="bg-background px-2 py-1 rounded text-xs">{currentVersion}</code>
          </div>
          <div>
            <span className="text-muted-foreground">Latest: </span>
            <code className="bg-background px-2 py-1 rounded text-xs">{latestVersion}</code>
          </div>
          <div>
            <span className="text-muted-foreground">Health: </span>
            <span className={`font-medium ${
              healthScore >= 80 ? 'text-success' :
              healthScore >= 60 ? 'text-warning' :
              'text-destructive'
            }`}>
              {healthScore}%
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button size="sm" className="bg-gradient-primary hover:opacity-90 h-7 whitespace-nowrap">
          <Zap className="w-3 h-3 mr-1" />
          Auto-Update
        </Button>
        <Button size="sm" variant="outline" className="h-7 whitespace-nowrap">
          View Changes
        </Button>
      </div>
    </div>
  </div>
);

const UpdateHistoryItem = ({ package: pkg, from, to, time, auto }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium font-mono text-sm">{pkg}</p>
          {auto && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
              Auto
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <code className="bg-background px-2 py-0.5 rounded text-xs">{from}</code>
          <span>→</span>
          <code className="bg-background px-2 py-0.5 rounded text-xs">{to}</code>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{time}</span>
        <CheckCircle2 className="w-5 h-5 text-success" />
      </div>
    </div>
  </div>
);

export default DependencyGuardian;
