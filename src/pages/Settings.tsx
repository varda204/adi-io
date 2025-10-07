import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

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
                <TabsTrigger value="autonomy">Autonomy</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="autonomy" className="space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Autonomy Levels</h2>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Auto-commit Frequency</Label>
                        <span className="text-sm text-muted-foreground">Medium</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={1} />
                      <p className="text-sm text-muted-foreground">
                        Controls how frequently Kordra auto-commits your changes
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>AI Suggestion Aggressiveness</Label>
                        <span className="text-sm text-muted-foreground">High</span>
                      </div>
                      <Slider defaultValue={[75]} max={100} step={1} />
                      <p className="text-sm text-muted-foreground">
                        How proactive the AI should be with code suggestions
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Auto-deploy Approval</Label>
                        <span className="text-sm text-muted-foreground">Manual</span>
                      </div>
                      <Slider defaultValue={[25]} max={100} step={1} />
                      <p className="text-sm text-muted-foreground">
                        Require manual approval before auto-deployments
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Feature Toggles</h2>
                  <div className="space-y-4">
                    <SettingToggle
                      label="Auto-commit changes"
                      description="Automatically commit your changes with AI-generated messages"
                      defaultChecked={true}
                    />
                    <SettingToggle
                      label="Auto-deploy to staging"
                      description="Deploy changes to staging environment automatically"
                      defaultChecked={true}
                    />
                    <SettingToggle
                      label="Bug detection alerts"
                      description="Get notified when potential bugs are detected"
                      defaultChecked={true}
                    />
                    <SettingToggle
                      label="Dependency monitoring"
                      description="Monitor and suggest dependency updates"
                      defaultChecked={false}
                    />
                    <SettingToggle
                      label="Code review assistance"
                      description="AI-powered code review suggestions"
                      defaultChecked={true}
                    />
                  </div>
                </Card>
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

              <TabsContent value="account" className="space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="Tech Startup Inc." />
                    </div>
                    <Button className="bg-gradient-primary hover:opacity-90">
                      Save Changes
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Security</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Two-Factor Authentication</Label>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Change Password</Label>
                      <Button variant="outline" className="w-full">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50 border-destructive/50">
                  <h2 className="text-xl font-semibold mb-6 text-destructive">Danger Zone</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Delete Account</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Permanently delete your account and all associated data
                      </p>
                      <Button variant="destructive">Delete Account</Button>
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
