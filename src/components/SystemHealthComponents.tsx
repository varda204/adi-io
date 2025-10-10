import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, Zap, Shield } from "lucide-react";

export const DeploymentPRCard = ({ number, title, confidence, tests, security, risk }: any) => (
  <Card className="p-4 bg-card border-border/50">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">PR #{number}</span>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Ready for Staging
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{title}</p>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-success">✅ {tests} Tests</span>
          <span className="text-success">🔒 {security}</span>
          <span className="text-warning">⚠️ Risk {risk}</span>
        </div>
      </div>
      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">
        {confidence}% confident
      </span>
    </div>
    <div className="flex gap-2 mt-3">
      <Button size="sm" className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Approve Deployment
      </Button>
      <Button size="sm" variant="outline">Hold</Button>
      <Button size="sm" variant="outline">Rollback</Button>
    </div>
  </Card>
);

export const ScanResultCard = ({ time, status, issues }: any) => (
  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        status === 'passed' ? 'bg-success/10' : 'bg-warning/10'
      }`}>
        {status === 'passed' ? (
          <CheckCircle2 className="w-4 h-4 text-success" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-warning" />
        )}
      </div>
      <div>
        <p className="text-sm font-medium">{time}</p>
        <p className="text-xs text-muted-foreground">
          {issues === 0 ? 'No issues found' : `${issues} issues detected`}
        </p>
      </div>
    </div>
    <Button size="sm" variant="outline">View Details</Button>
  </div>
);
