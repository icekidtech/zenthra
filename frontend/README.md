
# Zenthra - Web3 NFT Auction Platform

![Zenthra Logo](https://source.unsplash.com/random/1200x400/?blockchain,nft)

## Overview

Zenthra is a modern Web3 NFT auction platform built on the Lisk blockchain, enabling creators and collectors to trade unique digital assets. The platform offers a seamless experience for minting, buying, selling, and collecting NFTs through an intuitive and responsive interface.

## Features

### Core Functionality

- **NFT Marketplace**: Browse, bid on, and purchase unique digital collectibles
- **Auction System**: Participate in timed NFT auctions with real-time bidding
- **Wallet Integration**: Seamlessly connect your Web3 wallet to interact with the platform
- **Creator Tools**: Mint and list your own NFTs with customizable auction parameters
- **User Dashboard**: Track your owned NFTs, active auctions, and bidding history

### Technical Features

- **Web3 Connection**: Integrated wallet connection for blockchain interactions
- **Network Switching**: Toggle between Mainnet and Testnet environments
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark/Light Themes**: Customizable UI themes to suit your preference

## Pages

### Explore (Home)

The main landing page showcases trending NFTs, featured creators, and active auctions. Users can filter and sort NFTs based on various criteria like trending, ending soon, or price range.

### Dashboard

A personalized space for users to manage their NFT portfolio:
- Track active auctions you've created
- Monitor auctions you're participating in
- View NFTs you've won or lost in past auctions
- Manage your owned NFT collection

### Create

An intuitive interface for creators to mint new NFTs and set up auctions:
- Upload artwork
- Set auction parameters (starting bid, duration, etc.)
- Choose between single and multiple editions
- Add detailed descriptions and properties

### Help & Support

Access community-driven support and resources:
- FAQ section with common questions and answers
- Community Q&A for specific inquiries
- Educational resources about NFTs and the platform

## Tech Stack

- **Frontend**: React + TypeScript
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router Dom
- **State Management**: React Query
- **Development**: Vite
- **Web3 Integration**: Custom wallet connection

## Color Palette

- Primary: Night Blue (#0a0f2c)
- Secondary Purple: #9b87f5
- Accent Coral: #FF6B6B
- UI Elements: Various shades of slate and gray
- Backgrounds: Dark mode and light mode options

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn package manager
- Web3 wallet for testing (MetaMask recommended)

### Local Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd zenthra

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

```
zenthra/
├── public/           # Static assets
├── src/
│   ├── components/   # UI components
│   │   ├── home/     # Home page components
│   │   ├── dashboard/ # Dashboard components
│   │   ├── nft/      # NFT-related components
│   │   ├── layout/   # Layout components like Header, Footer
│   │   ├── web3/     # Web3 integration components
│   │   └── ui/       # shadcn UI components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── App.tsx       # Main App component
└── index.html        # Entry HTML file
```

## Deployment

Zenthra can be easily deployed using the Lovable platform:

1. Open [Lovable Project](https://lovable.dev/projects/f5e8be43-cc83-471d-8a93-0d8d73adf453)
2. Click on Share -> Publish
3. Follow the deployment instructions

### Custom Domain

To connect a custom domain to your Zenthra project:

1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the domain configuration instructions

## Future Roadmap

- Enhanced auction types (Dutch, English, Reserve)
- Multi-chain support
- Advanced creator royalties
- Social features and collector profiles
- Mobile app version

## Contributing

Contributions to Zenthra are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
