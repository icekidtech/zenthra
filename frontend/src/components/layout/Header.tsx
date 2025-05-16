
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, User, Wallet } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import NetworkSelector from "@/components/web3/NetworkSelector";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  const connectWallet = async () => {
    // Mock wallet connection logic
    try {
      // This would be replaced with actual wallet connection logic
      setTimeout(() => {
        setIsWalletConnected(true);
        setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
        toast({
          title: "Wallet connected",
          description: "Successfully connected to your wallet",
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Could not connect to wallet",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

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
              Help & Support
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative rounded-full hidden md:flex items-center w-full max-w-sm bg-muted">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search collections and creators..."
              className="flex h-10 w-full rounded-full border-none bg-transparent py-2 pl-10 pr-4 text-sm outline-none"
            />
          </div>
          
          <div className="hidden lg:flex gap-2">
            <ThemeToggle />
            <NetworkSelector />
          </div>
          
          {isWalletConnected ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm" 
                variant="outline"
                className="text-xs"
                onClick={disconnectWallet}
              >
                <Wallet className="mr-1 h-3.5 w-3.5" />
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </Button>
              <Link to="/dashboard">
                <Button size="icon" variant="ghost">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <Button 
              className="flex items-center justify-center gap-2 px-4 py-2 h-10" 
              onClick={connectWallet}
            >
              <Wallet className="h-4 w-4" />
              <span>Connect Wallet</span>
            </Button>
          )}
          
          <Button variant="outline" size="icon" className="md:hidden">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1.5 7C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H1.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" /></svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
