import { createPublicClient, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

// Determine which chain to use
const chain = import.meta.env.VITE_NETWORK === 'mainnet' ? mainnet : sepolia;

export const publicClient = createPublicClient({
  chain,
  transport: http(),
});