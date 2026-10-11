'use client';

import React from 'react';

export const ServiceGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div
      role="status"
      aria-label="Loading services"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl border border-ivory-200 p-6 shadow-sm animate-pulse flex flex-col justify-between h-56"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-5 w-28 bg-ivory-200 rounded-full" />
              <div className="h-5 w-16 bg-gold/20 rounded-full" />
            </div>
            <div className="flex justify-between items-start gap-3 mb-3">
              <div className="h-6 w-3/5 bg-ivory-200 rounded-lg" />
              <div className="h-7 w-16 bg-cream-200 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-ivory-100 rounded" />
              <div className="h-3 w-4/5 bg-ivory-100 rounded" />
            </div>
          </div>
          <div className="pt-4 border-t border-ivory-100 flex justify-between items-center">
            <div className="h-4 w-20 bg-ivory-100 rounded" />
            <div className="h-8 w-24 bg-gold/25 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const SlotGridSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading available time slots"
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 p-1"
    >
      {Array.from({ length: 12 }).map((_, idx) => (
        <div
          key={idx}
          className="h-10 rounded-xl bg-ivory-200/80 border border-ivory-200 animate-pulse"
        />
      ))}
    </div>
  );
};

export const SectionSkeleton: React.FC<{ title?: string }> = ({ title = 'Loading section...' }) => {
  return (
    <div
      role="status"
      aria-label={title}
      className="py-24 bg-cream-50 border-t border-ivory-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center mb-12 space-y-3 animate-pulse">
          <div className="h-5 w-36 bg-gold/20 rounded-full mx-auto" />
          <div className="h-10 w-72 bg-ivory-200 rounded-xl mx-auto" />
          <div className="h-4 w-64 bg-ivory-100 rounded mx-auto" />
        </div>
        <ServiceGridSkeleton count={3} />
      </div>
    </div>
  );
};

