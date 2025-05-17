import { writeContract, readContract } from '@wagmi/core';
import { contractAbi } from './contract-abi';
import { parseUnits } from 'viem';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

// Contract address from the deployed blockchain
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

// Create a public client instance
const publicClient = createPublicClient({
  chain: mainnet, // Change to your preferred chain
  transport: http()
});

/**
 * Mint a new NFT using metadata URI
 */
export async function mintNFT(metadataUri: string) {
  try {
    const tx = await writeContract({
      address: CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: 'mintNFT',
      args: [metadataUri],
    });
    
    return tx;
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
}

/**
 * Create a new auction for an NFT
 */
export async function createAuction({
  tokenId,
  title,
  startingPrice,
  duration,
  royaltyPercentage
}: {
  tokenId: string;
  title: string;
  startingPrice: number;
  duration: number;
  royaltyPercentage: number;
}) {
  try {
    // Convert price to wei
    const priceInWei = parseUnits(startingPrice.toString(), 18);
    
    // Get timestamp for auction end (current time + duration in days)
    const durationInSeconds = duration * 24 * 60 * 60; // days to seconds
    const endTime = Math.floor(Date.now() / 1000) + durationInSeconds;
    
    const tx = await writeContract({
      address: CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: 'createAuction',
      args: [tokenId, title, priceInWei, endTime, royaltyPercentage * 100], // multiply by 100 to get basis points
    });
    
    return tx;
  } catch (error) {
    console.error("Error creating auction:", error);
    throw error;
  }
}

/**
 * Get NFTs owned by an address
 */
export async function getOwnedNFTs(walletAddress: string) {
  try {
    // Use viem's client.readContract directly
    const result = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: 'getNFTsByOwner',
      args: [walletAddress]
    });
    
    return result;
  } catch (error) {
    console.error("Error getting owned NFTs:", error);
    throw error;
  }
}

/**
 * Fetch contract data for a specific token ID
 */
export async function fetchContractData(tokenId: string) {
  try {
    // Call readContract with both required arguments
    const result = await readContract({
      address: CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: 'getData',
      args: [tokenId]
    });
    
    return result;
  } catch (error) {
    console.error("Error reading contract data:", error);
    throw error;
  }
}