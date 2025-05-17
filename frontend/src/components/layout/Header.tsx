import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import NetworkSelector from "@/components/web3/NetworkSelector";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/hooks/use-auth';

const Header = () => {
  const { isAuthenticated, address } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zenthra-blue via-zenthra-purple to-zenthra-coral">
              Zenthra
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-zenthra-purple">
              Explore
            </Link>
            <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-zenthra-purple">
              Dashboard
            </Link>
            <Link to="/create" className="text-sm font-medium transition-colors hover:text-zenthra-purple">
              Create
            </Link>
            <Link to="/help" className="text-sm font-medium transition-colors hover:text-zenthra-purple">
              Help
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex">
            <NetworkSelector />
          </div>
          
          <ThemeToggle />
          
          <div className="flex items-center gap-2">
            <ConnectButton showBalance={false} />
            
            {isAuthenticated && (
              <Link to="/dashboard">
                <Button size="icon" variant="ghost">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
          
          <Button variant="outline" size="icon" className="md:hidden">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
