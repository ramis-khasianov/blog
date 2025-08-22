"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navbarLinks } from "@/constants";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {navbarLinks.map((navLink) => {
          const isActive = pathname === navLink.href;
          return (
            <NavigationMenuItem key={navLink.id}>
              <NavigationMenuLink asChild data-active={isActive}>
                <Link href={navLink.href}>{navLink.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
