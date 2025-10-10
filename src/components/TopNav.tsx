import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { KordiAvatar } from "@/components/KordiAvatar";
import { Home, FileText, LogOut } from "lucide-react";

export const TopNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/auth");
  };

  return (
    <div className="h-14 border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform">
            <KordiAvatar size="sm" showPulse={false} className="shadow-glow" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kordra
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Docs
            </a>
          </nav>
        </div>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleLogout}
          className="hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
