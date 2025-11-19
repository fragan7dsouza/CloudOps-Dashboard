import { useNavigate } from 'react-router-dom';
import { Activity, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ContainerCardProps {
  id: string;
  name: string;
  image: string;
  status: string;
}

const ContainerCard = ({ id, name, image, status }: ContainerCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'bg-success/10 text-success border-success/20';
      case 'exited':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card className="group overflow-hidden border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Box className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-mono text-lg font-semibold text-foreground">{name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{image}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Status:</span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
            {status}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => navigate(`/container/${id}`)}
          className="w-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
        >
          <Activity className="mr-2 h-4 w-4" />
          View Stats
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContainerCard;
