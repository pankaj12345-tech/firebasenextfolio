import { Github, Linkedin, PanelsTopLeft } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <PanelsTopLeft className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">&copy; {year} Nextfolio. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-gray-700 hover:text-white">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-gray-700 hover:text-white">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
