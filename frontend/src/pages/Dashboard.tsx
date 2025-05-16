
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  // Mock user data
  const user = {
    username: "crypto_collector",
    avatarUrl: "https://source.unsplash.com/random/100x100/?portrait,1",
    totalNFTs: 12,
    totalBids: 28,
    totalSales: 5,
    walletBalance: 1825.75
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={user.avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, @{user.username}</h1>
              <p className="text-muted-foreground">Manage your NFTs and bids</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-zenthra-blue to-zenthra-purple text-white px-6 py-4 rounded-lg">
            <div className="text-sm opacity-80">Wallet Balance</div>
            <div className="text-xl font-bold">{user.walletBalance.toLocaleString()} LSK</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total NFTs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user.totalNFTs}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Active Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user.totalBids}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user.totalSales}</div>
            </CardContent>
          </Card>
        </div>
        
        <DashboardTabs />
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
