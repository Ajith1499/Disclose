import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { findImageById, Shop } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type ShopCardProps = {
  shop: Shop;
};

export default function ShopCard({ shop }: ShopCardProps) {
  const image = findImageById(shop.imageId);

  return (
    <Card className="group overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-lg">
       <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={shop.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                data-ai-hint={image.imageHint}
              />
            )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="font-headline text-xl">{shop.name}</CardTitle>
        <CardDescription>{shop.location}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
         <Button asChild className="w-full">
          <Link href={`/shops/${shop.id}`}>
            View Collections <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
