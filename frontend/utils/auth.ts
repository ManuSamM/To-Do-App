import api from './api';
import { useRouter } from 'next/navigation';

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', response.data.access_token);
    return true;
  } catch (error) {
    console.error('Login failed', error);
    return false;
  }
};

export const signup = async (username: string, password: string) => {
  try {
    await api.post('/auth/signup', { username, password });
    return true;
  } catch (error) {
    console.error('Signup failed', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const useAuth = () => {
  const router = useRouter();

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const requireAuth = () => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  };

  return { isAuthenticated, requireAuth };
};