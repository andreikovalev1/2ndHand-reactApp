export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<User>;
  logout: () => void;
  isLoading: boolean;
}