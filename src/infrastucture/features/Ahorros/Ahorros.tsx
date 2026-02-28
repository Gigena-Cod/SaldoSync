import PageLayout from "../../layout/PageLayout";

export default function Ahorros() {
  return (
    <PageLayout title="Ahorros">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Ahorro Total */}
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Ahorro Total</span>
            <span className="material-symbols-outlined text-green-500">savings</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$125.000</span>
            <span className="text-xs font-medium text-emerald-500">+8% vs mes ant.</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-[65%] rounded-full"></div>
          </div>
        </div>

        {/* Meta del Mes */}
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Meta del Mes</span>
            <span className="material-symbols-outlined text-blue-500">flag</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$200.000</span>
            <span className="text-xs font-medium text-orange-500">62.5% completado</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[62.5%] rounded-full"></div>
          </div>
        </div>

        {/* Proyección Anual */}
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Proyección Anual</span>
            <span className="material-symbols-outlined text-purple-500">trending_up</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$1.500.000</span>
            <span className="text-xs font-medium text-purple-500">Al ritmo actual</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Basado en ahorros de últimos 3 meses</p>
        </div>
      </div>

      {/* Lista de Metas */}
      <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold">Metas de Ahorro</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <span className="material-symbols-outlined">flight</span>
              </div>
              <div>
                <p className="text-sm font-bold">Viaje a Europa</p>
                <p className="text-xs text-slate-500">Vacaciones 2024</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">$80.000</p>
              <p className="text-xs text-emerald-500">75% completado</p>
            </div>
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
                <span className="material-symbols-outlined">emergency</span>
              </div>
              <div>
                <p className="text-sm font-bold">Fondo de Emergencia</p>
                <p className="text-xs text-slate-500">6 meses de gastos</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">$300.000</p>
              <p className="text-xs text-orange-500">42% completado</p>
            </div>
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <span className="material-symbols-outlined">devices</span>
              </div>
              <div>
                <p className="text-sm font-bold">Nuevo Notebook</p>
                <p className="text-xs text-slate-500">Trabajo</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">$150.000</p>
              <p className="text-xs text-red-500">15% completado</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
