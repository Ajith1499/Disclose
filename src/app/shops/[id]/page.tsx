'use client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import {
  findImageById,
} from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/product-card';
import { useCollection, useDoc, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, doc, query, where } from 'firebase/firestore';

export default function ShopDetailPage({ params }: { params: { id: string } }) {
  const { firestore } = useFirebase();

  const shopRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'shops', params.id);
  }, [firestore, params.id]);
  const { data: shop } = useDoc(shopRef);

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), where('shopId', '==', params.id));
  }, [firestore, params.id]);
  const { data: allProducts } = useCollection(productsQuery);

  const womenProductsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), where('shopId', '==', params.id), where('category', '==', 'Women'));
  }, [firestore, params.id]);
  const { data: womenProducts } = useCollection(womenProductsQuery);

  const menProductsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), where('shopId', '==', params.id), where('category', '==', 'Men'));
  }, [firestore, params.id]);
  const { data: menProducts } = useCollection(menProductsQuery);

  const kidsProductsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), where('shopId', '==', params.id), where('category', '==', 'Kids'));
  }, [firestore, params.id]);
  const { data: kidsProducts } = useCollection(kidsProductsQuery);

  if (!shop) {
    // This will be handled by loading state, or could show a not found component
    return null;
  }

  const shopImage = findImageById(shop.imageId);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="relative h-64 w-full md:h-96">
          {shopImage && (
            <Image
              src={shopImage.imageUrl}
              alt={shop.name}
              fill
              className="object-cover"
              data-ai-hint={shopImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="font-headline text-4xl font-bold text-white md:text-6xl">
              {shop.name}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-lg text-slate-200">
              <MapPin className="h-5 w-5" />
              {shop.location}
            </p>
          </div>
        </div>
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-muted-foreground">
            Welcome to {shop.name}. We offer a curated selection of the finest apparel. Browse our collections below.
          </p>
          <div className="flex shrink-0 gap-3">
            <Button>
              <Phone className="mr-2 h-4 w-4" /> Call Shop
            </Button>
            <Button variant="secondary">
              <MessageSquare className="mr-2 h-4 w-4" /> Chat Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-3xl font-bold">Our Collections</h2>
        <Tabs defaultValue="all" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="women">Women</TabsTrigger>
            <TabsTrigger value="men">Men</TabsTrigger>
            <TabsTrigger value="kids">Kids</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="all">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allProducts?.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
               {allProducts?.length === 0 && <p className='text-muted-foreground text-center py-8'>No products found in this collection.</p>}
            </TabsContent>
            <TabsContent value="women">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {womenProducts?.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              {womenProducts?.length === 0 && <p className='text-muted-foreground text-center py-8'>No products found in this collection.</p>}
            </TabsContent>
            <TabsContent value="men">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {menProducts?.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              {menProducts?.length === 0 && <p className='text-muted-foreground text-center py-8'>No products found in this collection.</p>}
            </TabsContent>
             <TabsContent value="kids">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {kidsProducts?.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              {kidsProducts?.length === 0 && <p className='text-muted-foreground text-center py-8'>No products found in this collection.</p>}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
