"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FilePenLine, Github, Linkedin, PanelsTopLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: <PanelsTopLeft className="h-4 w-4" /> },
    { href: "/cover-letter-generator", label: "Cover Letter AI", icon: <FilePenLine className="h-4 w-4" /> },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-t-2 border-b-2 border-primary bg-gray-800 text-background">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <PanelsTopLeft className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Nextfolio
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-background/80",
                  pathname === link.href ? "text-background" : "text-background/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
             <Link href="/" className="flex items-center space-x-2">
              <PanelsTopLeft className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">
                Nextfolio
              </span>
            </Link>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="hover:bg-gray-700 hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-gray-700 hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
