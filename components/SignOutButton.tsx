"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ROUTES from "@/constants/routes";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <Button
      className={cn("", className)}
      onClick={() => signOut({ redirectTo: ROUTES.HOME })}
    >
      Sign Out
    </Button>
  );
}
