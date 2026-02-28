import { useState } from 'react';
import { authService } from '../domain/services/auth.service';
import { type LoginCredentials, type LoginResponse, type User } from '../domain/services/auth.service';
import { setAuthTokens, type AuthTokens } from '../infrastucture/utils/cookieManager';


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

      // Guardar tokens en cookies si el login fue exitoso
      if (response && response.user && response.token) {
        // Generar refresh token mock (en producción debería venir del backend)
        const refreshToken = `refresh-${response.token}-${Date.now()}`;
        
        const authTokens: AuthTokens = {
          accessToken: response.token,      // 1 hora (viene del backend)
          refreshToken: refreshToken,       // 7 días (generado localmente)
          userData: {
            name: response.user.name,
            email: response.user.email,
            avatar: undefined  // No hay avatar en la estructura actual
          }
        };
        
        setAuthTokens(authTokens);
      }

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
