import { ranks, suits } from './constants';

import { Card, Suit } from '../types';

export function getAllCards() {
  return [...suits.map((suit) => ranks.map((rank) => ({ suit, rank }))).flat()];
}

export function getRandomCard(cards: Card[] = getAllCards()) {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

export function removeCardFromDeck(
  cards?: Card[],
  cardToRemove?: Card
): Card | undefined {
  if (!cardToRemove || !cards) return undefined;
  const index = cards.indexOf(cardToRemove);
  if (index !== -1) {
    const removedCard = cards.splice(index, 1)[0];
    return removedCard;
  }
  /** No Card removed because it was already out of the deck */
  return undefined;
}

export function translateToHumanSuit(suit?: Suit) {
  switch (suit) {
    case 'diams':
      return 'diamonds';
    default:
      return suit;
  }
}
