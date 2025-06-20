import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import logoPath from "@assets/SubConnect_1750191046422.png";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/how-it-works", label: "How It Works" },
  ];

  const aboutItems = [
    { path: "/about", label: "About Us", description: "Our mission and team" },
    { path: "/about/careers", label: "Careers", description: "Join our growing team" },
  ];

  const applicationItems = [
    { path: "/applications/contractors", label: "Contractors", description: "Post jobs and manage projects" },
    { path: "/applications/subcontractors", label: "Subcontractors", description: "Find work and build your profile" },
    { path: "/applications/reviews", label: "Reviews", description: "Rate and review project partners" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center cursor-pointer">
            <img 
              src={logoPath} 
              alt="SubConnect Logo" 
              className="h-10 w-auto mr-3"
            />
            <span className="text-2xl font-bold text-slate-900">SubConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            {/* Home Link */}
            <Link href="/">
              <span
                className={`text-base font-medium transition-colors duration-200 cursor-pointer ${
                  isActive("/")
                    ? "text-brand-blue"
                    : "text-slate-600 hover:text-brand-blue"
                }`}
              >
                Home
              </span>
            </Link>

            {/* About Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`text-base font-medium transition-colors duration-200 ${
                      location.startsWith("/about")
                        ? "text-brand-blue"
                        : "text-slate-600 hover:text-brand-blue"
                    }`}
                  >
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                      {aboutItems.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link href={item.path}>
                              <a
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                  isActive(item.path) && "bg-accent text-accent-foreground"
                                )}
                              >
                                <div className="text-sm font-medium leading-none">{item.label}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </a>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* How It Works Link */}
            <Link href="/how-it-works">
              <span
                className={`text-base font-medium transition-colors duration-200 cursor-pointer ${
                  isActive("/how-it-works")
                    ? "text-brand-blue"
                    : "text-slate-600 hover:text-brand-blue"
                }`}
              >
                How It Works
              </span>
            </Link>
            
            {/* Applications Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`text-base font-medium transition-colors duration-200 ${
                      location.startsWith("/applications")
                        ? "text-brand-blue"
                        : "text-slate-600 hover:text-brand-blue"
                    }`}
                  >
                    Applications
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                      {applicationItems.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link href={item.path}>
                              <a
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                  isActive(item.path) && "bg-accent text-accent-foreground"
                                )}
                              >
                                <div className="text-sm font-medium leading-none">{item.label}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </a>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Billing Link */}
            <Link href="/billing">
              <span
                className={`text-base font-medium transition-colors duration-200 cursor-pointer ${
                  isActive("/billing")
                    ? "text-brand-blue"
                    : "text-slate-600 hover:text-brand-blue"
                }`}
              >
                Billing
              </span>
            </Link>

            {/* Support Link */}
            <Link href="/support">
              <span
                className={`text-base font-medium transition-colors duration-200 cursor-pointer ${
                  isActive("/support")
                    ? "text-brand-blue"
                    : "text-slate-600 hover:text-brand-blue"
                }`}
              >
                Support
              </span>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Home Mobile Link */}
                  <Link href="/">
                    <span
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                        isActive("/")
                          ? "text-brand-blue bg-blue-50"
                          : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </span>
                  </Link>
                  
                  {/* About Mobile Menu */}
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-base font-medium text-slate-600">About</div>
                    {aboutItems.map((item) => (
                      <Link key={item.path} href={item.path}>
                        <span
                          className={`block px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                            isActive(item.path)
                              ? "text-brand-blue bg-blue-50"
                              : "text-slate-500 hover:text-brand-blue hover:bg-slate-50"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* How It Works Mobile Link */}
                  {navItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <span
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                          isActive(item.path)
                            ? "text-brand-blue bg-blue-50"
                            : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}

                  {/* Applications Mobile Menu */}
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-base font-medium text-slate-600">Applications</div>
                    {applicationItems.map((item) => (
                      <Link key={item.path} href={item.path}>
                        <span
                          className={`block px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                            isActive(item.path)
                              ? "text-brand-blue bg-blue-50"
                              : "text-slate-500 hover:text-brand-blue hover:bg-slate-50"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Billing Mobile Menu */}
                  <Link href="/billing">
                    <span
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                        isActive("/billing")
                          ? "text-brand-blue bg-blue-50"
                          : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Billing
                    </span>
                  </Link>

                  {/* Support Mobile Menu */}
                  <Link href="/support">
                    <span
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                        isActive("/support")
                          ? "text-brand-blue bg-blue-50"
                          : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Support
                    </span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
