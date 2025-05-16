
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const NetworkSelector = () => {
  const [network, setNetwork] = useState("Lisk Testnet");
  const { toast } = useToast();

  const networks = [
    { name: "Lisk Mainnet", value: "mainnet" },
    { name: "Lisk Testnet", value: "testnet" },
  ];

  const handleNetworkChange = (newNetwork: string) => {
    const selected = networks.find(n => n.value === newNetwork);
    if (selected) {
      setNetwork(selected.name);
      toast({
        title: "Network changed",
        description: `Switched to ${selected.name}`,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 text-xs">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          {network}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {networks.map((net) => (
          <DropdownMenuItem 
            key={net.value}
            onClick={() => handleNetworkChange(net.value)}
            className={network === net.name ? "bg-accent text-accent-foreground" : ""}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${net.value === 'mainnet' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            {net.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NetworkSelector;
