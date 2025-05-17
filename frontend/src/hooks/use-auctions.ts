import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchActiveAuctions, 
  fetchNftMetadata,
  AuctionItem
} from '@/lib/auction-service';
import { NFT } from '@/components/nft/NFTGrid';

export function useAuctions(filter: string, sort: string) {
  // Transform blockchain data to our NFT component format
  // Define metadata interface
  interface NFTMetadata {
    name?: string;
    creator?: string;
    image?: string;
    [key: string]: any; // Allow for additional properties
  }

  const transformToNFT = async (auctions: AuctionItem[]): Promise<NFT[]> => {
    return Promise.all(auctions.map(async auction => {
      // Try to fetch metadata if available
      let metadata: NFTMetadata = {};
      try {
        if (auction.metadataUri) {
          metadata = await fetchNftMetadata(auction.metadataUri);
        }
      } catch (e) {
        console.error(`Failed to fetch metadata for auction ${auction.id}`, e);
      }
      
      // Calculate time left
      const now = Math.floor(Date.now() / 1000);
      const timeLeftSec = auction.endTime - now;
      const timeLeft = formatTimeLeft(timeLeftSec);
      
      // Create NFT object
      return {
        id: auction.id,
        title: auction.title || metadata.name || 'Untitled NFT',
        creator: metadata.creator || auction.creator || 'Unknown Artist',
        imageUrl: metadata.image || auction.imageUri || 'https://via.placeholder.com/800x800?text=NFT+Image',
        currentBid: Number(auction.currentBid) / 1e18, // Convert from wei to ETH
        timeLeft,
        timeLeftSec,
        isHot: Number(auction.currentBid) > 500 * 1e18, // Just an example condition
        isNew: timeLeftSec > 518400, // New if >6 days left (just started)
      };
    }));
  };
  
  // Apply filters to the NFTs
  const applyFilters = (nfts: NFT[], filter: string) => {
    if (filter === 'all') return nfts;
    if (filter === 'new') return nfts.filter(nft => nft.isNew);
    if (filter === 'hot') return nfts.filter(nft => nft.isHot);
    return nfts;
  };
  
  // Apply sorting to the NFTs
  const applySorting = (nfts: NFT[], sort: string) => {
    switch (sort) {
      case 'price-high':
        return [...nfts].sort((a, b) => b.currentBid - a.currentBid);
      case 'price-low':
        return [...nfts].sort((a, b) => a.currentBid - b.currentBid);
      case 'ending-soon':
        return [...nfts].sort((a, b) => (a.timeLeftSec || 0) - (b.timeLeftSec || 0));
      case 'recently-added':
        return [...nfts].sort((a, b) => (b.timeLeftSec || 0) - (a.timeLeftSec || 0));
      case 'trending':
      default:
        // Sort by a combination of bid price and time left
        return [...nfts].sort((a, b) => {
          const scoreFactor = (n: NFT) => (n.currentBid * 1000) / (n.timeLeftSec || 1);
          return scoreFactor(b) - scoreFactor(a);
        });
    }
  };

  // Fetch auctions with React Query
  const {
    data: nfts,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['auctions', filter, sort],
    queryFn: async () => {
      try {
        // Fetch raw auction data
        const auctions = await fetchActiveAuctions();
        // Transform to NFT format
        let nfts = await transformToNFT(auctions);
        // Apply filters and sorting
        nfts = applyFilters(nfts, filter);
        nfts = applySorting(nfts, sort);
        return nfts;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 60 * 1000, // 1 minute before refetching
  });

  return {
    nfts: nfts || [],
    isLoading,
    error,
    refetch
  };
}

// Helper function to format time left in human readable format
function formatTimeLeft(seconds: number): string {
  if (seconds <= 0) return 'Ended';
  
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}