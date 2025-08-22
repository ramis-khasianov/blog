import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";
import { Menu } from "lucide-react";
import SiteLogo from "./SiteLogo";
import MobileNavLinks from "./MobileNavLinks";

const MobileNavigation = async () => {
  const session = await auth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-[1.5rem] " />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-light-900 dark:bg-dark-200 border-none px-6 pt-6"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <SiteLogo />

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <MobileNavLinks />
            </section>
          </SheetClose>
          {!session?.user && (
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <Button
                    variant="secondary"
                    className="w-full px-4 py-3 shadow-none"
                  >
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={ROUTES.SIGN_UP}>
                  <Button
                    variant="default"
                    className="w-full px-4 py-3 shadow-none"
                  >
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
