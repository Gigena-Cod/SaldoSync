import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
  const [cardType, setCardType] = useState<'debit' | 'credit'>('debit');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-extrabold">Agregar Tarjeta</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>
        
        <form className="p-8 space-y-6">
          {/* Type Toggle */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex">
            <button
              type="button"
              onClick={() => setCardType('debit')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all ${
                cardType === 'debit' 
                  ? 'bg-white dark:bg-slate-700 text-primary' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Débito
            </button>
            <button
              type="button"
              onClick={() => setCardType('credit')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all ${
                cardType === 'credit' 
                  ? 'bg-white dark:bg-slate-700 text-primary' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Crédito
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Nombre del Banco
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-sm" 
                placeholder="Ej. Banco Santander" 
                type="text"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Titular de la Tarjeta
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-sm" 
                placeholder="Como figura en el plástico" 
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Apodo (Opcional)
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-sm" 
                placeholder="Ej. Gastos Diarios" 
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Vencimiento
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-sm text-center" 
                placeholder="MM/AA" 
                type="text"
              />
            </div>

            {/* Conditional Fields for Credit Cards */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${
                cardType === 'credit' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Límite de Crédito
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="$ 0.00" 
                type="text"
                disabled={cardType === 'debit'}
                style={{
                  opacity: cardType === 'debit' ? 0.5 : 1,
                  cursor: cardType === 'debit' ? 'not-allowed' : 'text'
                }}
              />
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${
                cardType === 'credit' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Día de Cierre
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-center focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Ej. 15" 
                type="text"
                disabled={cardType === 'debit'}
                style={{
                  opacity: cardType === 'debit' ? 0.5 : 1,
                  cursor: cardType === 'debit' ? 'not-allowed' : 'text'
                }}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
            >
              Guardar Tarjeta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
