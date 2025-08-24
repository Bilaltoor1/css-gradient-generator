"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function CategoryFilter({ selectedCategory, categories, currentSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    params.delete('page'); // Reset to first page
    
  const queryString = params.toString();
  router.push(`/explore-colors${queryString ? '?' + queryString : ''}`);
  };

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams);
    if (sort === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }
    params.delete('page'); // Reset to first page
    
  const queryString = params.toString();
  router.push(`/explore-colors${queryString ? '?' + queryString : ''}`);
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`transition-all ${
              selectedCategory === category.id
                ? ' text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Badge 
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className="cursor-pointer hover:scale-105 transition-transform"
              style={selectedCategory === category.id ? { backgroundColor: category.color } : {}}
            >
              {category.name}
            </Badge>
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Sort by:</span>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border border-border">
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
