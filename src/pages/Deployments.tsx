import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeploymentFlow } from "@/components/DeploymentFlow";
import { DeploymentHistory } from "@/components/DeploymentHistory";
import { DeploymentSettings } from "@/components/DeploymentSettings";
import { ProjectSelector } from "@/components/ProjectSelector";
import { YAMLDraftPanel } from "@/components/YAMLDraftPanel";
import { LiveSyncLogsPanel } from "@/components/LiveSyncLogsPanel";

const Deployments = () => {
  const [selectedProject, setSelectedProject] = useState("kordra-frontend");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <TopNav />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Deployments
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage deployments, track history, and configure settings
                </p>
              </div>

              {/* Project Selector */}
              <ProjectSelector
                selectedProject={selectedProject}
                onSelectProject={setSelectedProject}
              />

              {/* Tabs */}
              <Tabs defaultValue="deploy" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="deploy">Deploy Now</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="yaml">YAML Config</TabsTrigger>
                  <TabsTrigger value="logs">Sync Logs</TabsTrigger>
                </TabsList>

                <TabsContent value="deploy">
                  <DeploymentFlow projectName={selectedProject} />
                </TabsContent>

                <TabsContent value="history">
                  <DeploymentHistory projectName={selectedProject} />
                </TabsContent>

                <TabsContent value="settings">
                  <DeploymentSettings projectName={selectedProject} />
                </TabsContent>

                <TabsContent value="yaml">
                  <YAMLDraftPanel projectName={selectedProject} />
                </TabsContent>

                <TabsContent value="logs">
                  <LiveSyncLogsPanel projectName={selectedProject} />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Deployments;
