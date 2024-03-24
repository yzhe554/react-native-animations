import { Card, CardEntity } from '../local/card-entity';
import { source } from '../local/database';

export class CardRepository {
  async getCards(): Promise<CardEntity[]> {
    if (!source.isInitialized) await source.initialize();

    const cards = await CardEntity.find();

    return cards;
  }

  async getCard(cardId: Card['id']): Promise<CardEntity> {
    if (!source.isInitialized) await source.initialize();

    const card = await CardEntity.findOneByOrFail({ id: cardId });
    return card;
  }

  async createCard(payload: Pick<CardEntity, 'number' | 'name' | 'type' | 'expiry' | 'cvc'>) {
    if (!source.isInitialized) await source.initialize();

    const card = new CardEntity();
    card.number = payload.number;
    card.name = payload.name;
    card.type = payload.type;
    card.expiry = payload.expiry;
    card.cvc = payload.cvc;
    await card.save();
  }

  async updateCard(cardId: CardEntity['id'], payload: Partial<Pick<Card, 'name'>>) {
    if (!source.isInitialized) await source.initialize();

    const card = await CardEntity.findOneByOrFail({ id: cardId });
    card.name = payload.name ?? card.name;
    await card.save();
  }

  async deleteCard(cardId: CardEntity['id']) {
    if (!source.isInitialized) await source.initialize();

    await CardEntity.delete(cardId);
  }
}
