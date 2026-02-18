import { useState, useEffect, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { ShopSidebar } from '@/features/shop/components/ShopSidebar'
import { FilterBar, type SortOption } from '@/features/shop/components/FilterBar'
import { ProductCard } from '@/features/shop/components/ProductCard'
import { shopApi } from '@/features/shop/api'
import { ChevronRight, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

export const Route = createFileRoute('/')({
  component: ShopPage,
})

function ShopPage () {
  const [activeTab, setActiveTab] = useState('All shops');
  const [sortOrder, setSortOrder] = useState<SortOption>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ['Women', 'Men', 'Unisex', 'Children', 'New'];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products', activeTab, selectedCategory], 
    queryFn: async () => {
      if (selectedCategory) {
        return shopApi.getProductsByCategory(selectedCategory);
      }
      if (activeTab === 'All shops') return shopApi.getAllProducts();
      
      switch (activeTab) {
        case 'Women':
          return shopApi.getMultipleCategories([
            'womens-dresses', 
            'womens-shoes', 
            'womens-watches', 
            'womens-bags', 
            'womens-jewellery',
            'beauty',
            'skin-care',
          ]);
            
        case 'Men':
          return shopApi.getMultipleCategories([
            'mens-shirts', 
            'mens-shoes', 
            'mens-watches'
          ]);   
            
        case 'Children':
          return shopApi.getMultipleCategories(['eyewear','sunglasses']);   
            
        case 'Unisex':
          return shopApi.getMultipleCategories([
            'sunglasses',
            'fragrances',
            'skin-care'
          ]);

        case 'New': {
          const all = await shopApi.getAllProducts();
          return all.reverse().slice(0, 20);
        }

        default:
          return shopApi.getProductsByCategory(activeTab.toLowerCase());
      }
    },
  });

  const handleTabClick = (category: string) => {
    const nextTab = activeTab === category ? 'All shops' : category;
    setActiveTab(nextTab);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);
    setIsMobileMenuOpen(false);
  };

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    const result = [...products];

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, sortOrder]);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isError) return <div className="p-10 text-center text-red-500 font-bold">Error loading products.</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50/50">
      <div className="shrink-0 bg-white border-b border-slate-100 px-4 lg:px-0 lg:pl-[50px] lg:pr-8">

        <div className="md:hidden py-3">
          <Select value={activeTab} onValueChange={(val) => { setActiveTab(val); setSelectedCategory(null); }}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200 rounded-lg font-medium text-slate-700">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All shops">Shop All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden md:flex py-4 justify-center">
           <div className="inline-flex border border-slate-200 rounded-full divide-x divide-slate-200 overflow-hidden bg-white shadow-sm">
             {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => handleTabClick(cat)}
                  className={cn(
                      "px-8 py-2.5 text-sm font-medium transition-colors hover:bg-brand hover:text-white",
                      activeTab === cat ? "bg-brand text-white" : "text-slate-600"
                  )}
                >
                  {cat}
                </button>
             ))}
           </div>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden w-full px-4 lg:px-0 lg:pl-[50px]">
        <aside className="hidden lg:block w-64 shrink-0 py-6 pr-8 overflow-y-auto h-full scrollbar-thin">
           <ShopSidebar 
             onCategorySelect={handleCategorySelect} 
             selectedCategory={selectedCategory} 
           />
        </aside>

        <main className="flex-1 h-full flex flex-col min-w-0">
          <div className="shrink-0 pt-6 lg:pr-[110px]">
            <div className="flex items-center gap-3 mb-4 text-xs text-[#333333]">
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 px-2 gap-2 bg-white border-slate-200 text-slate-700">
                      <Menu className="w-3.5 h-3.5" />
                      Categories
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    side="left" 
                    className="w-[300px] sm:w-[350px] overflow-y-auto bg-brand border-none text-white [&>button]:text-white"
                  >
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <div className="mb-6 text-left mt-4 pl-5">
                    </div>
                    <ShopSidebar 
                      onCategorySelect={handleCategorySelect} 
                      selectedCategory={selectedCategory} 
                    />
                  </SheetContent>
                </Sheet>
              </div>
              <div className="flex items-center">
                Home 
                <ChevronRight className="mx-1 w-3 h-3" strokeWidth={2} /> 
                <span className="text-[#FF2D55] font-bold">
                  {selectedCategory ? selectedCategory.replace(/-/g, ' ') : activeTab}
                </span>
              </div>
            </div>
            <FilterBar 
              currentSort={sortOrder}
              onSortChange={setSortOrder}
            />
          </div>

          <div className="flex-1 overflow-y-auto pb-20 pr-2 lg:pr-[110px] scroll-smooth">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-4 animate-pulse">
                            <div className="aspect-[3/4] bg-slate-200 rounded-2xl" />
                            <div className="h-4 bg-slate-200 rounded w-3/4" />
                            <div className="h-4 bg-slate-200 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {sortedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                  ))}
                  {sortedProducts.length === 0 && (
                    <div className="col-span-full text-center py-20 text-slate-400">
                      No products found in this category.
                    </div>
                  )}
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}