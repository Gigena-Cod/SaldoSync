 

import {
  FiHome,
  FiFileText,
  FiDollarSign,
  FiCreditCard,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="fixed lg:relative lg:translate-x-0 z-50 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col transition-transform duration-300 ease-in-out lg:flex lg:static lg:inset-0 translate-x-0">
      {/* Sidebar Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <FiHome className="text-2xl" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none">Familia</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Finanzas Compartidas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <Link
          to="/v1/dashboard"
          className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <FiHome className="text-lg" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <Link
          to="/v1/gastos"
          className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-colors"
        >
          <FiFileText className="text-lg text-primary" />
          <span className="text-sm font-medium">Gastos</span>
        </Link>
        <Link
          to="/v1/ahorros"
          className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <FiDollarSign className="text-lg" />
          <span className="text-sm font-medium">Ahorros</span>
        </Link>
        <Link
          to="/v1/tarjetas"
          className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <FiCreditCard className="text-lg" />
          <span className="text-sm font-medium">Tarjetas</span>
        </Link>

        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            to="/v1/configuracion"
            className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <FiSettings className="text-lg" />
            <span className="text-sm font-medium">Configuración</span>
          </Link>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2">
          <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <img
              alt="User"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3eDaBWf8DUYxmqkYa6a6WgHPWr4apQdNhNAZfv-b6qPkriaLNtHF8o68rtnFUgsnFvxg72OyUNpw6Ns8JRPMIAcZsAAL9A_7jz4Na4DewpTEdhy72H_ledrunNybq4Q5Y55s0hyiygPeHHdcq18OWezZRv7JcghHIRPzhR4-CrVC8u-clTOw96JUKYqx_moy8ymLGUECQcRqXXPMnzLJn7Lai_R_NTuL3jNevvfhurgAxAeYun7YgUOsaTRP3r3qdpHj0HWYwWhA"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Nauel G.</p>
            <p className="text-[10px] text-slate-500 truncate">Admin</p>
          </div>
          <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <FiLogOut className="text-sm" />
          </button>
        </div>
      </div>
    </aside>
  );
}
