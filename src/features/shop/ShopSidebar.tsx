import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function ShopSidebar() {
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
                    <a href="#" className="hover:text-brand transition-colors block py-1 lg:py-0">Sneakers</a>
                    <a href="#" className="hover:text-brand transition-colors block py-1 lg:py-0">Boots</a>
                    <a href="#" className="hover:text-brand transition-colors block py-1 lg:py-0">Sandals</a>
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
                <AccordionContent className="flex flex-col gap-4 lg:gap-3 pl-4 lg:pl-0 text-base lg:text-sm text-white/80 lg:text-slate-500 pb-4 lg:pb-3">
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Jackets</a>
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Dresses</a>
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Jeans</a>
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
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Bags</a>
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Belts</a>
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Jewelry</a>
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
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Leather belts</a>
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
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Running</a>
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
                    <a href="#" className="hover:text-white lg:hover:text-brand transition-colors block py-1 lg:py-0">Makeup</a>
                    </AccordionContent>
            </AccordionItem>
          
        </Accordion>
      </div>
    )
}

