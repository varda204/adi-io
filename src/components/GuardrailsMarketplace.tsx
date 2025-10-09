import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, Lock, AlertTriangle, Eye, FileCheck } from "lucide-react";

interface GuardrailCardProps {
  title: string;
  description: string;
  category: "security" | "quality" | "compliance";
  enabled: boolean;
  popular?: boolean;
}

export const GuardrailsMarketplace = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <h2 className="text-xl font-semibold mb-2">Guardrails Marketplace</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Add safety rules and compliance checks to protect your codebase
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <GuardrailCard
            title="No Secrets in Commits"
            description="Prevent API keys, tokens, and passwords from being committed"
            category="security"
            enabled={true}
            popular
          />
          <GuardrailCard
            title="Require PR Tests"
            description="All pull requests must include passing tests before merge"
            category="quality"
            enabled={true}
            popular
          />
          <GuardrailCard
            title="SOC2 Compliance Mode"
            description="Enable audit logging and access controls for SOC2 compliance"
            category="compliance"
            enabled={false}
          />
          <GuardrailCard
            title="Code Review Required"
            description="At least one human approval required before deployment"
            category="quality"
            enabled={true}
          />
          <GuardrailCard
            title="Dependency Security Scan"
            description="Block deployments with known vulnerabilities"
            category="security"
            enabled={true}
            popular
          />
          <GuardrailCard
            title="GDPR Data Protection"
            description="Enforce data handling policies and user consent tracking"
            category="compliance"
            enabled={false}
          />
        </div>
      </Card>

      <Card className="p-6 bg-card border-border/50">
        <h3 className="font-semibold mb-4">Custom Guardrails</h3>
        <div className="space-y-3">
          <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-accent" />
                <span className="font-medium text-sm">Max File Size Limit</span>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Files larger than 1MB require approval</p>
          </div>

          <div className="p-4 bg-secondary/30 border border-border/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-accent" />
                <span className="font-medium text-sm">Branch Naming Convention</span>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Branches must follow: feature/*, fix/*, or hotfix/*</p>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          + Create Custom Guardrail
        </Button>
      </Card>
    </div>
  );
};

const GuardrailCard = ({ title, description, category, enabled, popular }: GuardrailCardProps) => {
  const categoryConfig = {
    security: { icon: Shield, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
    quality: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
    compliance: { icon: Lock, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" }
  };

  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border ${enabled ? 'bg-card border-border/50' : 'bg-secondary/30 border-border/30 opacity-60'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${config.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">{title}</h4>
              {popular && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                  Popular
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={`text-xs ${config.bg} ${config.color} ${config.border}`}>
          {category}
        </Badge>
        <Button size="sm" variant={enabled ? "outline" : "default"} className="h-7">
          {enabled ? "Disable" : "Enable"}
        </Button>
      </div>
    </div>
  );
};
