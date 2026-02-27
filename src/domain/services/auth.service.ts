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
  private readonly API_URL = import.meta.env.VITE_API_URL
  private readonly TOKEN_KEY = 'token';

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${this.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }

    const data: LoginResponse = await response.json();
    
    // Guardar token en localStorage
    localStorage.setItem(this.TOKEN_KEY, data.token);
    
    return data;
  }

  async logout(): Promise<void> {
    // Eliminar token del localStorage
    localStorage.removeItem(this.TOKEN_KEY);
    
    // Opcional: Llamar al endpoint de logout si existe
    // await fetch(`${this.API_URL}/auth/logout`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${this.getToken()}`,
    //   },
    // });
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Verificar si el token no ha expirado
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        _id: payload.id,
        name: payload.name || '',
        email: payload.email,
        family: payload.family,
        __v: 0,
      };
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
