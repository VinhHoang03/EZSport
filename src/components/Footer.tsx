import React from 'react';
import { motion } from 'framer-motion';
export function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-xl font-bold text-brand-navy tracking-tight">
                CourtBook
              </span>
            </div>
            <p className="text-brand-slate mb-6 max-w-sm leading-relaxed">
              The easiest way to find and book sports facilities near you. Play
              more, search less.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholders */}
              {['Twitter', 'Instagram', 'Facebook'].map((social) =>
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-brand-offWhite flex items-center justify-center text-brand-slate hover:bg-brand-coral hover:text-white transition-colors"
                aria-label={social}>
                
                  <div className="w-4 h-4 bg-current rounded-sm" />
                </a>
              )}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-brand-navy mb-6">Explore</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Find a Court
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Tournaments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Cities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-navy mb-6">Hosting</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  List your Court
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Host Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Community Forum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Trust & Safety
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-navy mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-slate hover:text-brand-coral transition-colors">
                  
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-slate text-sm">
            © {new Date().getFullYear()} CourtBook, Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-brand-slate hover:text-brand-navy transition-colors">
              
              Privacy
            </a>
            <a
              href="#"
              className="text-brand-slate hover:text-brand-navy transition-colors">
              
              Terms
            </a>
            <a
              href="#"
              className="text-brand-slate hover:text-brand-navy transition-colors">
              
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>);

}