import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { ShopSidebar } from '@/features/shop/ShopSidebar'
import { FilterBar } from '@/features/shop/FilterBar'
import { MOCK_PRODUCTS } from '../api/products'
import { ProductCard } from '@/features/shop/ProductCard'
import { ChevronRight } from 'lucide-react'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

export const Route = createFileRoute('/')({
  component: ShopPage,
})

function ShopPage () {
  const [activeTab, setActiveTab] = useState('All shops');
  const categories = ['Women', 'Men', 'Unisex', 'Children', 'New'];

  const handleCategoryClick = (category: string) => {
    if (activeTab === category) {
      setActiveTab('All shops');
    } else  {
      setActiveTab(category);
    }
  };

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
                <div className="flex text-xs text-[#333333] mb-4">
                    Home <ChevronRight className="mx-1 w-4 h-4 text-[#333333]" strokeWidth={2} /> <span className="text-[#FF2D55] font-bold">{activeTab}</span>
                </div>
                <FilterBar />
            </div>

            <div className="flex-1 overflow-y-auto pb-20 pr-2 lg:pr-[110px] scroll-smooth">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {MOCK_PRODUCTS.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {MOCK_PRODUCTS.map(product => (
                        <ProductCard key={`${product.id}-copy`} product={{...product, id: product.id + 100}} />
                    ))}
                    {MOCK_PRODUCTS.map(product => (
                        <ProductCard key={`${product.id}-copy2`} product={{...product, id: product.id + 200}} />
                    ))}
                     {MOCK_PRODUCTS.map(product => (
                        <ProductCard key={`${product.id}-copy3`} product={{...product, id: product.id + 300}} />
                    ))}
                </div>
            </div>
        </main>
      </div>
    </div>
  )
}