'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { trendingProductsSummary, TrendingProductsSummaryOutput } from '@/ai/flows/trending-products-summary';
import { Skeleton } from '../ui/skeleton';

export default function RegionalTrends() {
  const [region, setRegion] = useState('North America');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<TrendingProductsSummaryOutput | null>(null);

  const handleRegionChange = async (newRegion: string) => {
    setRegion(newRegion);
    setLoading(true);
    setSummary(null);
    try {
      const result = await trendingProductsSummary({ region: newRegion });
      setSummary(result);
    } catch (error) {
      console.error("Failed to fetch trending products summary:", error);
      // Optionally, set an error state to display to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Select value={region} onValueChange={handleRegionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="North America">North America</SelectItem>
          <SelectItem value="Europe">Europe</SelectItem>
          <SelectItem value="Asia">Asia</SelectItem>
        </SelectContent>
      </Select>

      <div className="mt-4 rounded-lg border bg-background p-4 min-h-[150px]">
        {loading && (
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        )}
        {summary && (
            <p className="text-sm text-foreground">{summary.summary}</p>
        )}
        {!loading && !summary && (
            <p className="text-sm text-muted-foreground text-center pt-8">Select a region to view AI-powered trends.</p>
        )}
      </div>
    </div>
  );
}
