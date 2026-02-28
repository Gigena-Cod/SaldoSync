import PageLayout from "../../layout/PageLayout";

export default function Tarjetas() {
  return (
    <PageLayout title="Tarjetas">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Tarjeta Principal */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">credit_card</span>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider">Visa</span>
          </div>
          <div className="mb-6">
            <p className="text-xs opacity-80 mb-1">Número de tarjeta</p>
            <p className="text-lg font-mono tracking-wider">•••• •••• •••• 4242</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80 mb-1">Titular</p>
              <p className="text-sm font-medium">NAUEL GIGENA</p>
            </div>
            <div>
              <p className="text-xs opacity-80 mb-1">Vence</p>
              <p className="text-sm font-medium">12/25</p>
            </div>
          </div>
        </div>

        {/* Tarjeta Secundaria */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">credit_card</span>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider">Mastercard</span>
          </div>
          <div className="mb-6">
            <p className="text-xs opacity-80 mb-1">Número de tarjeta</p>
            <p className="text-lg font-mono tracking-wider">•••• •••• •••• 8156</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80 mb-1">Titular</p>
              <p className="text-sm font-medium">CAMILA RODRIGUEZ</p>
            </div>
            <div>
              <p className="text-xs opacity-80 mb-1">Vence</p>
              <p className="text-sm font-medium">03/15</p>
            </div>
          </div>
        </div>

        {/* Resumen de Tarjetas */}
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Disponible</span>
            <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$85.200</span>
            <span className="text-xs font-medium text-emerald-500">En 3 tarjetas</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Límite total</span>
              <span className="font-medium">$200.000</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Utilizado</span>
              <span className="font-medium text-orange-500">$114.800</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-[57.4%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Transacciones Recientes */}
      <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold">Transacciones Recientes</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
                <span className="material-symbols-outlined">arrow_downward</span>
              </div>
              <div>
                <p className="text-sm font-bold">Netflix</p>
                <p className="text-xs text-slate-500">•••• 4242 • Hoy</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-red-500">-$7.800</p>
              <p className="text-xs text-slate-500">Cuota 1/3</p>
            </div>
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
                <span className="material-symbols-outlined">arrow_downward</span>
              </div>
              <div>
                <p className="text-sm font-bold">Supermercado Jumbo</p>
                <p className="text-xs text-slate-500">•••• 8156 • Ayer</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-red-500">-$42.300</p>
              <p className="text-xs text-slate-500">Débito</p>
            </div>
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <span className="material-symbols-outlined">arrow_upward</span>
              </div>
              <div>
                <p className="text-sm font-bold">Sueldo</p>
                <p className="text-xs text-slate-500">•••• 4242 • 15 Oct</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-emerald-500">+$150.000</p>
              <p className="text-xs text-slate-500">Crédito</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
