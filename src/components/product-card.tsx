import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { findImageById, Product } from '@/lib/data';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = findImageById(product.imageId);

  return (
    <Card className="group w-full overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <AspectRatio ratio={4 / 5}>
           {image && (
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
          )}
        </AspectRatio>
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold leading-tight">
                <Link href="#" className="hover:text-primary">
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
