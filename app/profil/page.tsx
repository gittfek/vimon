'use client';

import { useState, Suspense } from 'react';
import { useActionState } from '@/app/(login)/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Edit, Lock, Trash2 } from 'lucide-react';
import useSWR from 'swr';
import { User } from '@/lib/db/schema';
import { updateAccount, updatePassword, deleteAccount } from '@/app/(login)/actions';

const fetcher = (url: string) => fetch(url).then(res => res.json());

/* --------------------- Account Info --------------------- */
type AccountState = {
  name?: string;
  email?: string;
  error?: string;
  success?: string;
};

function AccountForm({ state }: { state: AccountState }) {
  const { data: user } = useSWR<User>('/api/customer/me', fetcher);

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="name" className="mb-2">Namn</Label>
        <Input
          id="name"
          name="name"
          defaultValue={state.name || user?.name || ''}
          placeholder="Ange namn"
          required
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">E-post</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={state.email || user?.email || ''}
          placeholder="Ange e-post"
          required
        />
      </div>
    </form>
  );
}

function AccountCard() {
  const [state, formAction, isPending] = useActionState<AccountState, FormData>(updateAccount, {});

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Kontouppgifter</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <Suspense fallback={<AccountForm state={state} />}>
            <AccountForm state={state} />
          </Suspense>
          {state.error && <p className="text-destructive">{state.error}</p>}
          {state.success && <p className="text-[hsl(var(--primary))]">{state.success}</p>}
          <Button
            type="submit"
            className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.9)] text-[hsl(var(--accent-foreground))]"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sparar...
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Spara ändringar
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/* --------------------- Password --------------------- */
type PasswordState = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  error?: string;
  success?: string;
};

function PasswordCard() {
  const [passwordState, passwordAction, isPasswordPending] = useActionState<PasswordState, FormData>(updatePassword, {});

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Lösenord</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={passwordAction}>
          <div>
            <Label htmlFor="current-password" className="mb-2">Nuvarande lösenord</Label>
            <Input
              id="current-password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              maxLength={100}
              defaultValue={passwordState.currentPassword}
            />
          </div>
          <div>
            <Label htmlFor="new-password" className="mb-2">Nytt lösenord</Label>
            <Input
              id="new-password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={100}
              defaultValue={passwordState.newPassword}
            />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="mb-2">Bekräfta nytt lösenord</Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              maxLength={100}
              defaultValue={passwordState.confirmPassword}
            />
          </div>
          {passwordState.error && <p className="text-destructive">{passwordState.error}</p>}
          {passwordState.success && <p className="text-[hsl(var(--primary))]">{passwordState.success}</p>}
          <Button
            type="submit"
            className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.9)] text-[hsl(var(--accent-foreground))]"
            disabled={isPasswordPending}
          >
            {isPasswordPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uppdaterar...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Uppdatera lösenord
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/* --------------------- Delete Account --------------------- */
type DeleteState = {
  password?: string;
  error?: string;
  success?: string;
};

function DeleteCard() {
  const [deleteState, deleteAction, isDeletePending] = useActionState<DeleteState, FormData>(deleteAccount, {});

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Radera konto</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Konto raderas permanent och kan inte återställas.
        </p>
        <form className="space-y-4" action={deleteAction}>
          <div>
            <Label htmlFor="delete-password" className="mb-2">Bekräfta lösenord</Label>
            <Input
              id="delete-password"
              name="password"
              type="password"
              required
              minLength={8}
              maxLength={100}
              defaultValue={deleteState.password}
            />
          </div>
          {deleteState.error && <p className="text-destructive">{deleteState.error}</p>}
          {deleteState.success && <p className="text-[hsl(var(--primary))]">{deleteState.success}</p>}
          <Button
            type="submit"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            disabled={isDeletePending}
          >
            {isDeletePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tar bort...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Radera konto
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/* --------------------- Main Page --------------------- */
export default function ProfilePage() {
  return (
    <section className="flex-1 p-4 lg:p-8 bg-background">
      <h1 className="text-lg lg:text-2xl font-medium text-foreground mb-6">
        Mitt konto
      </h1>

      <Suspense fallback={<AccountCard />}>
        <AccountCard />
      </Suspense>

      <PasswordCard />

      <DeleteCard />
    </section>
  );
}