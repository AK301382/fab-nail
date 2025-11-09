import React from 'react';

// Skeleton for Service Cards
export const ServiceCardSkeleton = () => (
  <div className="border-2 border-[#F8E6E9] rounded-lg p-6 animate-pulse">
    <div className="w-12 h-12 rounded-full bg-gray-200 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
    <div className="flex justify-between items-center mb-4">
      <div className="h-8 bg-gray-200 rounded w-24"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
    <div className="h-12 bg-gray-200 rounded-full w-full"></div>
  </div>
);

// Skeleton for Gallery Items
export const GalleryItemSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-64 rounded-lg mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
);

// Skeleton for Artist Cards
export const ArtistCardSkeleton = () => (
  <div className="text-center animate-pulse">
    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-4"></div>
    <div className="h-10 bg-gray-200 rounded-full w-40 mx-auto"></div>
  </div>
);

// Generic Grid Skeleton
export const GridSkeleton = ({ count = 6, SkeletonComponent }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonComponent key={i} />
    ))}
  </div>
);
