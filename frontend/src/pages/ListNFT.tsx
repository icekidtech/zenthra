import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAccount } from "wagmi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ListNFTForm } from "@/components/create/ListNFTForm";
import { readContract } from '@wagmi/core';
import { contractAbi } from '@/lib/contract-abi';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

interface NFTDetails {
  tokenId: string;
  owner: string;
  metadataUri: string;
}

export default function ListNFT() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [nftDetails, setNftDetails] = useState<NFTDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchNFTDetails = async () => {
      if (!id || !isConnected) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await readContract({
          address: CONTRACT_ADDRESS,
          abi: contractAbi,
          functionName: 'getNFTDetails',
          args: [id],
        }) as unknown as NFTDetails;
        
        setNftDetails(data);
        
        // Check if the user is the owner
        if (data.owner.toLowerCase() !== address?.toLowerCase()) {
          setError("You don't own this NFT");
        }
      } catch (err) {
        console.error("Error fetching NFT details:", err);
        setError("Could not load NFT details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNFTDetails();
  }, [id, address, isConnected]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 container">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-zenthra-purple" />
          </div>
        ) : error ? (
          <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => navigate('/create')}>
              Return to Create
            </Button>
          </div>
        ) : nftDetails ? (
          <ListNFTForm tokenId={nftDetails.tokenId} metadataUri={nftDetails.metadataUri} />
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <p className="text-muted-foreground mb-4">NFT not found</p>
            <Button onClick={() => navigate('/create')}>
              Return to Create
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}