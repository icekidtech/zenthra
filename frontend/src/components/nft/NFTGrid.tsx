
import React from 'react';
import NFTCard from './NFTCard';

export interface NFT {
  id: string;
  title: string;
  creator: string;
  creatorAvatar?: string;
  imageUrl: string;
  currentBid: number;
  currency?: string;
  timeLeft?: string;
  timeLeftSec?: number;
  isNew?: boolean;
  isHot?: boolean;
}

interface NFTGridProps {
  nfts: NFT[];
  className?: string;
}

const NFTGrid = ({ nfts, className = "" }: NFTGridProps) => {
  if (!nfts.length) {
    return (
      <div className="my-16 text-center">
        <h3 className="text-lg font-medium mb-2">No NFTs found</h3>
        <p className="text-muted-foreground">Try changing your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {nfts.map((nft) => (
        <NFTCard key={nft.id} {...nft} />
      ))}
    </div>
  );
};

export default NFTGrid;
