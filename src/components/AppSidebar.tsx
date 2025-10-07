import { 
  Home, 
  Code2, 
  Rocket, 
  Users, 
  Settings, 
  Sparkles,
  Activity,
  FileCode
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Projects", url: "/dashboard/projects", icon: FileCode },
  { title: "VS Code Panel", url: "/dashboard/vscode", icon: Code2 },
  { title: "Deployments", url: "/dashboard/deployments", icon: Rocket },
  { title: "Team", url: "/dashboard/team", icon: Users },
  { title: "Activity", url: "/dashboard/activity", icon: Activity },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        {open ? (
          <>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kordra
            </span>
          </>
        ) : (
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) => 
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}
