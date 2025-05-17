import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface NFTPreviewProps {
  metadataUrl: string | null;
  title?: string;
  description?: string;
  imageUrl?: string;
  isLoading?: boolean;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export function NFTPreview({ metadataUrl, title, description, imageUrl, isLoading = false }: NFTPreviewProps) {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch metadata if URL is provided
  useEffect(() => {
    if (!metadataUrl) return;

    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(metadataUrl);
        if (!response.ok) throw new Error("Failed to fetch metadata");
        
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching NFT metadata");
        console.error("Error fetching NFT metadata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [metadataUrl]);

  const displayTitle = metadata?.name || title || "Untitled NFT";
  const displayDescription = metadata?.description || description || "";
  const displayImage = metadata?.image || imageUrl;

  return (
    <Card className="overflow-hidden">
      {isLoading || loading ? (
        <div className="aspect-square">
          <Skeleton className="w-full h-full" />
        </div>
      ) : displayImage ? (
        <div className="aspect-square bg-muted relative">
          <img 
            src={displayImage} 
            alt={displayTitle} 
            className="w-full h-full object-cover" 
          />
        </div>
      ) : (
        <div className="aspect-square bg-muted/50 flex items-center justify-center text-muted-foreground">
          <p>No image available</p>
        </div>
      )}

      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{displayTitle}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{displayDescription}</p>

        {metadata?.attributes && (
          <div className="flex flex-wrap gap-2">
            {metadata.attributes.map((attr, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {attr.trait_type}: {attr.value}
              </Badge>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}