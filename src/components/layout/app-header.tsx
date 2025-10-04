'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Heart,
  Home,
  Menu,
  Package2,
  Search,
  ShoppingBag,
  Store,
  Users,
  Wallet,
  AreaChart
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import NavLink from './nav-link';

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-card p-4">
          <nav className="grid gap-3 text-lg font-medium">
            <Link
              href="#"
              className="mb-4 flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl">LocalThreads</span>
            </Link>
            <NavLink href="/">
              <Home className="h-5 w-5" />
              Home
            </NavLink>
            <NavLink href="/search">
              <Search className="h-5 w-5" />
              Search
            </NavLink>
            <NavLink href="/shops">
              <Store className="h-5 w-5" />
              Shops
            </NavLink>
            <NavLink href="/wishlist">
              <Heart className="h-5 w-5" />
              Wishlist
            </NavLink>
            <NavLink href="/wallet">
              <Wallet className="h-5 w-5" />
              Wallet
            </NavLink>
            <NavLink href="/dashboard/analytics">
                <AreaChart className="h-5 w-5" />
                Analytics
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
       <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl">LocalThreads</span>
        </Link>
    </header>
  );
}
