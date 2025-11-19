import { Activity, Database, LineChart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Track Docker container metrics with live updates every second',
    },
    {
      icon: LineChart,
      title: 'Beautiful Charts',
      description: 'Visualize CPU and memory usage with interactive line charts',
    },
    {
      icon: Database,
      title: 'Container Management',
      description: 'View all your Docker containers with detailed status information',
    },
    {
      icon: Shield,
      title: 'Enterprise Ready',
      description: 'Production-grade dashboard built with modern technologies',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">About CloudOps Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            A modern, responsive Docker monitoring dashboard built with React, Vite, and TailwindCSS
          </p>
        </div>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              CloudOps Dashboard is a professional-grade monitoring solution for Docker containers. It provides
              real-time insights into container performance metrics, helping DevOps teams maintain optimal system
              health.
            </p>
            <p>
              Built with modern web technologies including React, Vite, TailwindCSS, and Recharts, this dashboard
              offers a clean, intuitive interface inspired by industry-leading tools like Portainer, AWS CloudWatch,
              and Grafana.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border bg-card transition-all hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground md:grid-cols-3">
              <div className="space-y-1">
                <div className="font-semibold text-foreground">Frontend</div>
                <div>React 18</div>
                <div>TypeScript</div>
                <div>Vite</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-foreground">Styling</div>
                <div>TailwindCSS</div>
                <div>shadcn/ui</div>
                <div>Lucide Icons</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-foreground">Data</div>
                <div>Axios</div>
                <div>Recharts</div>
                <div>React Router</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
