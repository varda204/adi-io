import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { GuardrailsMarketplace } from "@/components/GuardrailsMarketplace";

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            <Tabs defaultValue="autonomy" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="autonomy">Autonomy Control</TabsTrigger>
                <TabsTrigger value="guardrails">Guardrails</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="autonomy" className="space-y-6">
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <h2 className="text-xl font-semibold mb-6">Autonomy Control Center</h2>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-lg font-semibold">AI Confidence Threshold</Label>
                        <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">85% Confident</span>
                      </div>
                      <Slider defaultValue={[85]} max={100} step={1} className="py-4" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Kordi will only act autonomously when confidence exceeds this threshold
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <CapabilityControl
                        label="Auto-commits"
                        description="Commit changes autonomously"
                        confidence={92}
                        enabled={true}
                      />
                      <CapabilityControl
                        label="Auto-deploy staging"
                        description="Deploy to staging environment"
                        confidence={88}
                        enabled={true}
                      />
                      <CapabilityControl
                        label="Bug auto-fix"
                        description="Fix detected bugs automatically"
                        confidence={95}
                        enabled={true}
                      />
                      <CapabilityControl
                        label="Dependency updates"
                        description="Update packages automatically"
                        confidence={90}
                        enabled={true}
                      />
                      <CapabilityControl
                        label="PR reviews"
                        description="Review and comment on PRs"
                        confidence={87}
                        enabled={true}
                      />
                      <CapabilityControl
                        label="Voice commands"
                        description="Respond to voice activation"
                        confidence={93}
                        enabled={true}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="guardrails" className="space-y-6">
                <GuardrailsMarketplace />
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Connected Services</h2>
                  <div className="space-y-4">
                    <IntegrationItem
                      name="GitHub"
                      description="Version control and repository management"
                      connected={true}
                    />
                    <IntegrationItem
                      name="VS Code"
                      description="Code editor integration"
                      connected={true}
                    />
                    <IntegrationItem
                      name="Cursor"
                      description="AI-powered code editor"
                      connected={true}
                    />
                    <IntegrationItem
                      name="JetBrains"
                      description="Professional IDE suite"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Zed"
                      description="High-performance editor"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Slack"
                      description="Team communication and notifications"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Vercel"
                      description="Deployment platform"
                      connected={true}
                    />
                    <IntegrationItem
                      name="Linear"
                      description="Issue tracking and project management"
                      connected={false}
                    />
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">API Keys</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Production API Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="password" 
                          value="kda_prod_••••••••••••••••" 
                          readOnly 
                          className="font-mono"
                        />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Development API Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="password" 
                          value="kda_dev_••••••••••••••••" 
                          readOnly 
                          className="font-mono"
                        />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Email Notifications</h2>
                  <div className="space-y-4">
                    <SettingToggle
                      label="Deployment notifications"
                      description="Get notified when deployments complete"
                      defaultChecked={true}
                    />
                    <SettingToggle
                      label="Bug detection alerts"
                      description="Receive alerts for detected bugs"
                      defaultChecked={true}
                    />
                    <SettingToggle
                      label="Team mentions"
                      description="When someone mentions you in comments"
                      defaultChecked={true}
                    />
                    <SettingToggle
                      label="Weekly summary"
                      description="Weekly activity and progress summary"
                      defaultChecked={false}
                    />
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">In-App Notifications</h2>
                  <div className="space-y-4">
                    <SettingToggle
                      label="Auto-commit confirmations"
                      description="Show notifications for auto-commits"
                      defaultChecked={true}
                    />
                    <SettingToggle
                      label="AI suggestions"
                      description="Get notified of AI code suggestions"
                      defaultChecked={true}
                    />
                    <SettingToggle
                      label="Build status"
                      description="Real-time build and deployment status"
                      defaultChecked={true}
                    />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Two-Factor Authentication</Label>
                      <div className="flex items-center justify-between p-4 bg-secondary/30 border border-border/50 rounded-lg">
                        <div>
                          <p className="font-medium">Authenticator App</p>
                          <p className="text-sm text-muted-foreground">Use an app to generate codes</p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="current-password">Change Password</Label>
                      <Input id="current-password" type="password" placeholder="Current password" />
                      <Input id="new-password" type="password" placeholder="New password" />
                      <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                      <Button className="bg-gradient-primary hover:opacity-90">Update Password</Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Active Sessions</Label>
                      <div className="space-y-2">
                        <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">MacBook Pro • Chrome</p>
                              <p className="text-sm text-muted-foreground">San Francisco, CA • Current session</p>
                            </div>
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              Active
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-destructive/5 border-destructive/30">
                  <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-destructive/20">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const CapabilityControl = ({ label, description, confidence, enabled }: any) => (
  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Label className="text-base font-medium">{label}</Label>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            confidence >= 90 ? 'bg-success/20 text-success' :
            confidence >= 85 ? 'bg-primary/20 text-primary' :
            'bg-warning/20 text-warning'
          }`}>
            {confidence}% confidence
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={enabled} />
    </div>
  </div>
);

const SettingToggle = ({ label, description, defaultChecked }: any) => (
  <div className="flex items-start justify-between p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="space-y-1 flex-1">
      <Label className="text-base">{label}</Label>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);

const IntegrationItem = ({ name, description, connected }: any) => (
  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="space-y-1">
      <h3 className="font-medium">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Button variant={connected ? "outline" : "default"} className={
      connected ? "" : "bg-gradient-primary hover:opacity-90"
    }>
      {connected ? "Disconnect" : "Connect"}
    </Button>
  </div>
);

export default Settings;
