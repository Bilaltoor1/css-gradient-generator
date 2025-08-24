import { Suspense } from "react";
import { GRADIENT_CATEGORIES } from '@/data/categories';
import { getAllGradients, getGradientsByCategory } from '@/lib/mdx';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import ClientGradientSection from './components/ClientGradientSection';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params.category || 'all';
  
  return {
    title: category === 'all' ? 'Explore Gradients - Color Palette Generator' : `${category} Gradients - Color Palette Generator`,
    description: `Discover beautiful ${category === 'all' ? '' : category + ' '}CSS gradients for your design projects. Copy CSS code and create stunning backgrounds.`,
  };
}

// Server-side data fetching from MDX files with pagination
async function getGradients(searchParams) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const limit = parseInt(params.limit || '24'); // Increased for better pagination
  const sort = params.sort || 'newest';
  const category = params.category || 'all';
  
  const skip = (page - 1) * limit;
  
  try {
    // Get gradients from MDX files
    let items = category === 'all' ? 
      getAllGradients() : 
      getGradientsByCategory(category);
    
    // Sort items
    if (sort === 'oldest') {
      items = items.reverse();
    }
    
    const total = items.length;
    const paginatedItems = items.slice(skip, skip + limit);
    const hasMore = skip + paginatedItems.length < total;
    const totalPages = Math.ceil(total / limit);
    
    // Transform data to match expected format
    const transformedItems = paginatedItems.map(item => ({
      _id: item.slug,
      id: item.frontMatter.id,
      title: item.frontMatter.title,
      description: item.frontMatter.description,
      category: item.frontMatter.category,
      tags: item.frontMatter.tags || [],
      colors: item.frontMatter.colors || [],
      cssGradient: item.frontMatter.cssGradient,
      featured: item.frontMatter.featured || false,
      createdAt: item.frontMatter.createdAt,
      previewImage: item.frontMatter.previewImage,
      categories: [item.frontMatter.category] // For compatibility
    }));
    
    return {
      gradients: transformedItems,
      total,
      page,
      limit,
      hasMore,
      totalPages,
      sort,
      category
    };
  } catch (error) {
    console.error('Error fetching gradients:', error);
    return {
      gradients: [],
      total: 0,
      page: 1,
      limit: 24,
      hasMore: false,
      totalPages: 0,
      sort: 'newest',
      category: 'all'
    };
  }
}

// Pagination component
function Pagination({ currentPage, totalPages, category, sort }) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (sort && sort !== 'newest') params.set('sort', sort);
    if (page > 1) params.set('page', page.toString());
    
    const query = params.toString();
    return `/gradient/explore${query ? '?' + query : ''}`;
  };

  const pages = [];
  const showPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);
  
  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <a
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
        >
          Previous
        </a>
      )}
      
      {startPage > 1 && (
        <>
          <a
            href={getPageUrl(1)}
            className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
          >
            1
          </a>
          {startPage > 2 && <span className="px-2 text-muted-foreground">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <a
          key={page}
          href={getPageUrl(page)}
          className={`px-3 py-2 text-sm border rounded-md transition-colors ${
            page === currentPage
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:bg-muted'
          }`}
        >
          {page}
        </a>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-muted-foreground">...</span>}
          <a
            href={getPageUrl(totalPages)}
            className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
          >
            {totalPages}
          </a>
        </>
      )}
      
      {currentPage < totalPages && (
        <a
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
        >
          Next
        </a>
      )}
    </div>
  );
}

export default async function ExploreGradientsPage({ searchParams }) {
  const data = await getGradients(searchParams);
  const { gradients, hasMore, total, page, totalPages, sort, category } = data;
  const params = await searchParams;
  const selectedCategory = params.category || 'all';
  const currentSort = params.sort || 'newest';

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          categories={GRADIENT_CATEGORIES}
          currentSort={currentSort}
        />

        {gradients.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">No gradients found for this category</h3>
            <p className="text-sm text-muted-foreground mt-2">Try selecting a different category or clear the filter.</p>
          </div>
        ) : (
          <ClientGradientSection
            gradients={gradients}
            total={total}
            selectedCategory={selectedCategory}
            hasMore={hasMore}
            page={page}
            totalPages={totalPages}
            categories={GRADIENT_CATEGORIES}
            currentSort={currentSort}
          />
        )}
      </div>
    </div>
  );
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;