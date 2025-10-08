import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Check } from "lucide-react";

const IDEs = [
  { name: "VS Code", popular: true },
  { name: "Cursor", popular: true },
  { name: "JetBrains", popular: true },
  { name: "Neovim", popular: false },
  { name: "Sublime Text", popular: false },
  { name: "Zed", popular: true },
  { name: "Windsurf", popular: false }
];

interface IDESelectorProps {
  selected?: string;
  onSelect?: (ide: string) => void;
}

export const IDESelector = ({ selected, onSelect }: IDESelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {IDEs.map((ide) => (
        <Card
          key={ide.name}
          className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${
            selected === ide.name ? 'border-primary bg-primary/5' : 'border-border/50'
          }`}
          onClick={() => onSelect?.(ide.name)}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              selected === ide.name ? 'bg-primary/20' : 'bg-secondary'
            }`}>
              <Code2 className={`w-6 h-6 ${selected === ide.name ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm">{ide.name}</p>
              {ide.popular && (
                <span className="text-xs text-accent">Popular</span>
              )}
            </div>
            {selected === ide.name && (
              <div className="absolute top-2 right-2">
                <Check className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
