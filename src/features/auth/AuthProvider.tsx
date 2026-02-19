import React, { useCallback, useState } from 'react';
import { type User } from './types';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const loginData = await response.json();
      
      // 2. Делаем ВТОРОЙ запрос за полным профилем юзера (по его ID)
      // Именно здесь хранится поле "role"
      const profileResponse = await fetch(`https://dummyjson.com/users/${loginData.id}`);
      
      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      const profileData = await profileResponse.json();

      // 3. Соединяем токен авторизации и настоящую роль
      const userFromApi: User = {
        ...loginData,           // берем id, username, token
        role: profileData.role  // берем роль (admin или user) из полного профиля
      };

      // Сохраняем в localStorage и стейт
      localStorage.setItem('auth_user', JSON.stringify(userFromApi));
      setUser(userFromApi);

      return userFromApi;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};