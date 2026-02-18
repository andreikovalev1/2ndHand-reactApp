import { Heart } from 'lucide-react'
import { type Product } from '@/api/products'
import { cn } from '@/lib/utils'
import cartIcon from '@/assets/header-cart.svg'

interface ProductCardProps {
    product: Product
}

export function ProductCard ({ product }: ProductCardProps) {
    return (
        <div className='group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-100'>
        <div className='relative aspect-[3/4] bg-gray-100'>
            <img
                className='w-full h-full object-cover mix-blend-multiply'
                src={product.image}
                alt={product.title}
            />

            <button className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 hover:fill-red-500 transition-colors" />
            </button>

            <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
                {product.badges?.map(badge => (
                    <span 
                        key={badge}
                        className={cn(
                            "px-2 py-0.5 text-[10px] font-bold uppercase rounded-full text-white",
                            badge === 'New' && "bg-sky-400",
                            badge === 'Reserved' && "bg-amber-400",
                        )}
                    >
                        {badge}
                    </span>
                ))}
            </div>
        </div>

        <div className="p-4 flex flex-col gap-2 grow">
        <h3 className="text-sm font-medium text-slate-700 line-clamp-2 min-h-[40px]">
            {product.title}
        </h3>
        
        <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
                 {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                        {product.originalPrice.toFixed(2)} €
                    </span>
                 )}
                 <span className={cn("text-lg font-bold", product.originalPrice ? "text-red-500" : "text-slate-800")}>
                    {product.price.toFixed(2)} €
                 </span>
            </div>

            <button className="transition-transform cursor-pointer p-1">
                <img 
                    src={cartIcon} 
                    alt="cart" 
                    className="w-5 h-5 brightness-0 opacity-50 hover:opacity-100 transition-opacity" 
                />
            </button>
        </div>
      </div>
    </div>
    )
}