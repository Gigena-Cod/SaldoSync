/* -------------------- Card Component -------------------- */

export default function Card({
  type,
  holder,
  number,
  balance,
  limit,
  closing,
  gradient,
  credit = false,
}: {
  type: string;
  holder: string;
  number: string;
  balance?: string;
  limit?: string;
  closing?: string;
  gradient: string;
  credit?: boolean;
}) {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
      <div className="p-6">
        {/* Visual */}
        <div
          className={`relative w-full aspect-[1.58/1] rounded-xl bg-gradient-to-br ${gradient} p-6 text-white flex flex-col justify-between shadow-lg mb-6`}
        >
          <div className="flex justify-between">
            <span className="text-xl font-black italic">VISA</span>
          </div>

          <div>
            <p className="text-lg tracking-[0.2em] font-mono mb-2">
              •••• •••• •••• {number}
            </p>
            <p className="text-sm">{holder}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
              {type}
            </span>
          </div>

          {credit ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase text-slate-500 font-bold">
                  Límite
                </p>
                <p className="text-sm font-bold">{limit}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-500 font-bold">
                  Cierre
                </p>
                <p className="text-sm font-bold">{closing}</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-500">Saldo disponible</p>
              <p className="text-xl font-bold">{balance}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
