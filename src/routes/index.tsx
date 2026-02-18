import { useState, useMemo, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { ShopSidebar } from '@/features/shop/ShopSidebar'
import { FilterBar, type SortOption } from '@/features/shop/FilterBar'
import { MOCK_PRODUCTS } from '../api/products'
import { ProductCard } from '@/features/shop/ProductCard'
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
} from "@/components/ui/sheet"

export const Route = createFileRoute('/')({
  component: ShopPage,
})

function ShopPage () {
  const [activeTab, setActiveTab] = useState('All shops');
  const [sortOrder, setSortOrder] = useState<SortOption>(null);
  const categories = ['Women', 'Men', 'Unisex', 'Children', 'New'];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleCategoryClick = (category: string) => {
    if (activeTab === category) {
      setActiveTab('All shops');
    } else  {
      setActiveTab(category);
    }
  };

  const sortedProducts = useMemo(() => {
    const products = [...MOCK_PRODUCTS];

    if(sortOrder === 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [sortOrder]);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50/50">
      <div className="shrink-0 bg-white border-b border-slate-100 px-4 lg:px-0 lg:pl-[50px] lg:pr-8">
        
        <div className="md:hidden py-3">
          <Select value={activeTab} onValueChange={setActiveTab}>
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
             {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button 
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={cn(
                        "px-8 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-brand hover:text-white",
                        isActive ? "bg-brand text-white" : "bg-white text-slate-600"
                    )}
                  >
                    {cat}
                  </button>
                )
             })}
           </div>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden w-full px-4 lg:px-0 lg:pl-[50px]">
        <aside className="hidden lg:block w-64 shrink-0 py-6 pr-8 overflow-y-auto h-full scrollbar-thin">
           <ShopSidebar />
        </aside>

        <main className="flex-1 h-full flex flex-col min-w-0">
          <div className="shrink-0 pt-6 lg:pr-[110px]">
            <div className="flex items-center gap-3 mb-4 text-xs text-[#333333]">
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 px-2 gap-2 bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                      <Menu className="w-3.5 h-3.5" />
                      Categories
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    side="left" 
                    className="w-[300px] sm:w-[350px] overflow-y-auto bg-brand border-none shadow-none text-white [&>button]:text-white [&>button]:hover:text-white/80"
                  >
                  <div className="mb-6 text-left mt-4 pl-5">
                      <h2 className="hidden lg:block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                          Categories
                      </h2>
                  </div>
                  <ShopSidebar />
                  </SheetContent>
                </Sheet>
              </div>
              <div className="flex items-center">
                Home 
                <ChevronRight className="mx-1 w-3 h-3 text-[#333333]" strokeWidth={2} /> 
                <span className="text-[#FF2D55] font-bold">{activeTab}</span>
              </div>
            </div>
            <FilterBar 
              currentSort={sortOrder}
              onSortChange={setSortOrder}
            />
          </div>

          <div className="flex-1 overflow-y-auto pb-20 pr-2 lg:pr-[110px] scroll-smooth">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
              {sortedProducts.map(product => (
                  <ProductCard key={`${product.id}-copy`} product={{...product, id: product.id + 100}} />
              ))}
              {sortedProducts.map(product => (
                  <ProductCard key={`${product.id}-copy2`} product={{...product, id: product.id + 200}} />
              ))}
                {sortedProducts.map(product => (
                  <ProductCard key={`${product.id}-copy3`} product={{...product, id: product.id + 300}} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}