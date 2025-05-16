
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NFTGrid, { NFT } from '@/components/nft/NFTGrid';
import { Button } from '@/components/ui/button';

const DashboardTabs = () => {
  // Mock data
  const activeAuctions: NFT[] = [
    {
      id: '1',
      title: 'Abstract Dimensions #42',
      creator: 'you',
      imageUrl: 'https://source.unsplash.com/random/800x800/?abstract,art,1',
      currentBid: 320,
      timeLeft: '2d 4h 15m',
      timeLeftSec: 184500,
    },
    {
      id: '2',
      title: 'Cosmic Journey',
      creator: 'you',
      imageUrl: 'https://source.unsplash.com/random/800x800/?space,cosmos,1',
      currentBid: 175.5,
      timeLeft: '1d 7h 30m',
      timeLeftSec: 112200,
      isHot: true
    }
  ];
  
  const wonAuctions: NFT[] = [
    {
      id: '3',
      title: 'Golden Hour',
      creator: 'sunrise_artist',
      imageUrl: 'https://source.unsplash.com/random/800x800/?sunset,gold,1',
      currentBid: 850,
      timeLeft: 'Won 2 days ago',
      timeLeftSec: 0
    }
  ];
  
  const lostAuctions: NFT[] = [
    {
      id: '4',
      title: 'Digital Soul',
      creator: 'crypto_wizard',
      imageUrl: 'https://source.unsplash.com/random/800x800/?digital,human,1',
      currentBid: 1200,
      timeLeft: 'Lost 5 days ago',
      timeLeftSec: 0
    },
    {
      id: '5',
      title: 'Urban Jungle',
      creator: 'city_artist',
      imageUrl: 'https://source.unsplash.com/random/800x800/?city,jungle,1',
      currentBid: 435.5,
      timeLeft: 'Lost yesterday',
      timeLeftSec: 0
    }
  ];
  
  const ownedNFTs: NFT[] = [
    {
      id: '6',
      title: 'Mystic Portal #7',
      creator: 'mystical_nft',
      imageUrl: 'https://source.unsplash.com/random/800x800/?portal,magic,1',
      currentBid: 0,
      timeLeft: 'Owned',
      timeLeftSec: 0
    },
    {
      id: '7',
      title: 'Quantum Paradox',
      creator: 'quantum_labs',
      imageUrl: 'https://source.unsplash.com/random/800x800/?quantum,science,1',
      currentBid: 0,
      timeLeft: 'Owned',
      timeLeftSec: 0
    },
    {
      id: '8',
      title: 'Neon Dreams',
      creator: 'neon_artist',
      imageUrl: 'https://source.unsplash.com/random/800x800/?neon,night,1',
      currentBid: 0,
      timeLeft: 'Owned',
      timeLeftSec: 0
    }
  ];

  const EmptyState = ({ title, description, action }: { title: string, description: string, action?: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 mb-4 rounded-full bg-zenthra-purple/10 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zenthra-purple">
          <path d="M14 14H10V18H14V14Z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M4 4H20V20H4V4ZM6 6H18V18H6V6Z" fill="currentColor" />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 text-center max-w-xs">{description}</p>
      {action}
    </div>
  );

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="active">Active Auctions</TabsTrigger>
        <TabsTrigger value="won">Won Auctions</TabsTrigger>
        <TabsTrigger value="lost">Lost Auctions</TabsTrigger>
        <TabsTrigger value="owned">Owned NFTs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active">
        {activeAuctions.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Active Auctions</h2>
              <Button variant="outline" asChild>
                <Link to="/create">Create New</Link>
              </Button>
            </div>
            <NFTGrid nfts={activeAuctions} />
          </div>
        ) : (
          <Card>
            <CardContent className="py-8">
              <EmptyState 
                title="No active auctions"
                description="You don't have any NFTs currently up for auction."
                action={
                  <Button asChild>
                    <Link to="/create">Create NFT Auction</Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        )}
      </TabsContent>
      
      <TabsContent value="won">
        {wonAuctions.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-6">Auctions You've Won</h2>
            <NFTGrid nfts={wonAuctions} />
          </div>
        ) : (
          <Card>
            <CardContent className="py-8">
              <EmptyState 
                title="No won auctions"
                description="You haven't won any auctions yet. Start bidding on NFTs you like!"
                action={
                  <Button asChild variant="outline">
                    <Link to="/explore">Explore NFTs</Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        )}
      </TabsContent>
      
      <TabsContent value="lost">
        {lostAuctions.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-6">Auctions You've Lost</h2>
            <NFTGrid nfts={lostAuctions} />
          </div>
        ) : (
          <Card>
            <CardContent className="py-8">
              <EmptyState 
                title="No lost auctions"
                description="You haven't lost any auctions yet."
              />
            </CardContent>
          </Card>
        )}
      </TabsContent>
      
      <TabsContent value="owned">
        {ownedNFTs.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Owned NFTs</h2>
              <Button variant="outline" asChild>
                <Link to="/create">Mint New NFT</Link>
              </Button>
            </div>
            <NFTGrid nfts={ownedNFTs} />
          </div>
        ) : (
          <Card>
            <CardContent className="py-8">
              <EmptyState 
                title="No owned NFTs"
                description="You don't own any NFTs yet. Create or purchase your first NFT to get started."
                action={
                  <div className="flex gap-4">
                    <Button asChild>
                      <Link to="/create">Create NFT</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/explore">Buy NFTs</Link>
                    </Button>
                  </div>
                }
              />
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
