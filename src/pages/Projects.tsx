import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewProjectModal } from "@/components/NewProjectModal";
import { ProjectCard } from "@/components/ProjectCard";
import { Plus, Search, Star } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    name: "Kordra Frontend",
    lastModified: "2 hours ago",
    lastDeploy: "4 hours ago",
    kordiAction: "Updated docs based on new auth features",
    healthScore: "stable" as const,
    updates: ["React v19 available", "TypeScript v5.3"],
    team: ["You", "Sarah", "Mike"],
    starred: true,
    status: "active",
    commits: 234,
    openPRs: 2,
  },
  {
    id: 2,
    name: "API Gateway",
    lastModified: "1 day ago",
    lastDeploy: "1 day ago",
    kordiAction: "Added error handling to auth endpoints",
    healthScore: "needs-review" as const,
    updates: ["Express v5 available"],
    team: ["You", "Alex"],
    starred: false,
    status: "active",
    commits: 156,
    openPRs: 1,
  },
  {
    id: 3,
    name: "Mobile App",
    lastModified: "3 days ago",
    lastDeploy: "5 days ago",
    kordiAction: "Optimized bundle size",
    healthScore: "stable" as const,
    updates: [],
    team: ["You"],
    starred: false,
    status: "archived",
    commits: 89,
    openPRs: 0,
  },
];

const Projects = () => {
  const [showNewProject, setShowNewProject] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && project.status === "active") ||
      (activeTab === "archived" && project.status === "archived") ||
      (activeTab === "starred" && project.starred);
    return matchesSearch && matchesTab;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <TopNav />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Projects
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Manage all your development projects in one place
                  </p>
                </div>
                <Button
                  onClick={() => setShowNewProject(true)}
                  className="bg-gradient-primary hover:opacity-90 shadow-glow"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Project
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                  <TabsTrigger value="starred">
                    <Star className="w-4 h-4 mr-1" />
                    Starred
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>

                  {filteredProjects.length === 0 && (
                    <Card className="p-12 text-center">
                      <p className="text-muted-foreground">No projects found</p>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>

      <NewProjectModal open={showNewProject} onOpenChange={setShowNewProject} />
    </SidebarProvider>
  );
};

export default Projects;
