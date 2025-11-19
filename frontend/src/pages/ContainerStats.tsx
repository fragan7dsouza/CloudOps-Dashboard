import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContainerStats } from '@/services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '@/components/StatCard';
import Loader from '@/components/Loader';
import { ArrowLeft, Cpu, HardDrive, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface StatsData {
  container_id: string;
  cpu_percent: number;
  memory_usage: number;
  memory_limit: number;
  memory_percent: number;
}

interface ChartDataPoint {
  time: string;
  cpu: number;
  memory: number;
}

const ContainerStats = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    let abortController = new AbortController();

    const fetchStats = async () => {
      try {
        setError(null);

        const data = await getContainerStats(id, {
          signal: abortController.signal,
        });

        if (!isMounted) return;

        setStats(data);

        const now = new Date();
        const timeStr = now.toLocaleTimeString();

        setChartData((prev) => {
          const newData = [
            ...prev,
            {
              time: timeStr,
              cpu: parseFloat(data.cpu_percent.toFixed(2)),
              memory: parseFloat(data.memory_percent.toFixed(2)),
            },
          ];
          return newData.slice(-20);
        });

        setLoading(false);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setError('Failed to fetch container stats. Backend may be overloaded.');
        setLoading(false);
      }
    };

    fetchStats();
    intervalRef.current = setInterval(fetchStats, 2500);

    return () => {
      isMounted = false;
      abortController.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id]);

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
        <Button onClick={() => navigate('/containers')} variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Containers
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      <Button onClick={() => navigate('/containers')} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Containers
      </Button>

      <div className="mb-8 space-y-2">
        <h1 className="font-mono text-3xl font-bold text-foreground">{stats.container_id}</h1>
        <p className="text-muted-foreground">Real-time container metrics (updates every 2.5 seconds)</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Cpu} label="CPU Usage" value={`${stats.cpu_percent.toFixed(2)}%`} iconColor="text-chart-cpu" />
        <StatCard
          icon={HardDrive}
          label="Memory Usage"
          value={`${stats.memory_percent.toFixed(2)}%`}
          subValue={`${formatBytes(stats.memory_usage)} / ${formatBytes(stats.memory_limit)}`}
          iconColor="text-chart-memory"
        />
        <StatCard
          icon={HardDrive}
          label="Memory (MB)"
          value={formatBytes(stats.memory_usage)}
          iconColor="text-chart-memory"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Cpu className="h-5 w-5 text-chart-cpu" />
              CPU Usage Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px', fontFamily: 'monospace' }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px', fontFamily: 'monospace' }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="hsl(var(--chart-cpu))"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <HardDrive className="h-5 w-5 text-chart-memory" />
              Memory Usage Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px', fontFamily: 'monospace' }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px', fontFamily: 'monospace' }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="hsl(var(--chart-memory))"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContainerStats;
