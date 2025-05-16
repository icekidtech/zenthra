
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  questions: FAQItem[];
}

const FAQSection = ({ title, questions }: FAQSectionProps) => (
  <div className="mb-8">
    <h3 className="text-xl font-medium mb-4">{title}</h3>
    <Accordion type="single" collapsible className="w-full">
      {questions.map((q, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left">{q.question}</AccordionTrigger>
          <AccordionContent>
            <div className="prose dark:prose-invert max-w-none">
              <p>{q.answer}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

const FaqAccordion = () => {
  const generalFAQs = [
    {
      question: "What is Zenthra?",
      answer: "Zenthra is a Web3 NFT auction platform built on the Lisk blockchain. It allows creators to mint, list, and sell NFTs, while collectors can browse, bid on, and purchase unique digital assets."
    },
    {
      question: "How do I get started with Zenthra?",
      answer: "To get started, connect your wallet using the 'Connect Wallet' button in the top-right corner of the page. Once connected, you can browse NFTs, place bids, or create your own NFT by clicking on the 'Create' tab."
    },
    {
      question: "What blockchain does Zenthra use?",
      answer: "Zenthra is built on the Lisk blockchain, which is EVM-compatible. This allows for efficient, low-cost transactions while maintaining compatibility with the broader Ethereum ecosystem."
    },
    {
      question: "What fees does Zenthra charge?",
      answer: "Zenthra charges a 2.5% service fee on successful NFT sales. Additionally, creators can set their own royalty percentage (up to 15%) to earn from secondary sales of their work."
    }
  ];
  
  const creatorFAQs = [
    {
      question: "How do I create an NFT on Zenthra?",
      answer: "Navigate to the 'Create' page, upload your digital asset, fill in the details including title, description, and pricing, then click 'Create NFT'. You'll need to approve the transaction with your connected wallet."
    },
    {
      question: "What file formats are supported for NFTs?",
      answer: "Zenthra supports common image formats such as JPG, PNG, GIF, and WebP. The maximum file size is 50MB."
    },
    {
      question: "How do royalties work?",
      answer: "Royalties allow creators to earn a percentage of all future sales of their NFT. When creating your NFT, you can set a royalty percentage (0% to 15%) that you'll automatically receive whenever your NFT is sold on the secondary market."
    },
    {
      question: "What is a mintable NFT?",
      answer: "A mintable NFT allows multiple editions of the same artwork to be created. When enabled, you can specify a maximum number of editions that can be minted, or leave it unlimited. Each edition is still unique and tracked on the blockchain."
    }
  ];
  
  const collectorFAQs = [
    {
      question: "How do I place a bid on an NFT?",
      answer: "Browse to the NFT you're interested in, click on it to view details, then enter your bid amount and click 'Place Bid'. You'll need to have sufficient funds in your connected wallet."
    },
    {
      question: "What happens when I win an auction?",
      answer: "When you win an auction, the NFT is automatically transferred to your wallet, and the funds are transferred to the seller. You can view your won NFTs in the 'Dashboard' under the 'Won Auctions' tab."
    },
    {
      question: "Can I resell NFTs I've purchased?",
      answer: "Yes, once you own an NFT, you can list it for sale again. Navigate to your 'Dashboard', find the NFT under 'Owned NFTs', and click 'List for Sale' to start a new auction."
    },
    {
      question: "What currencies can I use on Zenthra?",
      answer: "Zenthra currently uses LSK (Lisk's native token) for all transactions. In the future, we plan to support additional cryptocurrencies and stablecoins."
    }
  ];

  const walletFAQs = [
    {
      question: "Which wallets are supported?",
      answer: "Zenthra supports most popular Web3 wallets including MetaMask, Coinbase Wallet, WalletConnect, and Trust Wallet."
    },
    {
      question: "How do I switch networks?",
      answer: "You can switch between Lisk Mainnet and Testnet using the network selector in the top navigation bar. Make sure your wallet is configured to work with the selected network."
    },
    {
      question: "Is my wallet information safe?",
      answer: "Zenthra never stores your private keys or seed phrases. We only interact with your wallet through standard Web3 connection protocols when you explicitly approve transactions."
    },
    {
      question: "What if I disconnect my wallet?",
      answer: "If you disconnect your wallet, you'll need to reconnect it to place bids or create NFTs. Your account information and NFTs are stored on the blockchain and will be accessible when you reconnect."
    }
  ];

  return (
    <div>
      <FAQSection title="General Questions" questions={generalFAQs} />
      <FAQSection title="For Creators" questions={creatorFAQs} />
      <FAQSection title="For Collectors" questions={collectorFAQs} />
      <FAQSection title="Wallet & Connectivity" questions={walletFAQs} />
    </div>
  );
};

export default FaqAccordion;
