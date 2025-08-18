"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

const GoogleAuthForm = ({ className }: { className?: string }) => {
  const handleSignIn = async () => {
    try {
      await signIn("google", {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.log(error);

      toast("Sign-in Failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className={cn("", className)}
      onClick={() => handleSignIn()}
    >
      <Image
        src="/icons/google.svg"
        alt="Google Logo"
        width={20}
        height={20}
        className="invert-colors mr-1 object-contain"
      />
      <span>Log in with Google</span>
    </Button>
  );
};

export default GoogleAuthForm;
