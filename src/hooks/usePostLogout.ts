import { useState } from 'react';
import { authService } from '../domain/services/auth.service';

interface UsePostLogoutReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  post: () => Promise<void>;
}

export function usePostLogout(): UsePostLogoutReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const postLogout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authService.logout();
      setSuccess(true);
      console.log('Logout exitoso en backend');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al hacer logout';
      setError(errorMessage);
      console.error('Error en logout:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    post: postLogout,
  };
}
