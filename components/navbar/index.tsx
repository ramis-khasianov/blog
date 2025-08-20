import Link from "next/link";
import { auth } from "@/auth";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";
import AuthButtons from "./AuthButtons";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center bg-light-900 dark:bg-dark-200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 px-6">
      <Link href="/" className="flex items-center gap-1">
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
          Raports <span className="text-primary-gradient">Blog</span>
        </p>
      </Link>

      <div className="flex flex-between gap-2">
        <ThemeToggle />
        {session?.user ? <UserProfile session={session} /> : <AuthButtons />}
      </div>
    </nav>
  );
};

export default Navbar;
