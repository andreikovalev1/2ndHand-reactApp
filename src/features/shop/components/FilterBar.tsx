import { useState } from 'react'
import { X, Tag } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { FilterPopover } from './FilterPopover'
import { cn } from '@/lib/utils'

// Конфигурацию можно оставить здесь или вынести в отдельный файл constants.ts
const FILTER_OPTIONS: Record<string, string[]> = {
  Color: ['Black', 'White', 'Red', 'Blue', 'Green', 'Beige', 'Multicolor'],
  Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40'],
  Brand: ['Adidas', 'Nike', 'Zara', 'H&M', 'Gucci', 'Prada', 'Uniqlo'],
  Price: ['0 - 20 €', '20 - 50 €', '50 - 100 €', '100+ €'],
  Condition: ['New', 'Like New', 'Good', 'Fair'],
  Shop: ['ReStyle Hub', 'TrendTraders', 'Vintage Finders']
}

export type SortOption = 'asc' | 'desc' | null;

interface FilterBarProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
}

export function FilterBar({ currentSort, onSortChange }: FilterBarProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [isSaleActive, setIsSaleActive] = useState(false);

  const toggleFilter = (category: string, option: string) => {
    setSelectedFilters(prev => {
      const currentOptions = prev[category] || []
      const isSelected = currentOptions.includes(option)

      if (isSelected) {
        const newOptions = currentOptions.filter(item => item !== option)
        
        if (newOptions.length === 0) {
          const newState = { ...prev }
          delete newState[category]
          return newState
        }
        
        return { ...prev, [category]: newOptions }
      } else {
        return { ...prev, [category]: [...currentOptions, option] }
      }
    })
  }

  const clearAll = () => {
    setSelectedFilters({})
    setIsSaleActive(false)
    onSortChange(null)
  }

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {Object.entries(FILTER_OPTIONS).map(([label, options]) => (
            <FilterPopover
                key={label}
                title={label}
                options={options}
                selectedValues={selectedFilters[label] || []}
                onToggle={(option) => toggleFilter(label, option)}
            />
        ))}

        <button
            onClick={() => setIsSaleActive(!isSaleActive)}
            className={cn(
                "flex items-center text-xs font-bold px-3 h-9 rounded-full cursor-pointer transition-all border",
                isSaleActive 
                    ? "bg-brand text-white border-brand hover:bg-red-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 border-dashed hover:border-brand hover:text-brand hover:border-solid" // Не активна
            )}
        >
            Sale
            {isSaleActive ? (
                <X className="w-3 h-3 ml-2" /> 
            ) : (
                <Tag className="w-3 h-3 ml-2 opacity-50" /> 
            )}
        </button>
      </div>

      {(Object.keys(selectedFilters).length > 0 || isSaleActive) && (
        <div className="hidden md:flex flex-wrap gap-2 items-center ">
            {Object.entries(selectedFilters).map(([category, options]) => (
                options.map(option => (
                    <Badge 
                        key={`${category}-${option}`} 
                        variant="secondary" 
                        className="px-3 py-1 text-xs font-normal bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 gap-2 cursor-pointer transition-colors border border-slate-200"
                        onClick={() => toggleFilter(category, option)}
                    >
                        <span className="text-slate-400 font-semibold">{category}:</span>
                        {option}
                        <X className="w-3 h-3 text-slate-400 hover:text-red-500" />
                    </Badge>
                ))
            ))}
            
            <button 
                onClick={clearAll}
                className="text-xs text-red-400 hover:text-red-600 hover:underline ml-2 transition-colors font-medium"
            >
                Clear all
            </button>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-[#333333] mt-2">
        <span>Sort by:</span>
        <button 
            className={cn(
                "hover:underline transition-colors",
                currentSort === 'asc' 
                    ? "text-[#FF2D55] font-bold"
                    : "text-slate-500 hover:text-slate-800"
            )}
            onClick={() => onSortChange('asc')}
            >
                Ascending price
        </button>
        <button 
            className={cn(
                "hover:underline transition-colors",
                currentSort === 'desc' 
                    ? "text-[#FF2D55] font-bold"
                    : "text-slate-500 hover:text-slate-800"
            )}
            onClick={() => onSortChange('desc')}
        >
            Descending price
        </button>
      </div>
    </div>
  )
}