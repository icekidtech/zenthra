
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
import { Upload } from "lucide-react";

interface NFTFormData {
  title: string;
  description: string;
  startingPrice: number;
  royaltyPercentage: number;
  duration: string;
  mintable: boolean;
  maxMints?: number;
}

const NFTForm = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
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
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: NFTFormData) => {
    if (!uploadedImage) {
      toast({
        title: "Image required",
        description: "Please upload an image for your NFT",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate blockchain interaction
    try {
      // This would be replaced with actual blockchain calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "NFT created!",
        description: "Your NFT has been successfully created and listed",
      });
      
      // Reset form
      form.reset();
      setUploadedImage(null);
    } catch (error) {
      toast({
        title: "Creation failed",
        description: "There was an error creating your NFT",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating NFT..." : "Create NFT"}
            </Button>
          </form>
        </Form>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Preview</h2>
        <Card className="overflow-hidden">
          {uploadedImage ? (
            <div className="aspect-square">
              <img 
                src={uploadedImage} 
                alt="NFT Preview" 
                className="w-full h-full object-cover" 
              />
            </div>
          ) : (
            <label 
              htmlFor="nft-upload" 
              className="flex flex-col items-center justify-center aspect-square bg-muted/50 border-2 border-dashed border-muted-foreground/50 rounded-md cursor-pointer"
            >
              <Upload size={48} className="mb-4 text-muted-foreground/70" />
              <div className="text-center">
                <p className="text-lg font-medium">Upload NFT Image</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  PNG, JPG, GIF, or WebP. Max 50MB.
                </p>
                <Button variant="secondary" type="button">Choose File</Button>
              </div>
              <input 
                id="nft-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </label>
          )}
          
          {uploadedImage && (
            <div className="p-4">
              <h3 className="font-medium">
                {form.watch("title") || "Untitled NFT"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {form.watch("description") || "No description provided"}
              </p>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Starting price</p>
                  <p className="font-medium">{form.watch("startingPrice") || 0} LSK</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => setUploadedImage(null)}>
                  Change Image
                </Button>
              </div>
            </div>
          )}
        </Card>
        
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
