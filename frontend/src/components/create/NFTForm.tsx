import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadFileToPinata, uploadJSONToPinata } from "@/lib/pinata-service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mintNFT } from "@/lib/contract-operations";
import { NFTPreview } from "@/components/create/NFTPreview";
import { useAccount } from "wagmi";

interface NFTFormData {
  title: string;
  description: string;
  startingPrice: number;
  royaltyPercentage: number;
  duration: string;
  mintable: boolean;
  maxMints?: number;
}

interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  message?: string;
}

const NFTForm = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle' });
  const [imageCid, setImageCid] = useState<string | null>(null);
  const [metadataUrl, setMetadataUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { isConnected, address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const form = useForm<NFTFormData>({
    defaultValues: {
      title: "",
      description: "",
      startingPrice: 5,
      royaltyPercentage: 10,
      duration: "7",
      mintable: false
    }
  });
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Store the file for later upload
    setUploadedFile(file);
    
    try {
      setUploadState({ status: 'uploading', message: 'Uploading image to IPFS...' });
      
      // Upload to Pinata
      const cid = await uploadFileToPinata(file);
      setImageCid(cid);
      
      setUploadState({ 
        status: 'success', 
        message: `Image uploaded successfully! CID: ${cid.substring(0, 6)}...${cid.substring(cid.length - 4)}` 
      });
      
      toast({
        title: "Image uploaded",
        description: "Image successfully stored on IPFS",
      });
    } catch (error) {
      setUploadState({ 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error uploading image' 
      });
      
      toast({
        title: "Upload failed",
        description: "Could not upload image to IPFS. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const onSubmit = async (data: NFTFormData) => {
    if (!uploadedImage || !imageCid) {
      toast({
        title: "Image required",
        description: "Please upload an image for your NFT",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create metadata JSON
      const pinataGateway = import.meta.env.VITE_PINATA_GATEWAY || 'gateway.pinata.cloud';
      const imageUrl = `https://${pinataGateway}/ipfs/${imageCid}`;
      
      const metadata = {
        name: data.title,
        description: data.description,
        image: imageUrl,
        attributes: [
          {
            trait_type: "Starting Price",
            value: data.startingPrice
          },
          {
            trait_type: "Royalty Percentage",
            value: data.royaltyPercentage
          },
          {
            trait_type: "Duration",
            value: `${data.duration} days`
          }
        ]
      };
      
      if (data.mintable) {
        metadata.attributes.push({
          trait_type: "Mintable",
          value: "Yes"
        });
        
        if (data.maxMints) {
          metadata.attributes.push({
            trait_type: "Max Editions",
            value: data.maxMints
          });
        }
      }
      
      // Normalize title for filename
      const safeFileName = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      toast({
        title: "Creating metadata",
        description: "Uploading NFT metadata to IPFS...",
      });
      
      // Upload metadata to Pinata
      const metadataCid = await uploadJSONToPinata(metadata, safeFileName);
      const fullMetadataUrl = `https://${pinataGateway}/ipfs/${metadataCid}`;
      setMetadataUrl(fullMetadataUrl);
      
      toast({
        title: "Metadata created",
        description: "Your NFT metadata has been stored on IPFS",
      });
      
      // Here you would call your smart contract to mint the NFT with the metadata URL
      // For now, we'll just show a success message
      
      toast({
        title: "NFT created!",
        description: "Your NFT has been successfully prepared. Ready to mint!",
      });
      
      // Instead of resetting the form immediately, we'll show the success state
      // so the user can see the metadata URL if they want
    } catch (error) {
      toast({
        title: "Creation failed",
        description: error instanceof Error ? error.message : "Failed to create NFT metadata",
        variant: "destructive"
      });
      console.error("NFT creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleMintNFT = async () => {
    if (!metadataUrl) {
      toast({
        title: "Metadata required",
        description: "Please create metadata first",
        variant: "destructive"
      });
      return;
    }
    
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to mint an NFT",
        variant: "destructive"
      });
      return;
    }
    
    setIsMinting(true);
    
    try {
      toast({
        title: "Minting NFT",
        description: "Please confirm the transaction in your wallet",
      });
      
      const tx = await mintNFT(metadataUrl);
      setTxHash(tx.hash);
      
      toast({
        title: "NFT Minted!",
        description: "Your NFT has been successfully minted",
      });
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast({
        title: "Minting failed",
        description: error instanceof Error ? error.message : "Failed to mint NFT",
        variant: "destructive"
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Create New NFT</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the title of your NFT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your NFT, its uniqueness, and story behind it" 
                      className="resize-none min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startingPrice"
                rules={{ 
                  required: "Starting price is required",
                  min: { value: 0.01, message: "Price must be at least 0.01" }
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
                name="royaltyPercentage"
                rules={{ 
                  required: "Royalty percentage is required",
                  min: { value: 0, message: "Minimum 0%" },
                  max: { value: 50, message: "Maximum 50%" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Royalty Percentage</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="duration"
              rules={{ required: "Auction duration is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auction Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select auction duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Separator className="my-6" />
            
            <FormField
              control={form.control}
              name="mintable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Mintable NFT</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Allow this NFT to be minted multiple times
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch("mintable") && (
              <FormField
                control={form.control}
                name="maxMints"
                rules={{ 
                  min: { value: 1, message: "Must allow at least 1 mint" },
                  max: { value: 1000, message: "Maximum 1000 mints allowed" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Mints</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="1000" 
                        placeholder="Leave blank for unlimited"
                        {...field}
                        value={field.value || ""} 
                        onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {/* Add upload status indicator */}
            {uploadState.status !== 'idle' && (
              <Alert 
                variant={uploadState.status === 'error' ? 'destructive' : 'default'}
                className={`my-4 ${uploadState.status === 'uploading' ? 'border border-input bg-background/50' : ''}`}
              >
                {uploadState.status === 'uploading' && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {uploadState.status === 'success' && <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />}
                {uploadState.status === 'error' && <AlertCircle className="h-4 w-4 mr-2" />}
                <AlertDescription>
                  {uploadState.message}
                </AlertDescription>
              </Alert>
            )}
            
            {/* Show metadata URL if available */}
            {metadataUrl && (
              <Alert className="my-4 bg-zenthra-purple/10">
                <div className="flex flex-col">
                  <span className="font-medium">Metadata URL:</span>
                  <code className="text-xs break-all mt-1">{metadataUrl}</code>
                </div>
              </Alert>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || uploadState.status === 'uploading' || !imageCid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating NFT Metadata...
                </>
              ) : (
                "Create NFT"
              )}
            </Button>
            
            {/* Reset button only after successful creation */}
            {metadataUrl && (
              <Button 
                type="button"
                variant="outline" 
                className="w-full mt-2"
                onClick={() => {
                  form.reset();
                  setUploadedImage(null);
                  setUploadedFile(null);
                  setUploadState({ status: 'idle' });
                  setImageCid(null);
                  setMetadataUrl(null);
                }}
              >
                Create Another NFT
              </Button>
            )}
          </form>
        </Form>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Preview</h2>
        
        {/* NFT Preview */}
        {uploadedImage ? (
          <NFTPreview 
            metadataUrl={metadataUrl}
            title={form.watch("title")}
            description={form.watch("description")}
            imageUrl={uploadedImage}
            isLoading={isSubmitting}
          />
        ) : (
          <Card className="overflow-hidden">
            <label 
              htmlFor="nft-upload" 
              className="flex flex-col items-center justify-center aspect-square bg-muted/50 border-2 border-dashed border-muted-foreground/50 rounded-md cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload your artwork</h3>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG, GIF, WEBP or SVG (max. 10MB)
                </p>
              </div>
              <input 
                id="nft-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </label>
          </Card>
        )}
        
        {/* Add mint button after metadata is created */}
        {metadataUrl && !txHash && (
          <Button
            type="button"
            className="w-full mt-4"
            onClick={handleMintNFT}
            disabled={isMinting || !isConnected}
          >
            {isMinting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting NFT...
              </>
            ) : (
              "Mint NFT"
            )}
          </Button>
        )}
        
        {/* Show transaction hash if minted */}
        {txHash && (
          <Alert className="mt-4">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <div className="ml-2">
              <div className="font-medium">NFT Minted Successfully!</div>
              <div className="text-xs break-all mt-1">
                Transaction: {txHash}
              </div>
            </div>
          </Alert>
        )}
        
        {/* Instructions or tips for creators */}
        <div className="mt-6 p-4 bg-zenthra-slate-50 dark:bg-zenthra-blue/40 rounded-lg">
          <h3 className="font-medium mb-2">Tips for creating great NFTs</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Use high-resolution images to showcase your artwork</li>
            <li>• Write detailed descriptions to tell the story behind your creation</li>
            <li>• Set a fair starting price to attract early bidders</li>
            <li>• Consider how many editions you want to make available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NFTForm;
