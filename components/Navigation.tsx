'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BarChart3, History, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Brain },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/history', label: 'History', icon: History },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <Brain className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GTM
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                      isActive 
                        ? "bg-blue-100 text-blue-600" 
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute left-0 top-full w-full bg-white/95 shadow-lg border-b border-white/30"
            >
              <div className="flex flex-col py-2 px-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      <div
                        className={cn(
                          "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium text-base">{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}