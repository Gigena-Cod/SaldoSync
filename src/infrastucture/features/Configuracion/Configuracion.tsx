import React, { useState, useEffect } from "react";
import { IoMdAdd, IoMdInformationCircle } from "react-icons/io";
import AddCardModal from "./components/AddCardModal";
import EditCardModal from "./components/EditCardModal";
import Card from "./components/Card/Card";
import { useCards } from "../../../hooks/useCards";
import type { Card as CardType } from "../../../domain/services/cards.service";

export default function Tarjetas() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [localCards, setLocalCards] = useState<CardType[]>([]);
  const { cards, loading, error, createCard, updateCard } = useCards();

  // Sincronizar localCards con cards del hook
  useEffect(() => {
    setLocalCards(cards);
  }, [cards]);

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCard = async (cardData: any) => {
    const newCard = await createCard(cardData);
    if (newCard) {
      // Agregar la nueva tarjeta al estado local
      setLocalCards(prev => [...prev, newCard]);
      setIsModalOpen(false); // Cerrar modal
    }
    return newCard;
  };

  const handleEditCard = (card: CardType) => {
    setEditingCard(card);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCard(null);
  };

  const handleUpdateCard = async (cardData: any) => {
    if (!editingCard) return null;
    
    const updatedCard = await updateCard(editingCard.id, cardData);
    if (updatedCard) {
      // Actualizar la tarjeta en el estado local
      setLocalCards(prev => prev.map(card => 
        card.id === editingCard.id ? updatedCard : card
      ));
      setIsEditModalOpen(false); // Cerrar modal
      setEditingCard(null);
    }
    return updatedCard;
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Content */}
      <div className="p-8  w-full mx-auto">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Mis Tarjetas</h2>
            <p className="text-slate-500 mt-1">
              Administra tus tarjetas de débito y crédito vinculadas.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-700 rounded-xl h-[340px]"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-primary hover:underline"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tarjetas dinámicas */}
            {localCards.map((card) => (
              <Card
                key={card.id}
                type={`${card.bankName} ${card.type === "debito" ? "Débito" : "Crédito"}`}
                holder={card.cardHolder}
                number={card.id.slice(-4)} // Usar los últimos 4 caracteres del ID
                balance={
                  card.type === "debito"
                    ? `$${card.currentDebt.toLocaleString()}`
                    : undefined
                }
                limit={
                  card.creditLimit
                    ? `$${card.creditLimit.toLocaleString()}`
                    : undefined
                }
                closing={new Date(card.expirationDate).toLocaleDateString(
                  "es-ES",
                  { month: "short", day: "numeric" },
                )}
                gradient={
                  card.type === "debito"
                    ? "from-slate-900 to-slate-700"
                    : "from-indigo-600 to-purple-700"
                }
                credit={card.type === "credito"}
                onEdit={() => handleEditCard(card)}
              />
            ))}

            {/* Botón agregar */}
            <button
              onClick={handleAddCardClick}
              className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 min-h-[340px] hover:bg-slate-200 dark:hover:bg-slate-800 transition-all group"
            >
              <div className="size-12 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all shadow-sm mb-4">
                <IoMdAdd className="text-3xl" />
              </div>
              <p className="font-bold text-slate-600 dark:text-slate-300">
                Vincular otra tarjeta
              </p>
              <p className="text-xs text-slate-500 mt-1">Crédito o Débito</p>
            </button>
          </div>
        )}

        {/* Seguridad */}
        <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-4">
          <IoMdInformationCircle className="text-primary" />
          <div>
            <h4 className="text-sm font-bold">Seguridad de tus datos</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Nunca compartas los 16 dígitos ni el código CVV de tus tarjetas.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddCardModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onCardCreated={handleCreateCard}
      />

      {/* Edit Modal */}
      <EditCardModal 
        isOpen={isEditModalOpen} 
        onClose={handleCloseEditModal} 
        card={editingCard}
        onCardUpdated={handleUpdateCard}
      />
    </div>
  );
}
