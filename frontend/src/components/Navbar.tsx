import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">CloudOps Dashboard</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link
            to="/containers"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Containers
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
