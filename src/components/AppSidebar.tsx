import { 
  Home, 
  Code2, 
  Rocket, 
  Users, 
  Settings,
  Activity,
  FileCode,
  AlertTriangle,
  Package,
  History,
  FolderGit2
} from "lucide-react";
import { KordiAvatar } from "./KordiAvatar";
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
  { title: "Projects", url: "/dashboard/projects", icon: FolderGit2 },
  { title: "Workspace", url: "/dashboard/workspace", icon: Code2 },
  { title: "Deployments", url: "/dashboard/deployments", icon: Rocket },
  { title: "System Health", url: "/dashboard/system-health", icon: Activity },
  { title: "Team", url: "/dashboard/team", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        {open ? (
          <>
            <KordiAvatar size="sm" className="flex-shrink-0" />
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                Kordra
              </span>
              <span className="text-[10px] text-muted-foreground">Powered by KORDI</span>
            </div>
          </>
        ) : (
          <KordiAvatar size="sm" className="mx-auto" />
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
