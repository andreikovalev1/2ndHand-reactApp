import { createFileRoute, redirect } from '@tanstack/react-router';
import { AddUserPage } from '@/features/admin/AddUserPage';
import type { AuthContextType } from '@/features/auth/types';

interface RouterContext {
  auth: AuthContextType;
}

interface BeforeLoadArgs {
  context: RouterContext;
}

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context }: BeforeLoadArgs) => {
    let user = context.auth?.user;

    if (!user) {
      const savedUser = localStorage.getItem('auth_user');
      user = savedUser ? JSON.parse(savedUser) : null;
    }
    
    if (!user || user.role !== 'admin') {
      throw redirect({ to: '/login' });
    }
  },
  component: AddUserPage,
});