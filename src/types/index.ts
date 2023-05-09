import { ranks, suits } from '../utils/constants';

export type Suit = (typeof suits)[number];
export type Rank = (typeof ranks)[number];

interface RevealedCard {
  suit: Suit;
  rank: Rank;
  hidden?: boolean;
  placeholder?: false;
}
interface HiddenCard {
  suit?: Suit;
  rank?: Rank;
  hidden?: true;
  placeholder?: false;
}
interface PlaceholderCard {
  suit?: Suit;
  rank?: Rank;
  hidden?: boolean;
  placeholder?: boolean;
}
export type Card = RevealedCard | HiddenCard | PlaceholderCard;
