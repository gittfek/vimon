"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, User, Briefcase } from "lucide-react";
import { DropdownMenu, 
         DropdownMenuTrigger, 
         DropdownMenuContent, 
         DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import type { AppUser } from "@/types/user";


export function UserMenu({ user }: { user: AppUser }) {
    const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-8 h-8 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          {initial}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">

        <DropdownMenuItem asChild>
          <Link href="/profil" className="flex items-center gap-2">
            <User size={16} /> Min profil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/kundportal" className="flex items-center gap-2">
            <Briefcase size={16} /> Mina jobb
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <form action="/api/auth/signout" method="post" className="w-full">
            <button 
              type="submit" 
              className="flex items-center gap-2 text-[hsl(var(--destructive))] w-full"
            >
              <LogOut size={16} /> Logga ut
            </button>
          </form>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
