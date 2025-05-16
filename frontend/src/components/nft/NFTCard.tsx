
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NFTCardProps {
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

const NFTCard = ({
  id,
  title,
  creator,
  creatorAvatar,
  imageUrl,
  currentBid,
  currency = "LSK",
  timeLeft,
  timeLeftSec,
  isNew = false,
  isHot = false
}: NFTCardProps) => {
  // Status based on time left
  const getTimeStatus = () => {
    if (!timeLeftSec) return null;
    
    if (timeLeftSec < 3600) { // less than an hour
      return <Badge variant="destructive" className="absolute top-2 right-2">Ending Soon</Badge>;
    } else if (isNew) {
      return <Badge variant="outline" className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm">New</Badge>;
    } else if (isHot) {
      return <Badge className="absolute top-2 right-2 bg-zenthra-coral text-white">Hot</Badge>;
    }
    return null;
  };

  return (
    <Link to={`/nft/${id}`}>
      <Card className="nft-card group">
        <div className="nft-image-container">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="nft-card-gradient"></div>
          {getTimeStatus()}
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="text-left">
              <h3 className="text-sm font-medium line-clamp-1">{title}</h3>
              <div className="flex items-center gap-1 mt-1">
                {creatorAvatar ? (
                  <img src={creatorAvatar} alt={creator} className="w-4 h-4 rounded-full" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-zenthra-purple/20"></div>
                )}
                <span className="text-xs text-muted-foreground">@{creator}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-semibold">
                {currentBid} {currency}
              </div>
              {timeLeft && (
                <div className="countdown-timer text-muted-foreground">
                  {timeLeft}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default NFTCard;
