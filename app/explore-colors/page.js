import { Suspense } from "react";
import { COLOR_CATEGORIES } from '@/data/color-categories';
import { getAllColorShades } from '@/lib/mdx';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import ColorGrid from './components/ColorGrid';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params.category || 'all';
  
  return {
    title: category === 'all' ? 'Explore Colors - Color Palette Generator' : `${category} Colors - Color Palette Generator`,
    description: `Discover beautiful ${category === 'all' ? '' : category + ' '}color shades for your design projects. Copy CSS code and create stunning color palettes.`,
  };
}

// Server-side data fetching from MDX files with pagination
async function getColors(searchParams) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const limit = parseInt(params.limit || '24');
  const sort = params.sort || 'newest';
  const category = params.category || 'all';
  
  const skip = (page - 1) * limit;
  
  try {
    // Get all color shades from MDX files
    const allItems = getAllColorShades();
    
    // First, flatten ALL shades from ALL MDX files into individual cards
    const allShadeCards = [];
    allItems.forEach(item => {
      const base = {
        slug: item.slug,
        category: item.frontMatter.category,
        tags: item.frontMatter.tags || [],
        featured: item.frontMatter.featured || false,
        createdAt: item.frontMatter.createdAt,
        previewImage: item.frontMatter.previewImage,
      };
      // Add the main color as a card
      allShadeCards.push({
        ...base,
        title: item.frontMatter.title,
        description: item.frontMatter.description,
        baseHex: item.frontMatter.baseHex,
        hex: item.frontMatter.hex || item.frontMatter.baseHex,
      });
      // Add each shade as a card
      (item.frontMatter.shades || []).forEach(shade => {
        allShadeCards.push({
          ...base,
          title: shade.name,
          description: shade.description,
          baseHex: shade.hex,
          hex: shade.hex,
        });
      });
    });
    
    // Filter by category if specified
    let filteredCards = allShadeCards;
    if (category && category !== 'all') {
      filteredCards = allShadeCards.filter(card => {
        const cardCategory = card.category?.toLowerCase();
        const cardTags = card.tags || [];
        const cardTitle = card.title?.toLowerCase() || '';
        
        return cardCategory === category || 
               cardTags.some(tag => tag.toLowerCase().includes(category)) ||
               cardTitle.toLowerCase().includes(category);
      });
    }
    
    // Sort cards
    filteredCards = filteredCards.sort((a, b) => {
      switch (sort) {
        case 'popular':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'name':
          return (a.title || '').localeCompare(b.title || '');
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    
    const total = filteredCards.length;
    const totalPages = Math.ceil(total / limit);
    const hasMore = skip + limit < total;
    
    // Paginate the flattened cards
    const paginatedCards = filteredCards.slice(skip, skip + limit);

    return {
      colors: paginatedCards,
      total,
      page,
      limit,
      hasMore,
      totalPages,
      sort,
      category
    };
  } catch (error) {
    console.error('Error fetching colors:', error);
    return {
      colors: [],
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
    return `/explore-colors${query ? '?' + query : ''}`;
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

export default async function ExploreColorsPage({ searchParams }) {
  const {
    colors,
    total,
    page,
    hasMore,
    totalPages,
    sort,
    category
  } = await getColors(searchParams);

  const params = await searchParams;
  const selectedCategory = params.category || 'all';
  const currentSort = params.sort || 'newest';

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          categories={COLOR_CATEGORIES}
          currentSort={currentSort}
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="text-center lg:text-left">
            <p className="text-muted-foreground">
              Showing {colors.length} of {total} colors
              {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
            </p>
          </div>
        </div>

        {colors.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">No colors found for this category</h3>
            <p className="text-sm text-muted-foreground mt-2">Try selecting a different category or clear the filter.</p>
          </div>
        ) : (
          <>
            <Suspense fallback={<div>Loading colors...</div>}>
              <ColorGrid 
                initialItems={colors}
                categories={COLOR_CATEGORIES}
              />
            </Suspense>
            
            <Pagination 
              currentPage={page}
              totalPages={totalPages}
              category={selectedCategory}
              sort={currentSort}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;
