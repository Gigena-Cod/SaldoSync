import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, removeAuthCookies } from '../../infrastucture/utils/cookieManager';

// Configuración base de Axios
const API_URL = import.meta.env.VITE_API_URL || 'https://saldo-sync-backend.vercel.app/api/v1';

// Crear instancia de Axios
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Request - Añadir token automáticamente
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtener token de las cookies
    const token = getAccessToken();
    
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    
    console.log('Request con token:', config.url);
    return config;
  },
  (error: AxiosError) => {
    console.error('Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor de Response - Manejar errores de autenticación
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    
    // Si el error es 401 (Unauthorized) y no es un refresh token
    if (error.response?.status === 401 && originalRequest?.url !== '/auth/refresh') {
      console.warn('Token expirado, intentando refrescar...');
      
      try {
        // Intentar refrescar el token
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: localStorage.getItem('refreshToken')
        });
        
        if (response.data.accessToken) {
          // Guardar nuevo token
          localStorage.setItem('token', response.data.accessToken);
          
          // Reintentar la request original con el nuevo token
          originalRequest.headers.set('Authorization', `Bearer ${response.data.accessToken}`);
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error al refrescar token:', refreshError);
        
        // Si no se puede refrescar, limpiar todo y redirigir al login
        removeAuthCookies();
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/v1/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
