import { motion } from 'framer-motion';
import { Zap, Heart, Mail, Twitter, Linkedin, Github, MapPin, Globe } from 'lucide-react';
import { sources } from '@/data/mockArticles';

const Footer = () => {
  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Content Policy', href: '#' },
    { label: 'DMCA', href: '#' },
    { label: 'Contact', href: 'mailto:contact@aipulsetoday.com' },
  ];

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-20 border-t border-border/50"
      style={{
        background: 'linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background-secondary)))'
      }}
    >
      {/* Sources Marquee */}
      <div className="py-6 border-b border-border/30 overflow-hidden">
        <div className="container mx-auto px-4 mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-primary" />
            <span className="font-medium">SOURCES</span>
          </div>
        </div>
        <div className="relative">
          <motion.div
            className="flex gap-4 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...sources, ...sources].map((source, i) => (
              <span
                key={`${source}-${i}`}
                className="px-4 py-2 rounded-lg bg-muted/30 text-sm text-muted-foreground"
              >
                {source}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">AI Pulse Today</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your real-time window to AI innovation. We aggregate and curate the most impactful AI and machine learning news from 50+ trusted sources.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Dubai, UAE 🇦🇪</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Daily AI Digest
            </h3>
            <p className="text-sm text-muted-foreground">
              Get the top 10 AI stories delivered to your inbox every morning.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <motion.button
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>

          {/* Social & Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-2">
                Content owner? Request removal:
              </p>
              <a href="mailto:dmca@aipulsetoday.com" className="text-sm text-primary hover:underline">
                dmca@aipulsetoday.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>© 2024 AI Pulse Today. Crafted with</span>
              <Heart className="w-4 h-4 text-coral fill-coral" />
              <span>by</span>
              <span className="font-medium text-foreground">Mohit Singh</span>
              <span>in Dubai</span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            All content is attributed to original creators. We do not claim ownership of any external content.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
