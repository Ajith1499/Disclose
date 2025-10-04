'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection, useDoc, useFirebase, useMemoFirebase, useUser } from "@/firebase";
import { cn } from "@/lib/utils";
import { collection, doc } from "firebase/firestore";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function WalletPage() {
  const { firestore } = useFirebase();
  const { user } = useUser();

  // Assuming one wallet per user, with a known ID or the same as user ID
  const walletRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'wallets', user.uid);
  }, [firestore, user]);
  const { data: wallet } = useDoc(walletRef);

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'wallets', user.uid, 'transactions');
  }, [firestore, user]);
  const { data: transactions } = useCollection(transactionsQuery);

  const walletBalance = wallet?.balance ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">My Wallet</h1>
        <p className="mt-2 text-muted-foreground">Manage your balance, cashback, and transactions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Current Balance</CardDescription>
            <CardTitle className="text-4xl">${walletBalance.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Add Funds</Button>
          </CardContent>
        </Card>
        <Card className="bg-primary/5">
          <CardHeader>
            <CardDescription>Total Cashback Earned</CardDescription>
            <CardTitle className="text-4xl text-primary">$50.00</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Cashback cannot be withdrawn to a bank account.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A record of your recent wallet activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                       <span className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-muted", t.type === 'cashback' || t.type === 'return' ? 'text-green-600' : 'text-red-600' )}>
                        {t.type === 'cashback' || t.type === 'return' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </span>
                      <span className="font-medium">{t.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{new Date(t.date).toLocaleDateString()}</TableCell>
                  <TableCell className={cn("text-right font-mono", t.type === 'cashback' || t.type === 'return' ? 'text-green-600' : 'text-red-600')}>
                    {t.type === 'cashback' || t.type === 'return' ? '+' : '-'}${t.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
