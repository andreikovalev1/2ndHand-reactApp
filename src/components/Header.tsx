import { Link } from '@tanstack/react-router'
import { useAuth } from '../features/auth/auth-logic'
import logoIcon from '../assets/name-label.svg'

export function Header() {
  const { user, logout } = useAuth()
  const isAdmin = user?.role === 'admin'

  return (
    <header className={`p-4 text-white shadow-md ${isAdmin ? 'bg-slate-900' : 'bg-brand'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoIcon} alt="logo" className="w-10 h-10 object-contain" />

          <div className="flex flex-col w-[56px] font-logo text-[14px] font-[900] leading-[0.93] uppercase text-white">
            2nd hand market
          </div>

          {isAdmin && (
            <span className="self-center ml-2 border border-white/40 px-1 text-[10px] rounded uppercase">
              Admin
            </span>
          )}
        </Link>

        <nav className="flex gap-6 items-center">
          <Link to="/" className="hover:opacity-80">Shop</Link>
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="font-semibold underline">Management</Link>}
              <button onClick={logout} className="bg-white text-black px-3 py-1 rounded text-sm cursor-pointer">
                Exit ({user.firstName})
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-black px-4 py-1 rounded">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}