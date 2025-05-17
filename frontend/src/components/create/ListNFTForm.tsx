import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createAuction } from "@/lib/contract-operations";
import { NFTPreview } from './NFTPreview';

interface ListNFTFormProps {
  tokenId: string;
  metadataUri: string;
}

interface ListingFormData {
  title: string;
  startingPrice: number;
  duration: number;
  royaltyPercentage: number;
}

export function ListNFTForm({ tokenId, metadataUri }: ListNFTFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm<ListingFormData>({
    defaultValues: {
      title: "",
      startingPrice: 5,
      duration: 7,
      royaltyPercentage: 10
    }
  });
  
  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);
    
    try {
      toast({
        title: "Creating Auction",
        description: "Please confirm the transaction in your wallet",
      });
      
      const tx = await createAuction({
        tokenId,
        title: data.title,
        startingPrice: data.startingPrice,
        duration: data.duration,
        royaltyPercentage: data.royaltyPercentage
      });
      
      setTxHash(tx);
      
      toast({
        title: "Auction Created!",
        description: "Your NFT has been listed for auction",
      });
    } catch (error) {
      console.error("Error listing NFT:", error);
      toast({
        title: "Listing failed",
        description: error instanceof Error ? error.message : "Failed to list NFT for auction",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">List NFT for Auction</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auction Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title for your auction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="startingPrice"
              rules={{ 
                required: "Starting price is required",
                min: { value: 0.01, message: "Price must be at least 0.01 LSK" } 
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starting Price (LSK)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="duration"
              rules={{ 
                required: "Duration is required",
                min: { value: 1, message: "Duration must be at least 1 day" }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auction Duration (days)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="royaltyPercentage"
              rules={{ 
                required: "Royalty percentage is required",
                min: { value: 0, message: "Royalty must be at least 0%" },
                max: { value: 15, message: "Royalty cannot exceed 15%" }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Royalty Percentage (%)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" max="15" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {txHash ? (
              <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-semibold">Auction Created Successfully!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your NFT has been listed for auction. View it on the Explore page.
                    </p>
                    <p className="text-xs break-all mt-2">
                      Transaction: {txHash}
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Auction...
                  </>
                ) : (
                  "List NFT for Auction"
                )}
              </Button>
            )}
          </form>
        </Form>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">NFT Preview</h2>
        <NFTPreview metadataUrl={metadataUri} />
      </div>
    </div>
  );
}