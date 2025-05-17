import { NFT } from '@/components/nft/NFTGrid';

export const mockNFTs: NFT[] = [
  {
    id: '1',
    title: 'Abstract Dimensions #42',
    creator: 'abstract_master',
    imageUrl: 'https://source.unsplash.com/random/800x800/?abstract,art,1',
    currentBid: 320,
    timeLeft: '2d 4h 15m',
    timeLeftSec: 184500,
    isHot: true
  },
  {
    id: '2',
    title: 'Cosmic Journey',
    creator: 'stargazer',
    imageUrl: 'https://source.unsplash.com/random/800x800/?space,cosmos,1',
    currentBid: 175.5,
    timeLeft: '1d 7h 30m',
    timeLeftSec: 112200
  },
  // ... additional mock NFTs
];