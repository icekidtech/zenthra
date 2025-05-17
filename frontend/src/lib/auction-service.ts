import { readContract } from 'wagmi/actions';
import { getHttpClient } from 'wagmi/query';
import { contractAbi } from './contract-abi';

// Contract address from the deployed blockchain
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x...'; // Add fallback

export interface AuctionItem {
  id: string;
  title: string;
  creator: string;
  creatorAddress: string;
  imageUri: string;
  metadataUri: string;
  currentBid: bigint;
  endTime: number;
  isActive: boolean;
}

export async function fetchActiveAuctions() {
  try {
    const data = await readContract(getHttpClient(), {
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: contractAbi,
      functionName: 'getActiveAuctions',
    });
    
    return data as unknown as AuctionItem[];
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error;
  }
}

// Fetch a single auction's details
export async function fetchAuctionDetails(auctionId: string) {
  try {
    const data = await readContract(getHttpClient(), {
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: contractAbi,
      functionName: 'getAuction',
      args: [auctionId],
    });
    
    return data as unknown as AuctionItem;
  } catch (error) {
    console.error(`Error fetching auction ${auctionId}:`, error);
    throw error;
  }
}

// Fetch metadata from IPFS
export async function fetchNftMetadata(metadataUri: string) {
  try {
    // Handle both IPFS and HTTP URIs
    const url = metadataUri.startsWith('ipfs://')
      ? `https://gateway.pinata.cloud/ipfs/${metadataUri.substring(7)}`
      : metadataUri;
      
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch metadata');
    return await response.json();
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    throw error;
  }
}

// Format IPFS image URL
export function getIpfsImageUrl(imageUri: string) {
  if (!imageUri) return '';
  if (imageUri.startsWith('ipfs://')) {
    return `https://gateway.pinata.cloud/ipfs/${imageUri.substring(7)}`;
  }
  return imageUri;
}