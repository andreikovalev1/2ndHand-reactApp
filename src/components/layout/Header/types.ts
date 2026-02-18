import { type User } from '@/features/auth/types';

export interface NavLink {
  label: string;
  to: string;
}

export interface HeaderLogoProps {
  isAdmin: boolean;
}

export interface HeaderNavProps {
  links: NavLink[];
  isAdmin: boolean;
}

export interface HeaderActionsProps {
  user: User | null;
  onLogout: () => void;
  onProtectedAction: (path: string) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}