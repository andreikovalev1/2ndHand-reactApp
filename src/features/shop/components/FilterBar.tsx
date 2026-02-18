import { X, Tag } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { FilterPopover } from './FilterPopover'
import { cn } from '@/lib/utils'
import { type FilterBarProps } from '../types'

const FILTER_OPTIONS: Record<string, string[]> = {
  Brand: [
    'Apple', 'Samsung', 'Oppo', 'Huawei',
    'Nike', 'Adidas', 'Puma',
    'Rolex', 'Casio',
    'L\'Oreal', 'Dior'
  ], 
  Price: ['0 - 50 €', '50 - 100 €', '100 - 500 €', '500+ €'],
  Rating: ['4.5 & up', '4.0 & up', '3.0 & up']
}

export function FilterBar({ 
    currentSort, 
    onSortChange, 
    selectedFilters, 
    onFilterChange, 
    isSaleActive, 
    onSaleToggle 
}: FilterBarProps) {

  const toggleFilter = (category: string, option: string) => {
    const currentOptions = selectedFilters[category] || []
    const isSelected = currentOptions.includes(option)
    const newState = { ...selectedFilters }

    if (isSelected) {
      const newOptions = currentOptions.filter(item => item !== option)
      if (newOptions.length === 0) {
        delete newState[category]
      } else {
        newState[category] = newOptions
      }
    } else {
      newState[category] = [...currentOptions, option]
    }
    onFilterChange(newState)
  }

  const clearAll = () => {
    onFilterChange({})
    onSaleToggle(false)
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
            onClick={() => onSaleToggle(!isSaleActive)}
            className={cn(
                "flex items-center text-xs font-bold px-3 h-9 rounded-full cursor-pointer transition-all border",
                isSaleActive 
                    ? "bg-brand text-white border-brand hover:bg-red-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 border-dashed hover:border-brand hover:text-brand"
            )}
        >
            Sale
            {isSaleActive ? <X className="w-3 h-3 ml-2" /> : <Tag className="w-3 h-3 ml-2 opacity-50" />}
        </button>
      </div>

      {(Object.keys(selectedFilters).length > 0 || isSaleActive) && (
        <div className="hidden md:flex flex-wrap gap-2 items-center ">
            {Object.entries(selectedFilters).map(([category, options]) => (
                options.map(option => (
                    <Badge 
                        key={`€{category}-€{option}`} 
                        variant="secondary" 
                        className="px-3 py-1 text-xs font-normal bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 gap-2 cursor-pointer border border-slate-200"
                        onClick={() => toggleFilter(category, option)}
                    >
                        <span className="text-slate-400 font-semibold">{category}:</span>
                        {option}
                        <X className="w-3 h-3 text-slate-400 hover:text-red-500" />
                    </Badge>
                ))
            ))}
            <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-600 hover:underline ml-2 font-medium">
                Clear all
            </button>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-[#333333] mt-2">
        <span>Sort by:</span>
        <button 
            className={cn("transition-colors", currentSort === 'asc' ? "text-[#FF2D55] font-bold underline" : "text-slate-500 hover:text-slate-800")}
            onClick={() => onSortChange('asc')}
        >
            Ascending price
        </button>
        <button 
            className={cn("transition-colors", currentSort === 'desc' ? "text-[#FF2D55] font-bold underline" : "text-slate-500 hover:text-slate-800")}
            onClick={() => onSortChange('desc')}
        >
            Descending price
        </button>
      </div>
    </div>
  )
}