import { useEffect, useState, useRef } from 'react';
import { getContainers } from '@/services/api';
import ContainerCard from '@/components/ContainerCard';
import Loader from '@/components/Loader';
import { AlertCircle, Box } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
}

const Containers = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchContainers = async () => {
      try {
        const data = await getContainers();
        if (isMounted) {
          setContainers(data.containers || []);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch containers. Ensure backend is running on http://localhost:8000');
          setLoading(false);
        }
      }
    };

    fetchContainers();
    intervalRef.current = setInterval(fetchContainers, 5000);

    return () => {
      isMounted = false;
      controller.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Box className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Docker Containers</h1>
            <p className="text-muted-foreground">
              {containers.length} {containers.length === 1 ? 'container' : 'containers'} available
            </p>
          </div>
        </div>
      </div>

      {containers.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No containers found</AlertTitle>
          <AlertDescription>No Docker containers are running on this machine.</AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {containers.map((container) => (
            <ContainerCard
              key={container.id}
              id={container.id}
              name={container.name}
              image={container.image}
              status={container.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Containers;
