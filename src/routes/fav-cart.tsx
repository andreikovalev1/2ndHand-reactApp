import { createFileRoute } from '@tanstack/react-router'

type FavCartSearch = {tab: 'favorites' | 'cart'}

export const Route = createFileRoute('/fav-cart')({
  validateSearch: (search: Record<string, unknown>): FavCartSearch => {
    if (search.tab == 'cart') {
        return {tab: 'cart'}
    }
    return {tab: 'favorites'}
  },
})