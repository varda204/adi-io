import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download } from "lucide-react";

interface YAMLDraftPanelProps {
  projectName: string;
}

export const YAMLDraftPanel = ({ projectName }: YAMLDraftPanelProps) => {
  const { toast } = useToast();

  const yamlConfig = `project: ${projectName}
platform: vercel
build_command: npm run build
output_dir: dist
env:
  NODE_ENV: production
  API_KEY: \${API_KEY}
auto_deploy: true
rollback: auto
confidence_score: 94%
tests:
  total: 147
  passed: 147
security:
  scan_enabled: true
  vulnerabilities: 0
performance:
  lighthouse_score: 98
  build_time: 2m 34s`;

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlConfig);
    toast({
      title: "Copied to clipboard",
      description: "YAML configuration copied successfully",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([yamlConfig], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName}-deployment-config.yaml`;
    a.click();
    toast({
      title: "Downloaded",
      description: "YAML configuration file downloaded",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Deployment Configuration (YAML)</h3>
          <div className="flex gap-2">
            <Button onClick={handleCopy} size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleDownload} size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre">{yamlConfig}</pre>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">What's This?</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            This YAML file represents your complete deployment configuration. It's useful for:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Auditing deployment settings</li>
            <li>Version control and tracking changes</li>
            <li>Sharing configuration with team members</li>
            <li>Enterprise compliance requirements</li>
            <li>Backup and disaster recovery</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};
