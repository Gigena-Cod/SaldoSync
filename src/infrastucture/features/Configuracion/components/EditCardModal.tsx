import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import type { Card as CardType, CreateCardRequest } from "../../../../domain/services/cards.service";

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: CardType | null;
  onCardUpdated?: (cardData: any) => Promise<any>;
}

export default function EditCardModal({ isOpen, onClose, card, onCardUpdated }: EditCardModalProps) {
  const [formData, setFormData] = useState<CreateCardRequest>({
    type: 'debito',
    bankName: '',
    cardHolder: '',
    nickname: '',
    expirationDate: '',
    creditLimit: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos de la tarjeta cuando se abre el modal
  useEffect(() => {
    if (card) {
      setFormData({
        type: card.type,
        bankName: card.bankName,
        cardHolder: card.cardHolder,
        nickname: card.nickname,
        expirationDate: card.expirationDate,
        creditLimit: card.creditLimit || undefined,
      });
    }
  }, [card]);

  if (!isOpen || !card) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let updatedCard;
      if (onCardUpdated) {
        // Usar la función personalizada del padre
        updatedCard = await onCardUpdated(formData);
      }
      
      if (updatedCard) {
        // Éxito: cerrar modal
        onClose();
      }
    } catch (error) {
      console.error('Error al actualizar tarjeta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateCardRequest, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-extrabold">Editar Tarjeta</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Type Toggle (solo lectura) */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex">
            <button
              type="button"
              disabled
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all ${
                formData.type === 'debito' 
                  ? 'bg-white dark:bg-slate-700 text-primary' 
                  : 'text-slate-500'
              }`}
            >
              Débito
            </button>
            <button
              type="button"
              disabled
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all ${
                formData.type === 'credito' 
                  ? 'bg-white dark:bg-slate-700 text-primary' 
                  : 'text-slate-500'
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
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                required
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
                value={formData.cardHolder}
                onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                required
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
                value={formData.nickname}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Vencimiento
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-sm text-center" 
                placeholder="YYYY-MM-DD" 
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                required
              />
            </div>

            {/* Conditional Fields for Credit Cards */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${
                formData.type === 'credito' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Límite de Crédito
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="$ 0.00" 
                type="number"
                value={formData.creditLimit || ''}
                onChange={(e) => handleInputChange('creditLimit', e.target.value ? Number(e.target.value) : undefined)}
                disabled={formData.type === 'debito'}
                style={{
                  opacity: formData.type === 'debito' ? 0.5 : 1,
                  cursor: formData.type === 'debito' ? 'not-allowed' : 'text'
                }}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Actualizando...' : 'Actualizar Tarjeta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
