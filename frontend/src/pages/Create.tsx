
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NFTForm from '@/components/create/NFTForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Create = () => {
  // Mock data for owned NFTs
  const ownedNFTs = [
    {
      id: '1',
      title: 'Mystic Portal #7',
      imageUrl: 'https://source.unsplash.com/random/800x800/?portal,magic,1',
    },
    {
      id: '2',
      title: 'Quantum Paradox',
      imageUrl: 'https://source.unsplash.com/random/800x800/?quantum,science,1',
    },
    {
      id: '3',
      title: 'Neon Dreams',
      imageUrl: 'https://source.unsplash.com/random/800x800/?neon,night,1',
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 container">
        <Tabs defaultValue="new">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Create NFT</h1>
            <TabsList>
              <TabsTrigger value="new">Create New</TabsTrigger>
              <TabsTrigger value="owned">List Owned</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="new">
            <NFTForm />
          </TabsContent>
          
          <TabsContent value="owned">
            <div>
              <h2 className="text-2xl font-bold mb-6">Select an NFT from your collection</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ownedNFTs.map((nft) => (
                  <Link to={`/create/list/${nft.id}`} key={nft.id}>
                    <Card className="cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={nft.imageUrl} 
                          alt={nft.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">{nft.title}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                
                <Link to="/create/new">
                  <Card className="h-full flex flex-col items-center justify-center cursor-pointer border-dashed border-2 transition-colors hover:bg-accent">
                    <CardContent className="h-full flex flex-col items-center justify-center py-8">
                      <div className="w-12 h-12 rounded-full bg-zenthra-purple/10 flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zenthra-purple">
                          <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-medium">Create New NFT</h3>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-medium mb-4">How to list your owned NFT</h3>
                <div className="bg-muted/50 p-6 rounded-xl">
                  <ol className="list-decimal ml-5 space-y-3">
                    <li>Select an NFT from your collection above</li>
                    <li>Set your auction parameters (starting price, duration, etc.)</li>
                    <li>Confirm the listing transaction with your wallet</li>
                    <li>Your NFT will immediately appear in the marketplace</li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Create;
