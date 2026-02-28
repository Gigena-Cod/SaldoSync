import { useState, useEffect } from 'react';
import { getUserCookie, removeAuthCookies, refreshAccessToken, isAccessTokenExpired, performLogout, type UserData } from '../utils/cookieManager';

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Cargar datos del usuario desde cookies al montar el componente
    const loadUserData = async () => {
      try {
        // Verificar si el access token está expirado
        if (isAccessTokenExpired()) {
          // Intentar refrescar el token
          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            // No se pudo refrescar, limpiar y redirigir a login
            removeAuthCookies();
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }
        }

        const data = getUserCookie();
        setUserData(data);
        setIsAuthenticated(!!data);
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        removeAuthCookies();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      // Llamar al backend y limpiar cookies
      await performLogout();
      setUserData(null);
      setIsAuthenticated(false);
      // Redirigir a login
      window.location.href = '/v1/login';
    } catch (error) {
      console.error('Error durante logout:', error);
      // Forzar logout incluso si hay error
      removeAuthCookies();
      setUserData(null);
      setIsAuthenticated(false);
      window.location.href = '/v1/login';
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userData,
    isLoading,
    isAuthenticated,
    logout
  };
};
