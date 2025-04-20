import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, User, LogOut } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/use-auth';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const isLoggedIn = !!user;

  // Handle scroll event to change navigation style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // The redirect will be handled by the auth hook
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Problems', href: '/problems' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ];

  // Keep the array for footer links, but don't display in navigation


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0A0F1A]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 bg-[#007BFF] rounded-lg rotate-45 transform -translate-x-1 translate-y-1 opacity-60"></div>
                <div className="absolute inset-0 bg-[#00FFD1] rounded-lg opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-orbitron font-bold text-black text-lg">Q</span>
                </div>
              </div>
              <span className="font-orbitron font-bold text-xl text-white hidden sm:block">
                QUICK<span className="text-[#FF007F]">HACKER</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 font-orbitron text-sm transition-colors ${
                    location === link.href
                      ? 'text-[#00FFD1] border-b-2 border-[#00FFD1]'
                      : 'text-gray-300 hover:text-[#00FFD1]'
                  }`}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {isAdmin && (
                    <Link href="/admin">
                      <Button variant="ghost" className="text-[#FF007F] hover:text-[#FF007F] hover:bg-[#FF007F]/10">
                        ADMIN
                      </Button>
                    </Link>
                  )}
                  <Link href="/team-dashboard">
                    <Button variant="ghost" className="text-[#00FFD1] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10">
                      DASHBOARD
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-9 w-9 cursor-pointer border-2 border-[#00FFD1]/30 hover:border-[#00FFD1]/80 transition-colors">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#007BFF]/30 text-[#00FFD1]">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#0A0F1A] border border-[#00FFD1]/30">
                      <DropdownMenuLabel className="text-gray-300">{user?.name || 'My Account'}</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <Link href="/team-dashboard">
                        <DropdownMenuItem className="text-gray-300 hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] cursor-pointer">
                          Dashboard
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/profile">
                        <DropdownMenuItem className="text-gray-300 hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] cursor-pointer">
                          Profile Settings
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-gray-300 hover:bg-[#FF007F]/10 hover:text-[#FF007F] cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-[#00FFD1] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10">
                      LOGIN
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-[#007BFF] to-[#00FFD1] text-black font-bold hover:from-[#0066CC] hover:to-[#00CCAA]">
                      REGISTER
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#00FFD1]/10 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6 text-[#00FFD1]" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } transform transition-all duration-300 ease-in-out fixed top-20 right-0 bottom-0 w-72 bg-[#0A0F1A] border-l border-[#00FFD1]/20 overflow-auto z-50`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            {isLoggedIn && (
              <div className="mb-6 border-b border-gray-700 pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-[#00FFD1]/30">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#007BFF]/30 text-[#00FFD1]">
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-semibold">{user?.name || 'User'}</p>
                    <p className="text-gray-400 text-sm">{user?.email || 'No email'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/team-dashboard">
                    <Button variant="outline" size="sm" className="w-full border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-[#FF007F]/30 text-[#FF007F] hover:bg-[#FF007F]/10"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
            
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-orbitron ${
                  location === link.href
                    ? 'text-[#00FFD1] bg-[#00FFD1]/10'
                    : 'text-gray-300 hover:bg-[#00FFD1]/5 hover:text-[#00FFD1]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {!isLoggedIn && (
              <div className="pt-4 grid grid-cols-2 gap-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full border-[#007BFF]/30 text-[#007BFF] hover:bg-[#007BFF]/10">
                    LOGIN
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-gradient-to-r from-[#007BFF] to-[#00FFD1] text-black font-bold">
                    REGISTER
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Dark overlay when mobile menu is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Page content padding to account for fixed header */}
      <div className="h-20"></div>
    </>
  );
}