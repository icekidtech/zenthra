import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import NFTGrid, { NFT } from '@/components/nft/NFTGrid';
import NFTFilter from '@/components/nft/NFTFilter';
import FeaturedCreators from '@/components/home/FeaturedCreators';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/hooks/use-auth';
import { Button } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("trending");

  // Mock NFT data
  const nfts: NFT[] = [
    {
      id: '1',
      title: 'Abstract Dimensions #42',
      creator: 'abstract_master',
      imageUrl: 'https://source.unsplash.com/random/800x800/?abstract,art,1',
      currentBid: 320,
      timeLeft: '2d 4h 15m',
      timeLeftSec: 184500,
      isHot: true
    },
    {
      id: '2',
      title: 'Cosmic Journey',
      creator: 'stargazer',
      imageUrl: 'https://source.unsplash.com/random/800x800/?space,cosmos,1',
      currentBid: 175.5,
      timeLeft: '1d 7h 30m',
      timeLeftSec: 112200
    },
    {
      id: '3',
      title: 'Golden Hour',
      creator: 'sunrise_artist',
      imageUrl: 'https://source.unsplash.com/random/800x800/?sunset,gold,1',
      currentBid: 85,
      timeLeft: '5h 22m',
      timeLeftSec: 19320,
      isNew: true
    },
    {
      id: '4',
      title: 'Digital Soul',
      creator: 'crypto_wizard',
      imageUrl: 'https://source.unsplash.com/random/800x800/?digital,human,1',
      currentBid: 1200,
      timeLeft: '4d 12h 5m',
      timeLeftSec: 388500
    },
    {
      id: '5',
      title: 'Urban Jungle',
      creator: 'city_artist',
      imageUrl: 'https://source.unsplash.com/random/800x800/?city,jungle,1',
      currentBid: 435.5,
      timeLeft: '3d 9h 41m',
      timeLeftSec: 298860
    },
    {
      id: '6',
      title: 'Mystic Portal #7',
      creator: 'mystical_nft',
      imageUrl: 'https://source.unsplash.com/random/800x800/?portal,magic,1',
      currentBid: 750,
      timeLeft: '6h 15m',
      timeLeftSec: 22500
    },
    {
      id: '7',
      title: 'Quantum Paradox',
      creator: 'quantum_labs',
      imageUrl: 'https://source.unsplash.com/random/800x800/?quantum,science,1',
      currentBid: 520,
      timeLeft: '1d 18h 33m',
      timeLeftSec: 152580,
      isNew: true
    },
    {
      id: '8',
      title: 'Neon Dreams',
      creator: 'neon_artist',
      imageUrl: 'https://source.unsplash.com/random/800x800/?neon,night,1',
      currentBid: 390,
      timeLeft: '5d 3h 12m',
      timeLeftSec: 448320
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-16 container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Discover NFTs</h2>
          <NFTFilter 
            onFilterChange={setActiveFilter}
            onSortChange={setActiveSort}
          />
          <NFTGrid nfts={nfts} />
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
