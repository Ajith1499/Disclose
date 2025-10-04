'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { getPersonalizedRecommendations, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-product-recommendations';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Mock user data for demonstration
const mockUserInput = {
  gender: 'Female',
  location: 'Springfield',
  ageRange: '25-34',
  browsingHistory: 'Viewed denim jackets, floral dresses, and leather boots.',
};

export default function RecommendedForYou() {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput['recommendations']>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const result = await getPersonalizedRecommendations(mockUserInput);
        // Ensure unique image URLs for better visualization with picsum
        const uniqueRecs = result.recommendations.map((rec, index) => ({
            ...rec,
            productImageUrl: `https://picsum.photos/seed/rec${index+1}/400/500`
        }));
        setRecommendations(uniqueRecs);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
       <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="w-full overflow-hidden rounded-lg">
            <AspectRatio ratio={4 / 5}>
                 <Skeleton className="h-full w-full" />
            </AspectRatio>
            <div className="p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4 mt-2" />
                <Skeleton className="h-5 w-1/3 mt-2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }
  
  if(recommendations.length === 0) return null;

  return (
    <div className="mt-4">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendations.map((rec, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Card className="group w-full overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-lg">
                    <CardContent className="p-0">
                        <AspectRatio ratio={4/5}>
                            <Image
                                src={rec.productImageUrl}
                                alt={rec.productName}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                                data-ai-hint="fashion apparel"
                            />
                        </AspectRatio>
                        <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                            <h3 className="font-semibold leading-tight">
                                <Link href="#" className="hover:text-primary">
                                {rec.productName}
                                </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{rec.productDescription}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <Heart className="h-4 w-4" />
                            <span className="sr-only">Add to wishlist</span>
                            </Button>
                        </div>
                        <p className="mt-2 font-semibold">Price on request</p>
                        </div>
                    </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
    </div>
  );
}
