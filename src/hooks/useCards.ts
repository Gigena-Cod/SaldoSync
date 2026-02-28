import { useState, useEffect } from 'react';
import { cardsService } from '../domain/services/cards.service';
import type { Card, CreateCardRequest } from '../domain/services/cards.service';

interface UseCardsReturn {
  cards: Card[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createCard: (cardData: CreateCardRequest) => Promise<Card | null>;
  updateCard: (id: string, cardData: Partial<CreateCardRequest>) => Promise<Card | null>;
  deleteCard: (id: string) => Promise<boolean>;
}

export const useCards = (): UseCardsReturn => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    setLoading(true);
    setError(null);

    try {
      const cardsData = await cardsService.getFamilyCards();
      setCards(cardsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar tarjetas';
      setError(errorMessage);
      console.error('Error al cargar tarjetas:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCard = async (cardData: CreateCardRequest): Promise<Card | null> => {
    try {
      const newCard = await cardsService.createCard(cardData);
      setCards(prev => [...prev, newCard]);
      return newCard;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear tarjeta';
      setError(errorMessage);
      console.error('Error al crear tarjeta:', err);
      return null;
    }
  };

  const updateCard = async (id: string, cardData: Partial<CreateCardRequest>): Promise<Card | null> => {
    try {
      const updatedCard = await cardsService.updateCard(id, cardData);
      setCards(prev => prev.map(card => 
        card.id === id ? updatedCard : card
      ));
      return updatedCard;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar tarjeta';
      setError(errorMessage);
      console.error('Error al actualizar tarjeta:', err);
      return null;
    }
  };

  const deleteCard = async (id: string): Promise<boolean> => {
    try {
      await cardsService.deleteCard(id);
      setCards(prev => prev.filter(card => card.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar tarjeta';
      setError(errorMessage);
      console.error('Error al eliminar tarjeta:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
    createCard,
    updateCard,
    deleteCard,
  };
};
