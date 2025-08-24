"use client";

import { Suspense } from "react";
import GradientControls from './GradientControls';
import GradientGrid from './GradientGrid';
import { GradientControlsProvider } from './GradientControlsContext';

export default function ClientGradientSection({ 
  gradients, 
  total, 
  selectedCategory, 
  hasMore, 
  page, 
  totalPages, 
  categories, 
  currentSort 
}) {
  return (
    <GradientControlsProvider>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          {/* Gradient Controls */}
        <Suspense fallback={<div>Loading controls...</div>}>
          <GradientControls />
        </Suspense>
        <div className="text-center lg:text-right">
          <p className="text-muted-foreground">
            Showing {gradients.length} of {total} gradients
            {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
          </p>
        </div>
        
      
      </div>

      <Suspense fallback={<div>Loading gradients...</div>}>
        <GradientGrid 
          initialItems={gradients}
          hasMore={hasMore}
          currentPage={page}
          totalPages={totalPages}
          total={total}
          categories={categories}
          selectedCategory={selectedCategory}
          currentSort={currentSort}
        />
      </Suspense>
    </GradientControlsProvider>
  );
}
