import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function ShopSidebar() {
    return (
        <div className="w-full">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Categories</h2>
        
        <Accordion type="single" collapsible className="w-full" defaultValue="apparel">
          
          <AccordionItem value="shoes" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-2 text-slate-700 font-semibold">Shoes</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 pl-2 text-sm text-slate-500">
                <a href="#" className="hover:text-brand">Sneakers</a>
                <a href="#" className="hover:text-brand">Boots</a>
                <a href="#" className="hover:text-brand">Sandals</a>
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="apparel" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-2 text-slate-700 font-semibold">Apparel</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 pl-2 text-sm text-slate-500">
                <a href="#" className="hover:text-brand">Jackets</a>
                <a href="#" className="hover:text-brand">Dresses</a>
                <a href="#" className="hover:text-brand">Jeans</a>
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="accessories" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-2 text-slate-700 font-semibold">Accessories</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 pl-2 text-sm text-slate-500">
                <a href="#" className="hover:text-brand">Bags</a>
                <a href="#" className="hover:text-brand">Belts</a>
                <a href="#" className="hover:text-brand">Jewelry</a>
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>
      </div>
    )
}

