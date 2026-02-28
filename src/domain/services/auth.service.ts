import { api } from '../configuration/axios';

export interface User {
  _id: string;
  name: string;
  email: string;
  family: string;
  __v: number;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'token';

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('/auth/login', credentials);
    const data: LoginResponse = response.data;
    
    // Guardar token en localStorage
    localStorage.setItem(this.TOKEN_KEY, data.token);
    
    return data;
  }

  async logout(): Promise<void> {
    try {
      // Llamar al endpoint de logout - Axios añade el token automáticamente
      await api.post('/auth/logout');
    } catch (error) {
      // Si el endpoint falla, igual limpiar el token local
      console.warn('Error en logout del backend, limpiando localmente:', error);
    } finally {
      // Siempre eliminar token del localStorage
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

 
}

export const authService = new AuthService();
