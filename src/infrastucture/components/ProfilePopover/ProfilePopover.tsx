import { useState, useRef, useEffect } from "react";
import { IoMdLogOut, IoMdPerson, IoMdSettings } from "react-icons/io";
import { usePostLogout } from "../../../hooks/usePostLogout";
import { removeAuthCookies, getUserCookie } from "../../utils/cookieManager";

export default function ProfilePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const postLogout = usePostLogout();
  const userData = getUserCookie(); // Obtener datos directamente de las cookies

  // Cerrar popover al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    postLogout.post();

    setIsOpen(false);
  };

  useEffect(() => {
    // Manejar éxito o error del logout
    if (postLogout.success || postLogout.error) {
      // Eliminar cookies locales
      removeAuthCookies();
      // Navegar al login
      window.location.href = "/v1/login";
    }
  }, [postLogout.success, postLogout.error]);

  return (
    <div className="relative" ref={popoverRef}>
      {/* Botón que abre el popover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors pr-2 py-1"
      >
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold leading-none">
            {userData?.name || "Invitado"}
          </p>
          <p className="text-[10px] text-slate-500">
            {userData?.email || "no@registrado.com"}
          </p>
        </div>

        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
          {userData ? getInitials(userData.name) : "GU"}
        </div>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden z-50">
          {/* Header del popover */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-300">
                {userData ? getInitials(userData.name) : "GU"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {userData?.name || "Invitado"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {userData?.email || "no@registrado.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Opciones del menú */}
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <IoMdPerson className="text-lg" />
              <span>Mi Perfil</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <IoMdSettings className="text-lg" />
              <span>Configuración</span>
            </button>

            <div className="border-t border-slate-100 dark:border-slate-800 my-2"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <IoMdLogOut className="text-lg" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
