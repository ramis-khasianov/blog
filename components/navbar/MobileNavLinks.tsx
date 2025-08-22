"use client";

import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { navbarLinks } from "@/constants";

const MobileNavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {navbarLinks.map((navLink) => {
        const isActive = pathname === navLink.href;
        return (
          <SheetClose asChild key={navLink.id}>
            <Link
              href={navLink.href}
              className="data-[active=true]:hover:text-primary-500/90 data-[active=true]:text-primary-500 hover:text-primary-500 p-2 base-semibold transition-all outline-none "
            >
              {navLink.name}
              {isActive}
            </Link>
          </SheetClose>
        );
      })}
    </div>
  );
};

export default MobileNavLinks;
