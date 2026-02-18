import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Menu, X, LogOut, User as UserIcon, Settings, Heart } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import logoIcon from '@/assets/name-label.svg'
import cartIcon from '@/assets/header-cart.svg'
import userIcon from '@/assets/header-profile.svg'
import searchIcon from '@/assets/search.svg'

import type { 
  NavLink, 
  HeaderLogoProps, 
  HeaderNavProps, 
  HeaderActionsProps 
} from './types'

const HeaderLogo = ({ isAdmin }: HeaderLogoProps) => (
  <Link to="/" className="flex items-center gap-3 shrink-0">
    <img src={logoIcon} alt="logo" className="w-10 h-10 object-contain" />
    <div className="hidden min-[400px]:flex flex-col w-[56px] font-logo text-[14px] font-[900] leading-[0.93] uppercase text-white">
      2nd hand market
    </div>
    {isAdmin && (
      <span className="self-center ml-2 border border-white/40 px-1 text-[10px] rounded uppercase">
        Admin
      </span>
    )}
  </Link>
)

const HeaderSearch = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <Input 
      className="bg-white/20 border-none rounded-full pl-9 h-8 text-sm placeholder:text-white/70 text-white focus-visible:ring-1 focus-visible:ring-white/50" 
      placeholder="Search..."
    />
    <img src={searchIcon} alt="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" />
  </div>
)

const HeaderNav = ({ links, isAdmin }: HeaderNavProps) => (
  <nav className="hidden lg:flex items-center gap-4 text-[13px] font-medium whitespace-nowrap">
    {links.map(link => (
      <Link key={link.label} to={link.to} className="hover:opacity-80 transition-opacity">
        {link.label}
      </Link>
    ))}
    {isAdmin && <Link to="/admin" className="font-semibold underline">Management</Link>}
  </nav>
)

const HeaderActions = ({ 
  user, 
  onLogout, 
  onProtectedAction,
  onToggleMobileMenu,
  isMobileMenuOpen 
}: HeaderActionsProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={() => onProtectedAction('/favorites')}
        className="group flex items-center hover:scale-110 transition-transform cursor-pointer shrink-0"
      >
        <Heart 
          className="w-5 h-5 transition-all duration-300 fill-black text-black opacity-20 group-hover:text-white group-hover:fill-transparent group-hover:opacity-100" 
          strokeWidth={2}
        />
        <span className="text-white text-[10px] font-bold px-1.5">0</span>
      </button>
      
      <button 
        onClick={() => onProtectedAction('/cart')}
        className="flex items-center hover:scale-110 transition-transform cursor-pointer shrink-0"
      >
        <img src={cartIcon} alt="cart" className="w-5 h-5" />
        <span className="text-white text-[10px] font-bold px-1.5">3</span>
      </button>

      {user ? (
        <div className="ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center outline-none hover:scale-110 transition-transform cursor-pointer rounded-full focus:ring-2 focus:ring-white/50">
                 <img 
                    src={user.image || userIcon} 
                    alt="user" 
                    className="w-6 h-6 rounded-full border border-white/30" 
                 />
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: '/' })} className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              {user.role !== 'admin' && (
                  <DropdownMenuItem onClick={() => navigate({ to: '/' })} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                  </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link to="/login" className="hover:scale-110 transition-transform cursor-pointer ml-2">
          <img src={userIcon} alt="login" className="w-5 h-5" />
        </Link>
      )}

      <button className="lg:hidden ml-2" onClick={onToggleMobileMenu}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  )
}


export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const isAdmin = user?.role === 'admin'

  const navLinks: NavLink[] = isAdmin ? [
    {label: 'Maintain Items', to: '/admin/items'},
    {label: 'User Management', to: '/admin'},
    {label: 'Reporting', to: '/admin/reporting'},
  ] : [
    {label: 'About us', to: '/'},
    {label: 'All shops', to: '/'},
    {label: 'Become merchant', to: '/'}
  ]

  const handleProtectedAction = (to: string) => {
    if (!user) {
        navigate({to: '/login'})
    } else {
        navigate({ to })
    }
  }

  return (
    <header className={`relative p-6 text-white shadow-md ${isAdmin ? 'bg-slate-900' : 'bg-brand'}`}>
      <div className="w-full flex justify-between items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-8 flex-1 max-w-2xl">
            <HeaderLogo isAdmin={isAdmin} />
            {!isAdmin && <HeaderSearch className="hidden md:block w-[240px]" />}
        </div>

        <div className="flex items-center gap-6 lg:gap-10">
          <HeaderNav links={navLinks} isAdmin={isAdmin} />
          <HeaderActions 
            user={user} 
            onLogout={logout} 
            onProtectedAction={handleProtectedAction}
            isMobileMenuOpen={isMobileMenuOpen}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-inherit shadow-xl border-t border-white/10 p-4 flex flex-col gap-4 z-5 animate-in slide-in-from-top-2">
            {!isAdmin && (
                <div className="md:hidden w-full">
                    <HeaderSearch />
                </div>
            )}
            <nav className="flex flex-col gap-3">
                {navLinks.map(link => (
                    <Link 
                        key={link.label} 
                        to={link.to} 
                        className="text-[16px] font-medium py-2 border-b border-white/10"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
      )}
    </header>
  )
}