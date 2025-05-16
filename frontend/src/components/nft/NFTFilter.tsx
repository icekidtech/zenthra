
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface NFTFilterProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const NFTFilter = ({ onFilterChange, onSortChange }: NFTFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeSort, setActiveSort] = useState<string>("trending");
  
  const filters = [
    { label: "All", value: "all" },
    { label: "Art", value: "art" },
    { label: "Photography", value: "photography" },
    { label: "3D", value: "3d" },
    { label: "Music", value: "music" },
    { label: "Collectibles", value: "collectibles" }
  ];
  
  const sortOptions = [
    { label: "Trending", value: "trending" },
    { label: "Recent", value: "recent" },
    { label: "Ending Soon", value: "ending-soon" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" }
  ];

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    onFilterChange(value);
  };

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    onSortChange(value);
  };

  // Get label for current sort option
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === activeSort);
    return option ? option.label : "Sort";
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange(filter.value)}
            className="rounded-full"
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Sort: {getCurrentSortLabel()}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
              <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor"></path>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={activeSort === option.value ? "bg-accent text-accent-foreground" : ""}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NFTFilter;
