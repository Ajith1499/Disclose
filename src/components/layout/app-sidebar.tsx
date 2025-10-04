'use client';
import Link from 'next/link';
import {
  AreaChart,
  Heart,
  Home,
  Package2,
  Search,
  Store,
  Wallet,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { findImageById, users } from '@/lib/data';
import NavLink from './nav-link';

export default function AppSidebar() {
  const user = users[0];
  const avatar = findImageById(user.avatarId);

  return (
    <div className="hidden border-r bg-card md:flex md:flex-col md:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl">LocalThreads</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <NavLink href="/">
              <Home className="h-4 w-4" />
              Home
            </NavLink>
            <NavLink href="/search">
              <Search className="h-4 w-4" />
              Search
            </NavLink>
            <NavLink href="/shops">
              <Store className="h-4 w-4" />
              Shops
            </NavLink>
            <NavLink href="/wishlist">
              <Heart className="h-4 w-4" />
              Wishlist
            </NavLink>
            <NavLink href="/wallet">
              <Wallet className="h-4 w-4" />
              Wallet
            </NavLink>
            <NavLink href="/dashboard/analytics">
                <AreaChart className="h-4 w-4" />
                Analytics
            </NavLink>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 p-4">
               <Avatar className="h-10 w-10 border">
                {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='w-full overflow-hidden'>
                <CardTitle className="text-base truncate">{user.name}</CardTitle>
                <CardDescription className="text-xs">Premium Member</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
