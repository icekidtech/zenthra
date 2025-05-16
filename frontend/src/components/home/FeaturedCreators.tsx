
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  totalSales: number;
}

const FeaturedCreators = () => {
  const creators: Creator[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      username: 'digital_dreamer',
      avatar: 'https://source.unsplash.com/random/400x400/?portrait,woman,1',
      verified: true,
      totalSales: 235
    },
    {
      id: '2',
      name: 'Marcus Chen',
      username: 'nft_master',
      avatar: 'https://source.unsplash.com/random/400x400/?portrait,man,1',
      verified: true,
      totalSales: 189
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      username: 'crypto_artist',
      avatar: 'https://source.unsplash.com/random/400x400/?portrait,woman,2',
      verified: false,
      totalSales: 156
    },
    {
      id: '4',
      name: 'David Kim',
      username: 'pixel_pioneer',
      avatar: 'https://source.unsplash.com/random/400x400/?portrait,man,2',
      verified: true,
      totalSales: 142
    },
    {
      id: '5',
      name: 'Ava Williams',
      username: 'art_innovator',
      avatar: 'https://source.unsplash.com/random/400x400/?portrait,woman,3',
      verified: false,
      totalSales: 112
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Creators</h2>
          <Link to="/creators" className="text-sm font-medium text-zenthra-purple hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {creators.map((creator, index) => (
            <Link to={`/creator/${creator.id}`} key={creator.id}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {creator.verified && (
                      <span className="absolute bottom-3 right-0 bg-zenthra-purple text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">@{creator.username}</p>
                    <span className="text-sm font-medium text-zenthra-slate-700 dark:text-zenthra-slate-300">
                      {creator.totalSales.toLocaleString()} sales
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreators;
