import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { products, shops } from '@/lib/data';
import ProductCard from '@/components/product-card';
import ShopCard from '@/components/shop-card';
import RecommendedForYou from '@/components/home/recommended-for-you';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Link from 'next/link';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero");
  const trendingProducts = products.slice(0, 4);
  const nearbyShops = shops.slice(0, 3);

  return (
    <div className="space-y-12">
      <Card className="relative flex min-h-[400px] w-full flex-col items-start justify-center overflow-hidden rounded-2xl bg-primary/10 p-8 md:p-12">
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-top"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 max-w-2xl rounded-lg bg-background/80 p-6 backdrop-blur-sm">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl">
            DISCLOSE
          </h1>
          <p className="mt-4 max-w-lg text-lg text-foreground">
            Your clothes, up close. Discover the best local fashion right in your neighborhood.
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild size="lg">
              <Link href="/shops">Explore Shops</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/search">Find Apparel</Link>
            </Button>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="font-headline text-3xl font-bold">Recommended For You</h2>
        <p className="text-muted-foreground">AI-powered picks based on your style.</p>
        <RecommendedForYou />
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold">Trending Now</h2>
        <p className="text-muted-foreground">See what's popular in your area.</p>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="font-headline text-3xl font-bold">Nearby Shops</h2>
         <p className="text-muted-foreground">Explore boutiques and stores just around the corner.</p>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nearbyShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </section>
    </div>
  );
}
