import { auth } from "@/auth";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";
import NavLinks from "./NavLinks";
import MobileNavigation from "./MobileNavigation";
import SiteLogo from "./SiteLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center bg-light-900 dark:bg-dark-200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none px-6">
      <SiteLogo />
      <NavLinks />

      <div className="flex flex-between gap-8">
        {session?.user && (
          <Button variant="default" asChild>
            <Link href={"/new-post"}>New post</Link>
          </Button>
        )}

        <div className="flex flex-between gap-2">
          <ThemeToggle />
          {session?.user ? (
            <UserProfile session={session} />
          ) : (
            <div className=" items-center justify-center gap-2 ml-4 w-full hidden md:flex">
              <Link href={ROUTES.SIGN_IN}>
                <Button variant="secondary" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href={ROUTES.SIGN_UP}>
                <Button variant="default" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
          <MobileNavigation />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
