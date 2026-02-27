import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiShield, FiUser, FiMail, FiLock } from "react-icons/fi";
import { useLogin } from "../../../hooks/useLogin";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login.post({ email, password });
  };

  useEffect(() => {
    if (!login.data) return;

    navigate("/v1/dashboard");
  }, [login.data]);

  useEffect(() => {
    if (!login.error) return;

    toast.error("Credencailes incorrect");
  }, [login.error]);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4 md:px-20">
        <div className="flex items-center gap-3">
          <FiCreditCard className="text-primary text-3xl" />
          <h1 className="text-slate-900 dark:text-slate-100 text-xl font-bold">
            Saldo Sync
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <FiShield className="text-slate-500" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Secure Access
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-6">
              <FiUser className="text-primary text-4xl" />
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold mb-2">
              Bienvenido de nuevo
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Accede a tu familia financiera
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Card */}
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-xl backdrop-blur-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Correo electrónico
                </label>
                <div className="relative mt-2">
                  <FiMail className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Contraseña
                  </label>
                  <a className="text-xs font-semibold text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative mt-2">
                  <FiLock className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="border-t border-slate-200 dark:border-slate-800" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-2 text-sm text-slate-500">
                O accede con
              </span>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button className="border rounded-lg py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                Google
              </button>
              <button className="border rounded-lg py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                Apple
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-500">
            ¿No tienes una cuenta familiar?
            <a className="font-bold text-primary hover:underline ml-1">
              Regístrate aquí
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
