import { motion } from 'framer-motion';
import { Zap, Moon, Sun, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import LiveIndicator from './LiveIndicator';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  lastUpdated: Date;
}

const Header = ({ isDark, onToggleTheme, lastUpdated }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/50"
      style={{
        background: isDark
          ? 'linear-gradient(to bottom, hsl(240 20% 7% / 0.95), hsl(240 20% 7% / 0.8))'
          : 'linear-gradient(to bottom, hsl(0 0% 100% / 0.95), hsl(0 0% 100% / 0.8))'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <motion.div
                className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-30 blur-lg"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight gradient-text">
                AI Pulse Today
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                By Mohit Singh | Dubai, UAE 🇦🇪
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <LiveIndicator lastUpdated={lastUpdated} />

            {/* Search */}
            <motion.div
              className={`relative transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10'}`}
            >
              {isSearchOpen ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 glass-card px-3 py-2"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search AI news..."
                    className="bg-transparent border-none outline-none text-sm flex-1 text-foreground placeholder:text-muted-foreground"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Search className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </motion.div>

            {/* Theme Toggle */}
            <motion.button
              onClick={onToggleTheme}
              className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gold" />
              ) : (
                <Moon className="w-5 h-5 text-cyber-purple" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-border/50"
          >
            <div className="flex flex-col gap-4">
              <LiveIndicator lastUpdated={lastUpdated} />
              <div className="flex items-center gap-3">
                <div className="flex-1 glass-card px-3 py-2 flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search AI news..."
                    className="bg-transparent border-none outline-none text-sm flex-1 text-foreground"
                  />
                </div>
                <button
                  onClick={onToggleTheme}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-gold" />
                  ) : (
                    <Moon className="w-5 h-5 text-cyber-purple" />
                  )}
                </button>
              </div>
              <span className="text-xs text-muted-foreground">
                By Mohit Singh | Dubai, UAE 🇦🇪
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
