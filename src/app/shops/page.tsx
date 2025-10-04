'use client';
import ShopCard from "@/components/shop-card";
import { Input } from "@/components/ui/input";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Search } from "lucide-react";

export default function ShopsPage() {
  const { firestore } = useFirebase();

  const shopsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'shops');
  }, [firestore]);

  const { data: shops } = useCollection(shopsQuery);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">Explore Shops</h1>
        <p className="mt-2 text-muted-foreground">Find the perfect boutique for your style.</p>
      </div>

       <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by store name or place..." className="pl-10" />
        </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shops?.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}
