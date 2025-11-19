import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
  iconColor?: string;
}

const StatCard = ({ icon: Icon, label, value, subValue, iconColor = 'text-primary' }: StatCardProps) => {
  return (
    <Card className="overflow-hidden border border-border bg-card transition-all hover:border-primary/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-mono text-3xl font-bold text-foreground">{value}</p>
            {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
