import React, { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  const isHomePage = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = useCallback((lng) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  const languages = useMemo(() => [
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
  ], []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-b-3xl ${
      isScrolled || !isHomePage 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <h1 className={`text-xl font-bold transition-colors ${
              isScrolled || !isHomePage
                ? 'bg-gradient-to-r from-[#F4C2C2] via-[#D4AF76] to-[#8B6F8E] bg-clip-text text-transparent' 
                : 'text-white drop-shadow-lg'
            }`} style={{ fontFamily: 'Playfair Display, serif' }}>
              Fabulous Nails & Spa
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`transition-colors ${
              isScrolled || !isHomePage 
                ? 'text-[#3E3E3E] hover:text-[#8B6F8E]' 
                : 'text-white hover:text-[#F4C2C2]'
            }`} data-testid="nav-home">
              {t('nav.home')}
            </Link>
            <Link to="/services" className={`transition-colors ${
              isScrolled || !isHomePage 
                ? 'text-[#3E3E3E] hover:text-[#8B6F8E]' 
                : 'text-white hover:text-[#F4C2C2]'
            }`} data-testid="nav-services">
              {t('nav.services')}
            </Link>
            <Link to="/gallery" className={`transition-colors ${
              isScrolled || !isHomePage 
                ? 'text-[#3E3E3E] hover:text-[#8B6F8E]' 
                : 'text-white hover:text-[#F4C2C2]'
            }`} data-testid="nav-gallery">
              {t('nav.gallery')}
            </Link>
            <Link to="/about" className={`transition-colors ${
              isScrolled || !isHomePage 
                ? 'text-[#3E3E3E] hover:text-[#8B6F8E]' 
                : 'text-white hover:text-[#F4C2C2]'
            }`} data-testid="nav-about">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className={`transition-colors ${
              isScrolled || !isHomePage 
                ? 'text-[#3E3E3E] hover:text-[#8B6F8E]' 
                : 'text-white hover:text-[#F4C2C2]'
            }`} data-testid="nav-contact">
              {t('nav.contact')}
            </Link>
            <Link to="/booking" data-testid="nav-booking">
              <Button className="bg-gradient-to-r from-[#F4C2C2] to-[#D4AF76] hover:opacity-90 text-white rounded-full px-6">
                {t('nav.booking')}
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="language-switcher" className={
                  isScrolled || !isHomePage 
                    ? 'text-[#3E3E3E]' 
                    : 'text-white'
                }>
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent data-testid="language-menu">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    data-testid={`lang-${lang.code}`}
                    className={i18n.language === lang.code ? 'bg-[#F8E6E9]' : ''}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="mobile-language-switcher" className={
                  isScrolled || !isHomePage 
                    ? 'text-[#3E3E3E]' 
                    : 'text-white'
                }>
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    data-testid={`mobile-lang-${lang.code}`}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
              className={
                isScrolled || !isHomePage 
                  ? 'text-[#3E3E3E]' 
                  : 'text-white'
              }
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 bg-white/95 backdrop-blur-sm" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-[#3E3E3E] hover:text-[#8B6F8E] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-home"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/services"
                className="text-[#3E3E3E] hover:text-[#8B6F8E] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-services"
              >
                {t('nav.services')}
              </Link>
              <Link
                to="/gallery"
                className="text-[#3E3E3E] hover:text-[#8B6F8E] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-gallery"
              >
                {t('nav.gallery')}
              </Link>
              <Link
                to="/about"
                className="text-[#3E3E3E] hover:text-[#8B6F8E] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-about"
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/contact"
                className="text-[#3E3E3E] hover:text-[#8B6F8E] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-contact"
              >
                {t('nav.contact')}
              </Link>
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-booking"
              >
                <Button className="bg-gradient-to-r from-[#F4C2C2] to-[#D4AF76] hover:opacity-90 text-white rounded-full w-full">
                  {t('nav.booking')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
