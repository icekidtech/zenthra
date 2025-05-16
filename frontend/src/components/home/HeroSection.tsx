
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-zenthra-blue">
      {/* Background Graphics */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-zenthra-purple/30 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-zenthra-coral/20 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-6 py-16 md:py-28 mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 flex flex-col mb-16 md:mb-0 md:items-start md:text-left items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-white">
            Discover, Collect, and Trade Extraordinary NFTs
          </h1>
          <p className="mb-8 text-lg text-zinc-300 max-w-lg">
            Zenthra is the premier marketplace for NFTs on the Lisk blockchain. Browse, buy, sell, and mint unique digital assets with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" asChild>
              <Link to="/explore">Explore NFTs</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white" asChild>
              <Link to="/create">Create NFT</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-12">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">25K+</p>
              <p className="text-sm text-zinc-300">NFTs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">12K+</p>
              <p className="text-sm text-zinc-300">Artists</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">8.5K+</p>
              <p className="text-sm text-zinc-300">Trades</p>
            </div>
          </div>
        </div>
        
        {/* Featured NFT */}
        <div className="md:w-1/2 md:pl-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-zenthra-purple/20 to-transparent rounded-xl animate-pulse-slow"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-square max-w-md mx-auto">
              <img 
                src="https://source.unsplash.com/random/800x800/?digital,art" 
                alt="Featured NFT" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white/90"></div>
                  <span className="text-sm text-white">@cryptoartist</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Ethereal Dimensions #117</h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-white/80">Current bid</p>
                  <p className="text-lg font-bold text-white">1,250 LSK</p>
                </div>
                <Button className="w-full mt-4">Place a Bid</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
