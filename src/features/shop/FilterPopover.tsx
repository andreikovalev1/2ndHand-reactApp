import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface FilterPopoverProps {
  title: string
  options: string[]
  selectedValues: string[]
  onToggle: (option: string) => void
}

export function FilterPopover({ title, options, selectedValues, onToggle }: FilterPopoverProps) {
  const selectedCount = selectedValues.length
  const isActive = selectedCount > 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
            variant="outline" 
            className={cn(
                "h-9 rounded-full border-slate-200 text-xs font-medium px-3 border-solid",
                isActive && "bg-slate-100 border-slate-300 text-slate-900 border-solid"
            )}
        >
            {title}
            {isActive && (
                <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white">
                    {selectedCount}
                </span>
            )}
            <ChevronDown className="ml-2 h-3 w-3 opacity-50 transition-transform duration-200" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2" align="start">
        <div className="p-2 font-semibold text-sm border-b bg-slate-50 text-slate-500">
            Select {title}
        </div>
        <ScrollArea className="h-[200px] p-2">
            <div className="flex flex-col gap-3">
                {options.map((option) => {
                    const isChecked = selectedValues.includes(option)
                    return (
                        <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`${title}-${option}`} 
                                checked={isChecked}
                                onCheckedChange={() => onToggle(option)}
                            />
                            <Label 
                                htmlFor={`${title}-${option}`} 
                                className="text-sm font-normal cursor-pointer w-full"
                            >
                                {option}
                            </Label>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}