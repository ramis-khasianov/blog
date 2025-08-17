import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-light-900 dark:bg-dark-200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Raports <span className="text-primary-gradient">Blog</span>
        </p>
      </Link>

      <div className="flex-between gap-5">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
