
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqAccordion from '@/components/help/FaqAccordion';
import CommunityQA from '@/components/help/CommunityQA';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Help & Support Center</h1>
          
          <div className="relative mb-10">
            <Input
              type="search"
              placeholder="Search for answers..."
              className="w-full h-12 pl-12 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <Tabs defaultValue="faq">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
              <TabsTrigger value="community">Community Q&A</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq">
              <FaqAccordion />
            </TabsContent>
            
            <TabsContent value="community">
              <CommunityQA />
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 p-6 bg-zenthra-blue rounded-xl text-white text-center">
            <h2 className="text-xl font-bold mb-2">Still need help?</h2>
            <p className="mb-6 max-w-md mx-auto">
              Contact our support team for personalized assistance with your account, transactions, or technical issues.
            </p>
            <Button variant="outline" className="bg-white text-zenthra-blue hover:bg-white/90 hover:text-zenthra-blue/90">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
