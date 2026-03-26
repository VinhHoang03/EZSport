import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
export function AuthHero() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 lg:p-12 overflow-hidden bg-brand-navy">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1551773188-d4f40b30fc62?w=1200&q=80"
          alt="Sports Court"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 via-brand-navy/70 to-brand-navy/95" />
      </div>

      {/* Top Branding */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-16">
          <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CourtBook
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight max-w-lg">
          Book your perfect court in seconds
        </h1>
        <p className="text-lg text-white/80 mb-12 max-w-md leading-relaxed">
          Join thousands of players finding and reserving sports courts near
          them.
        </p>

        <div className="space-y-5">
          {[
          'Instant booking confirmation',
          'Courts in 50+ cities',
          'Free cancellation up to 24h'].
          map((feature, i) =>
          <div key={i} className="flex items-center gap-3 text-white/90">
              <CheckCircle2Icon className="w-5 h-5 text-brand-coral shrink-0" />
              <span className="font-medium">{feature}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Testimonial */}
      <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-md shadow-xl">
        <p className="text-white/90 italic mb-5 leading-relaxed">
          "CourtBook completely changed how I play tennis. No more calling clubs
          to check availability. I can book a court in 30 seconds from my
          phone."
        </p>
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
            alt="Sarah Jenkins"
            className="w-10 h-10 rounded-full border border-white/20 object-cover" />
          
          <div>
            <div className="text-white font-semibold text-sm">
              Sarah Jenkins
            </div>
            <div className="text-white/60 text-xs">Tennis Enthusiast</div>
          </div>
        </div>
      </div>
    </div>);

}