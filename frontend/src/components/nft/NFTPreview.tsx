import React from 'react';

interface NFTPreviewProps {
  imageUrl?: string;
  title?: string;
  description?: string;
}

export const NFTPreview: React.FC<NFTPreviewProps> = ({ 
  imageUrl = '', 
  title = 'NFT Title', 
  description = 'NFT Description' 
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-gray-400">No Image Preview</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};