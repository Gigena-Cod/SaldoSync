import { api } from '../configuration/axios';

export interface Card {
  id: string;
  familyId: string;
  type: 'credito' | 'debito';
  bankName: string;
  cardHolder: string;
  nickname: string;
  expirationDate: string;
  creditLimit: number | null;
  currentDebt: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardRequest {
  type: 'credito' | 'debito';
  bankName: string;
  cardHolder: string;
  nickname: string;
  expirationDate: string;
  creditLimit?: number;
}

interface CardsApiResponse {
  success: boolean;
  message: string;
  data: Card[];
}

class CardsService {
  async getFamilyCards(): Promise<Card[]> {
    const response = await api.get<CardsApiResponse>('/cards/family');
    return response.data.data;
  }

  async createCard(cardData: CreateCardRequest): Promise<Card> {
    const response = await api.post<{ success: boolean; data: Card }>('/cards', cardData);
    return response.data.data;
  }

  async updateCard(id: string, cardData: Partial<CreateCardRequest>): Promise<Card> {
    const response = await api.put<{ success: boolean; data: Card }>(`/cards/${id}`, cardData);
    return response.data.data;
  }

  async deleteCard(id: string): Promise<void> {
    await api.delete(`/cards/${id}`);
  }

  async getCardById(id: string): Promise<Card> {
    const response = await api.get<{ success: boolean; data: Card }>(`/cards/${id}`);
    return response.data.data;
  }
}

export const cardsService = new CardsService();
