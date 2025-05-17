import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NFTForm from '@/components/create/NFTForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAccount } from "wagmi";
import { getOwnedNFTs } from "@/lib/contract-operations";
import { Loader2 } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NFTPreview } from '../components/nft/NFTPreview';

const Create = () => {
  const { isConnected, address } = useAccount();
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOwnedNFTs = async () => {
      if (!isConnected || !address) return;
      
      setIsLoading(true);
      try {
        const nfts = await getOwnedNFTs(address);
        if (Array.isArray(nfts)) {
          setOwnedNFTs(nfts);
        } else {
          setOwnedNFTs([]);
        }
      } catch (error) {
        console.error("Error fetching owned NFTs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOwnedNFTs();
  }, [isConnected, address]);

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
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-zenthra-purple" />
                </div>
              ) : !isConnected ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Please connect your wallet to view your NFTs</p>
                  <ConnectButton />
                </div>
              ) : ownedNFTs.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                  <p className="text-muted-foreground mb-4">You don't have any NFTs yet</p>
                  <Button onClick={() => (document.querySelector('[data-value="new"]') as HTMLElement)?.click()}>
                    Create Your First NFT
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {ownedNFTs.map((nft) => (
                    <Link to={`/create/list/${nft.id}`} key={nft.id}>
                      <NFTPreview metadataUrl={nft.metadataUri} />
                    </Link>
                  ))}
                  <Link to="/create">
                    <Card className="overflow-hidden h-full">
                      <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <div className="rounded-full bg-zenthra-purple/10 p-3 mb-4">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zenthra-purple">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 className="font-medium">Create New NFT</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )}
              
              <div className="mt-10">
                <h3 className="text-xl font-medium mb-4">How to list your owned NFT</h3>
                <div className="bg-muted/50 p-6 rounded-xl">
                  <ol className="list-decimal ml-5 space-y-3">
                    <li>Select an NFT from your collection above</li>
                    <li>Set your auction parameters (starting price, duration, etc.)</li>
                    <li>Confirm the listing transaction with your wallet</li>
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
