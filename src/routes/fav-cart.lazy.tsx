import { createLazyFileRoute } from '@tanstack/react-router'
import { ProductCard } from '@/features/shop/components/ProductCard'
import { cn } from '@/lib/utils'
import { useShop } from '@/context/ShopContext'

export const Route = createLazyFileRoute('/fav-cart')({
  component: FavCartPage,
})

function FavCartPage() {
  const navigate = Route.useNavigate()
  const { tab } = Route.useSearch()
  const { favorites, cart } = useShop()

  const setTab = (newTab: 'favorites' | 'cart') => {
    navigate({
      to: '.',
      search: { tab: newTab },
    })
  }

  const productsToShow = tab === 'favorites' ? favorites : cart;

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-slate-50/50">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        
        <div className="flex items-center justify-center gap-8 border-b border-slate-200 w-full mb-8">
          <button
            onClick={() => setTab('favorites')}
            className={cn(
              "pb-3 text-sm font-medium transition-all relative",
              tab === 'favorites' 
                ? "text-[#FF2D55]" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Favorites ({favorites.length})
            {tab === 'favorites' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF2D55]" />
            )}
          </button>

          <button
            onClick={() => setTab('cart')}
            className={cn(
              "pb-3 text-sm font-medium transition-all relative",
              tab === 'cart' 
                ? "text-[#FF2D55]" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Cart ({cart.length})
            {tab === 'cart' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF2D55]" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsToShow.length > 0 ? (
            productsToShow.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-400">
              <p className="text-lg">Your {tab === 'favorites' ? 'favorites list' : 'cart'} is empty.</p>
              <p className="text-sm mt-2">Add some products from the shop to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}