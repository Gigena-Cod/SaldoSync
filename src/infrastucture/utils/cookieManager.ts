// Encriptación simple (para producción usar algo más robusto como crypto-js)
const SECRET_KEY = 'tu-clave-secreta-aqui'; // Debería estar en variables de entorno

export interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userData: UserData;
}

// Simple encriptación/decencriptación base64 (solo para demo)
export const encryptData = (data: any): string => {
  const jsonString = JSON.stringify(data);
  return btoa(jsonString); // Base64 encode
};

export const decryptData = (encryptedData: string): any => {
  try {
    const jsonString = atob(encryptedData); // Base64 decode
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error al desencriptar datos:', error);
    return null;
  }
};

// Guardar access token (1 hora)
export const setAccessToken = (token: string) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (1 * 60 * 60 * 1000)); // 1 hora
  
  document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
};

// Guardar refresh token (7 días)
export const setRefreshToken = (token: string) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 días
  
  document.cookie = `refreshToken=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
};

// Guardar datos de usuario (7 días)
export const setUserCookie = (userData: UserData, days: number = 7) => {
  const encryptedData = encryptData(userData);
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  document.cookie = `userData=${encryptedData}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
};

// Guardar todos los tokens de autenticación
export const setAuthTokens = (tokens: AuthTokens) => {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
  setUserCookie(tokens.userData);
};

// Obtener access token
export const getAccessToken = (): string | null => {
  const name = 'accessToken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  
  return null;
};

// Obtener refresh token
export const getRefreshToken = (): string | null => {
  const name = 'refreshToken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  
  return null;
};

// Obtener datos de usuario desde cookie
export const getUserCookie = (): UserData | null => {
  const name = 'userData=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      const encryptedData = cookie.substring(name.length, cookie.length);
      return decryptData(encryptedData);
    }
  }
  
  return null;
};

// Verificar si access token está expirado
export const isAccessTokenExpired = (): boolean => {
  const token = getAccessToken();
  return !token; // Si no hay token, está expirado
};

// Eliminar todas las cookies de autenticación
export const removeAuthCookies = () => {
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

// Logout completo: llama al backend y limpia cookies locales
export const performLogout = async (): Promise<boolean> => {
  const accessToken = getAccessToken();
  
  try {
    // Llamar al endpoint de logout del backend si hay token
    if (accessToken) {
      const response = await fetch('https://saldo-sync-backend.vercel.app/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Log del resultado para debugging
      if (response.ok) {
        console.log('Logout backend exitoso:', response.status);
      } else {
        console.warn('Logout backend response no ok:', response.status);
      }
    }
    
    // Siempre limpiar cookies locales
    removeAuthCookies();
    return true;
    
  } catch (error) {
    console.error('Error en logout del backend:', error);
    // Even if backend call fails, clean local cookies
    removeAuthCookies();
    return false;
  }
};

// Refrescar access token usando refresh token
export const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    return false;
  }
  
  try {
    // Llamada a API para refrescar token
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.accessToken);
      return true;
    } else {
      // Refresh token inválido, eliminar todo
      removeAuthCookies();
      return false;
    }
  } catch (error) {
    console.error('Error al refrescar token:', error);
    removeAuthCookies();
    return false;
  }
};
