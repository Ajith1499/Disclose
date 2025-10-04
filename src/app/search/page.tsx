'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, History } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    const updatedSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    // Here you would typically trigger the actual search logic
    console.log("Searching for:", searchTerm);
  };
  
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    // You might want to trigger a search directly here as well
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Find Your Style</h1>
        <p className="mt-4 text-muted-foreground text-lg">Search for clothes, stores, or places near you.</p>
      </div>

      <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="E.g., 'denim jacket', 'The Chic Boutique', 'Downtown'" 
            className="pl-10 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg">Search</Button>
      </form>

      {recentSearches.length > 0 && (
        <div className="mt-10">
          <h2 className="flex items-center gap-2 font-semibold text-muted-foreground">
            <History className="h-5 w-5" />
            Recent Searches
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {recentSearches.map((term, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="rounded-full"
                onClick={() => handleRecentSearchClick(term)}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
