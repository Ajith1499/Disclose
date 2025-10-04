import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function WishlistPage() {
  const wishlistedProducts = products.slice(4, 8);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-4xl font-bold">My Wishlist</h1>
          <p className="mt-2 text-muted-foreground">Your curated collection of favorite items.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="default-wishlist">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default-wishlist">Default Wishlist</SelectItem>
              <SelectItem value="summer-vacation">Summer Vacation</SelectItem>
              <SelectItem value="work-attire">Work Attire</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
      </div>
      
      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-24 text-center">
            <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
            <p className="mt-2 text-muted-foreground">Start adding products you love!</p>
            <Button className="mt-4">Browse Products</Button>
        </div>
      )}
    </div>
  );
}
