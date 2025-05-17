import { createWalletClient, http as walletHttp, parseUnits } from 'viem';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { contractAbi } from './contract-abi';
import { getAccount, getWalletClient } from 'wagmi/actions';
import { config } from '@/providers/Web3Provider'; // Import the existing config

// Contract address from the deployed blockchain
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

// Create a public client instance for read operations
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

/**
 * Mint a new NFT using metadata URI
 */
export async function mintNFT(metadataUri: string) {
  try {
    // Get the connected account with proper config
    const account = getAccount(config);
    if (!account.address) throw new Error("No wallet connected");
    
    // Get the wallet client with proper config
    const walletClient = await getWalletClient(config);
    
    if (!walletClient) throw new Error("Could not get wallet client");
    
    // Use the wallet client directly
    const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: 'mintNFT',
        args: [metadataUri],
        account: account.address,
        chain: mainnet // Add this line
    });
    
    return {
      hash,
      wait: () => publicClient.waitForTransactionReceipt({ hash })
    };
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
    
    // Get the connected account with proper config
    const account = getAccount(config);
    if (!account.address) throw new Error("No wallet connected");
    
    // Get the wallet client with proper config
    const walletClient = await getWalletClient(config);
    
    if (!walletClient) throw new Error("Could not get wallet client");
    
    // Use the wallet client directly
    const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: 'createAuction',
        args: [tokenId, title, priceInWei, endTime, royaltyPercentage * 100],
        account: account.address,
        chain: mainnet // Add this line
    });
    
    return {
      hash,
      wait: () => publicClient.waitForTransactionReceipt({ hash })
    };
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
    // Use viem's client.readContract directly - this approach is correct
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
    // Use publicClient's readContract method directly
    const result = await publicClient.readContract({
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

/**
 * Get NFT details by ID
 */
export async function getNFTDetails(tokenId: string) {
  try {
    const result = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: 'getNFTDetails',
      args: [tokenId]
    });
    
    return result;
  } catch (error) {
    console.error(`Error fetching NFT details for ${tokenId}:`, error);
    throw error;
  }
}