import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LoaderIcon, AlertCircle } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import NFTGrid from '@/components/nft/NFTGrid';
import NFTFilter from '@/components/nft/NFTFilter';
import FeaturedCreators from '@/components/home/FeaturedCreators';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/hooks/use-auth';
import { useAuctions } from '@/hooks/use-auctions';
import { mockNFTs } from '@/lib/mock-data';

// Check if we're in development mode and should use mocks
const USE_MOCK_DATA = import.meta.env.DEV && !import.meta.env.VITE_USE_BLOCKCHAIN;

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("trending");
  
  // Use the auctions hook (or mock data if in development)
  const { 
    nfts: blockchainNfts, 
    isLoading, 
    error, 
    refetch 
  } = !USE_MOCK_DATA 
    ? useAuctions(activeFilter, activeSort)
    : { nfts: mockNFTs, isLoading: false, error: null, refetch: () => {} };
  
  // Use the blockchain NFTs or the mock NFTs based on environment
  const nfts = !USE_MOCK_DATA ? blockchainNfts : mockNFTs;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-16 container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Discover NFTs</h2>
          
          {/* Filter and Sort Controls */}
          <NFTFilter 
            onFilterChange={(filter) => {
              setActiveFilter(filter);
              if (!USE_MOCK_DATA) refetch();
            }}
            onSortChange={(sort) => {
              setActiveSort(sort);
              if (!USE_MOCK_DATA) refetch();
            }}
          />
          
          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="my-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error loading NFTs</AlertTitle>
              <AlertDescription>
                There was a problem loading the NFT data.
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => refetch()}
                  className="ml-2"
                >
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center my-16">
              <LoaderIcon className="h-12 w-12 animate-spin text-zenthra-purple mb-4" />
              <p className="text-lg font-medium">Loading NFTs...</p>
            </div>
          )}
          
          {/* NFT Grid with data */}
          {!isLoading && !error && (
            <NFTGrid nfts={nfts} />
          )}
        </section>

        <FeaturedCreators />
        
        <section className="py-16 bg-zenthra-blue text-white">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your NFT Journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join the Zenthra community to create, collect, and trade extraordinary NFTs on the Lisk blockchain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!isAuthenticated ? (
                <div className="connect-wallet-button">
                  <ConnectButton label="Connect Wallet" />
                </div>
              ) : (
                <Button 
                  className="bg-zenthra-purple hover:bg-zenthra-purple/90 text-white px-6 py-3 rounded-lg font-medium"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              )}
              <Button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-lg font-medium">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
