import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
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
      <div className="min-h-screen flex flex-col w-full bg-background">
        <TopNav />
        <div className="flex flex-1">
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
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="autonomy" className="space-y-6">
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <h2 className="text-xl font-semibold mb-6">Capability Control Grid</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <CapabilityControl label="Auto-commits" description="Commit changes autonomously" confidence={92} enabled={true} />
                    <CapabilityControl label="Bug detection" description="Detect bugs automatically" confidence={95} enabled={true} />
                    <CapabilityControl label="Dependency monitoring" description="Monitor package updates" confidence={90} enabled={true} />
                    <CapabilityControl label="Deployment handling" description="Deploy to environments" confidence={88} enabled={true} />
                    <CapabilityControl label="PR collaboration" description="Review and comment on PRs" confidence={87} enabled={true} />
                    <CapabilityControl label="Voice processing" description="Voice activation" confidence={93} enabled={true} />
                    <CapabilityControl label="File optimization" description="Optimize files automatically" confidence={89} enabled={true} />
                    <CapabilityControl label="Test generation" description="Generate tests automatically" confidence={91} enabled={true} />
                    <CapabilityControl label="Security scanning" description="Scan for vulnerabilities" confidence={96} enabled={true} />
                    <CapabilityControl label="Performance optimization" description="Optimize performance" confidence={88} enabled={true} />
                    <CapabilityControl label="Code refactoring" description="Refactor code automatically" confidence={85} enabled={true} />
                    <CapabilityControl label="Documentation sync" description="Auto-update documentation" confidence={94} enabled={true} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="guardrails" className="space-y-6">
                <GuardrailsMarketplace />
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Version Control</h2>
                  <div className="space-y-4">
                    <IntegrationItem
                      name="GitHub"
                      description="Version control and repository management"
                      connected={true}
                      lastSync="2 minutes ago"
                    />
                    <IntegrationItem
                      name="GitLab"
                      description="DevOps platform with Git repository"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Bitbucket"
                      description="Git solution for teams"
                      connected={false}
                    />
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">IDEs & Editors</h2>
                  <div className="space-y-4">
                    <IntegrationItem
                      name="VS Code"
                      description="Code editor integration"
                      connected={true}
                      lastSync="Active now"
                    />
                    <IntegrationItem
                      name="Cursor"
                      description="AI-powered code editor"
                      connected={true}
                      lastSync="5 minutes ago"
                    />
                    <IntegrationItem
                      name="JetBrains"
                      description="Professional IDE suite"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Windsurf"
                      description="Modern code editor"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Zed"
                      description="High-performance editor"
                      connected={false}
                    />
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Deployment Platforms</h2>
                  <div className="space-y-4">
                    <IntegrationItem
                      name="Vercel"
                      description="Deployment platform"
                      connected={true}
                      lastSync="1 hour ago"
                    />
                    <IntegrationItem
                      name="Netlify"
                      description="Web hosting and automation"
                      connected={false}
                    />
                    <IntegrationItem
                      name="AWS"
                      description="Cloud computing services"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Railway"
                      description="Infrastructure platform"
                      connected={false}
                    />
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Communication & Project Management</h2>
                  <div className="space-y-4">
                    <IntegrationItem
                      name="Slack"
                      description="Team communication and notifications"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Discord"
                      description="Voice, video, and text chat"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Notion"
                      description="Documentation and collaboration"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Linear"
                      description="Issue tracking and project management"
                      connected={false}
                    />
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Monitoring & Analytics</h2>
                  <div className="space-y-4">
                    <IntegrationItem
                      name="Sentry"
                      description="Error tracking and performance monitoring"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Datadog"
                      description="Monitoring and analytics"
                      connected={false}
                    />
                    <IntegrationItem
                      name="LogRocket"
                      description="Session replay and monitoring"
                      connected={false}
                    />
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Backend Services</h2>
                  <div className="space-y-4">
                    <IntegrationItem
                      name="Stripe"
                      description="Payment processing"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Supabase"
                      description="Open source Firebase alternative"
                      connected={false}
                    />
                    <IntegrationItem
                      name="Firebase"
                      description="Backend-as-a-Service platform"
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

              <TabsContent value="account" className="space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Profile</h2>
                  <div className="space-y-4">
                    <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="John Developer" /></div>
                    <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="john@example.com" /></div>
                    <Button className="bg-gradient-primary hover:opacity-90">Save Changes</Button>
                  </div>
                </Card>
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Security</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg"><p className="font-medium mb-2">Two-Factor Authentication</p><Button variant="outline">Enable 2FA</Button></div>
                    <div className="space-y-2"><Label>Change Password</Label><Input type="password" placeholder="Current password" /><Input type="password" placeholder="New password" /><Button className="bg-gradient-primary hover:opacity-90">Update Password</Button></div>
                  </div>
                </Card>
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Security</h2>
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
                        <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">iPhone • Safari</p>
                              <p className="text-sm text-muted-foreground">New York, NY • 2 days ago</p>
                            </div>
                            <Button size="sm" variant="destructive">Revoke</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Data Export</Label>
                      <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-3">
                          Download all your data in JSON format
                        </p>
                        <Button variant="outline" size="sm">Request Data Export</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Privacy & Defaults</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Voice & Cognition Settings</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">Voice Activation</p>
                            <p className="text-xs text-muted-foreground">"Hey Kordi" wake word</p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        <div className="p-3 bg-secondary/30 rounded-lg">
                          <Label className="text-sm mb-2 block">Language Model</Label>
                          <select className="w-full p-2 bg-background border border-border rounded text-sm">
                            <option>GPT-5 (Recommended)</option>
                            <option>GPT-4</option>
                            <option>Claude 3.5</option>
                          </select>
                        </div>
                        <div className="p-3 bg-secondary/30 rounded-lg">
                          <Label className="text-sm mb-2 block">Emotional UX Tone</Label>
                          <select className="w-full p-2 bg-background border border-border rounded text-sm">
                            <option>Professional</option>
                            <option>Friendly</option>
                            <option>Minimal</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Team & Project Defaults</Label>
                      <div className="space-y-3">
                        <div className="p-3 bg-secondary/30 rounded-lg">
                          <Label className="text-sm mb-2 block">Default Role for New Members</Label>
                          <select className="w-full p-2 bg-background border border-border rounded text-sm">
                            <option>Developer</option>
                            <option>Reviewer</option>
                            <option>Viewer</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">Auto-assign PRs</p>
                            <p className="text-xs text-muted-foreground">Automatically assign reviewers</p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Kordi Behavior Settings</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">Auto-commit</p>
                            <p className="text-xs text-muted-foreground">Commit changes automatically</p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">Ask before deploy</p>
                            <p className="text-xs text-muted-foreground">Require confirmation before deploying</p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">Daily summary</p>
                            <p className="text-xs text-muted-foreground">Receive daily activity summary</p>
                          </div>
                          <Switch defaultChecked={false} />
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

const IntegrationItem = ({ name, description, connected, lastSync }: any) => (
  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50">
    <div className="space-y-1 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-medium">{name}</h3>
        {connected && lastSync && (
          <span className="text-xs text-muted-foreground">• {lastSync}</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="flex gap-2">
      {connected && (
        <Button size="sm" variant="ghost">Configure</Button>
      )}
      <Button size="sm" variant={connected ? "outline" : "default"} className={
        connected ? "" : "bg-gradient-primary hover:opacity-90"
      }>
        {connected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  </div>
);

export default Settings;
