import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getIpfsImageUrl } from '@/lib/auction-service';
import { NFT } from './NFTGrid';

const NFTCard = ({ id, title, creator, imageUrl, currentBid, timeLeft, isNew, isHot }: NFT) => {
  const [imageError, setImageError] = useState(false);
  
  // Format the image URL (handle IPFS)
  const formattedImageUrl = imageUrl.startsWith('ipfs://') 
    ? getIpfsImageUrl(imageUrl)
    : imageUrl;
  
  // Fallback image in case of loading error
  const fallbackImage = "https://via.placeholder.com/800x800?text=NFT+Image";
  
  return (
    <Link to={`/nft/${id}`}>
      <Card className="overflow-hidden nft-card">
        <div className="nft-image-container">
          <img 
            src={imageError ? fallbackImage : formattedImageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="nft-card-gradient"></div>
          
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
              <Badge className="bg-zenthra-coral text-white">New</Badge>
            )}
            {isHot && (
              <Badge className="bg-zenthra-purple text-white">Hot</Badge>
            )}
          </div>
          
          {timeLeft && (
            <div className="absolute bottom-3 right-3">
              <Badge variant="outline" className="bg-black/70 text-white border-none countdown-timer">
                {timeLeft}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold truncate flex-1">{title}</h3>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              by <span className="text-foreground">@{creator}</span>
            </div>
            <div className="font-semibold text-right">
              {currentBid} <span className="text-xs text-muted-foreground">LSK</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default NFTCard;
