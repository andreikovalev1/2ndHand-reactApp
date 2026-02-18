import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils'
import { type ShopSidebarProps } from "../types"

const CategoryBtn = ({ 
    slug, 
    label, 
    selectedCategory, 
    onToggle 
}: { 
    slug: string, 
    label: string, 
    selectedCategory: string | null, 
    onToggle: (slug: string) => void 
}) => (
    <button
        onClick={() => onToggle(slug)}
        className={cn(
            "hover:text-white lg:hover:text-brand block py-1 lg:py-0 text-left w-full transition-all ",
            selectedCategory === slug ? "text-white lg:text-brand font-bold hover:no-underline" : "opacity-80"
        )}
    >
        {label}
    </button>
);

export function ShopSidebar({ onCategorySelect, selectedCategory}: ShopSidebarProps) {

    const handleToggleCategory = (slug: string) => {
        onCategorySelect(selectedCategory === slug ? null : slug);
    };

    return (
        <div className="w-full">
        <h2 className="text-base lg:text-sm font-bold text-white ml-5 lg:ml-0 lg:text-slate-500 tracking-wider mb-4">
            Categories
        </h2>
        
        <Accordion type="single" collapsible className="w-full" defaultValue="apparel">
          
           <AccordionItem value="shoes" className="border-b border-white/20 lg:border-slate-200">
                    <AccordionTrigger 
                        className="
                            hover:no-underline 
                            py-4 lg:py-3
                            ml-5 lg:ml-0         
                            text-lg lg:text-base
                            font-semibold
                            text-white lg:text-slate-800 
                            [&>svg]:text-white [&>svg]:lg:text-slate-800 /* Цвет стрелки */
                        "
                    >
                    Shoes
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 lg:gap-3 pl-4 lg:pl-0 text-base lg:text-sm text-white/80 lg:text-slate-500 pb-4 lg:pb-3">
                    <CategoryBtn 
                        slug="womens-shoes" 
                        label="Women's Shoes" 
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory}/>
                    <CategoryBtn 
                        slug="mens-shoes" 
                        label="Men's Shoes"
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} 
                    />
                </AccordionContent>
            </AccordionItem>
  
            <AccordionItem value="apparel" className="border-b border-white/20 lg:border-slate-200">
                <AccordionTrigger 
                    className="
                        hover:no-underline py-4 lg:py-3 ml-5 lg:ml-0 text-lg lg:text-base font-semibold text-white lg:text-slate-800
                        [&>svg]:text-white [&>svg]:lg:text-slate-800
                    "
                >
                    Apparel
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 lg:gap-3 pl-4 lg:pl-0 text-base lg:text-sm text-white/80 lg:text-slate-500 pb-4 lg:pb-3  ">
                    <CategoryBtn 
                        slug="womens-dresses" 
                        label="Dresses" 
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} 
                    />
                    <CategoryBtn 
                        slug="mens-shirts" 
                        label="Shirts" 
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} />
                    <CategoryBtn 
                        slug="tops" 
                        label="Tops" 
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} 
                    />
                </AccordionContent>
            </AccordionItem>
    
            <AccordionItem value="accessories" className="border-b border-white/20 lg:border-slate-200">
                <AccordionTrigger 
                    className="
                        hover:no-underline py-4 lg:py-3 ml-5 lg:ml-0 text-lg lg:text-base font-semibold text-white lg:text-slate-800
                        [&>svg]:text-white [&>svg]:lg:text-slate-800
                    "
                >
                    Accessories
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 lg:gap-3 pl-4 lg:pl-0 text-base lg:text-sm text-white/80 lg:text-slate-500 pb-4 lg:pb-3">
                    <CategoryBtn 
                        slug="womens-bags" 
                        label="Bags" 
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} 
                    />
                    <CategoryBtn 
                        slug="sunglasses" 
                        label="Sunglasses"
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} 
                    />
                    <CategoryBtn 
                        slug="womens-jewellery" 
                        label="Jewelry"
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} 
                    />
                </AccordionContent>
            </AccordionItem>

                <AccordionItem value="belts" className="border-b border-white/20 lg:border-slate-200">
                <AccordionTrigger 
                    className="
                        hover:no-underline py-4 lg:py-3 ml-5 lg:ml-0 text-lg lg:text-base font-semibold text-white lg:text-slate-800
                        [&>svg]:text-white [&>svg]:lg:text-slate-800
                    "
                >
                    Belts
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 lg:gap-3 pl-4 lg:pl-0 text-base lg:text-sm text-white/80 lg:text-slate-500 pb-4 lg:pb-3">
                    <CategoryBtn 
                        slug="mens-watches" 
                        label="Leather belts for wathes"
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} 
                    />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sport" className="border-b border-white/20 lg:border-slate-200">
                <AccordionTrigger 
                    className="
                        hover:no-underline py-4 lg:py-3 ml-5 lg:ml-0 text-lg lg:text-base font-semibold text-white lg:text-slate-800
                        [&>svg]:text-white [&>svg]:lg:text-slate-800
                    "
                >
                    Sport
                </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 lg:gap-3 pl-4 lg:pl-0 text-base lg:text-sm text-white/80 lg:text-slate-500 pb-4 lg:pb-3">
                        <CategoryBtn 
                            slug="sports-accessories" 
                            label="sports-accessories"
                            selectedCategory={selectedCategory}
                            onToggle={handleToggleCategory} 
                        />
                    </AccordionContent>
            </AccordionItem>

            <AccordionItem value="beauty" className="border-b border-white/20 lg:border-none">
                <AccordionTrigger 
                    className="
                        hover:no-underline py-4 lg:py-3 ml-5 lg:ml-0 text-lg lg:text-base font-semibold text-white lg:text-slate-800
                        [&>svg]:text-white [&>svg]:lg:text-slate-800
                    "
                >
                    Beauty
                </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 lg:gap-3 pl-4 lg:pl-0 text-base lg:text-sm text-white/80 lg:text-slate-500 pb-4 lg:pb-3">
                    <CategoryBtn 
                        slug="beauty" 
                        label="Makeup"
                        selectedCategory={selectedCategory}
                        onToggle={handleToggleCategory} 
                    />
                    </AccordionContent>
            </AccordionItem>
          
        </Accordion>
      </div>
    )
}

