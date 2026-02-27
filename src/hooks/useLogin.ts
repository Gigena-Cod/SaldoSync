import { useState } from 'react';
import { toast } from 'react-toastify';
import { authService } from '../domain/services/auth.service';
import { type LoginCredentials, type LoginResponse } from '../domain/services/auth.service';


interface UseLoginReturn {
  data: LoginResponse | null;
  error: string;
  loading: boolean;
  post: (credentials: LoginCredentials) => Promise<void>;
}

export function useLogin(): UseLoginReturn {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const post = async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await authService.login(credentials);
      setData(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    post,
  };
}
