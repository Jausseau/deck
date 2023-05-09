import { Component, createEffect, createSignal, For, onMount } from 'solid-js';

import styles from './styles.module.css';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Deck from '../../components/Deck';
import PlayingTable from '../../components/PlayingTable';
import { Suit, Card as TCard } from '../../types';
import { firstToUpper } from '../../utils';
import {
  getAllCards,
  getRandomCard,
  removeCardFromDeck,
  translateToHumanSuit,
} from '../../utils/cards';
import { suits } from '../../utils/constants';

const originalScore: { [key in Suit]: number } = suits
  .map((suit) => ({ [suit]: 0 }))
  .reduce(
    (acc, cur) => ({ ...acc, ...cur } as { [key in Suit]: number }),
    {}
  ) as { [key in Suit]: number };

const SCORE_LIMIT = 4 as const;

const Race: Component = () => {
  const [winningSuit, setWinningSuit] = createSignal<Suit>();
  const [usableCards, setUsableCards] = createSignal<TCard[]>();
  const [columnsCards, setColumnsCards] = createSignal<TCard[][]>([]);
  const [drawnCards, setDrawnCards] = createSignal<TCard[]>([]);
  const [score, setScore] = createSignal(originalScore);

  const reset = () => {
    let allCards = getAllCards();
    allCards = allCards?.filter((card) => card.rank !== 'a');
    const arrayCards = [
      ...suits.map((suit) => [
        { rank: 'a', suit },
        ...new Array(SCORE_LIMIT + 1),
      ]),
      (() => {
        return [...new Array(SCORE_LIMIT + 2)].map((_, i) => {
          if (i === 0 || i === SCORE_LIMIT + 1) return undefined;
          const randomCard = getRandomCard(allCards);
          removeCardFromDeck(allCards, randomCard);
          return { ...randomCard, hidden: true };
        });
      })(),
    ];
    setColumnsCards(arrayCards);
    setUsableCards(allCards);
    setDrawnCards([]);
    setScore(originalScore);
    setWinningSuit(undefined);
  };

  onMount(() => {
    reset();
  });

  function handleDrawCard() {
    const removedCard = removeCardFromDeck(
      [...(usableCards() || [])],
      getRandomCard(usableCards())
    );
    if (removedCard && removedCard.suit) {
      setUsableCards(
        usableCards()?.filter(
          (card) =>
            !(card.rank === removedCard.rank && card.suit === removedCard.suit)
        )
      );
      setDrawnCards((prev) => [...prev, removedCard]);
      setScore((prev) => {
        if (removedCard.suit) {
          if (prev[removedCard.suit] === SCORE_LIMIT) {
            setWinningSuit(removedCard.suit);
          }
          return {
            ...prev,
            ...{ [removedCard.suit]: prev[removedCard.suit] + 1 },
          };
        }
        return prev;
      });
    }
  }

  createEffect(() => {
    setColumnsCards((prev) => {
      const playingCards = [
        ...suits.map((suit) => {
          const scoreArray = [...new Array(SCORE_LIMIT + 1)];
          scoreArray.splice(score()[suit], 0, { rank: 'a', suit });
          return scoreArray;
        }),
      ];
      return [...playingCards, prev[prev.length - 1]];
    });
  });

  return (
    <div class={styles.GameContainer}>
      <PlayingTable classes={styles.PlayingField}>
        <For each={columnsCards()}>
          {(columnCards) => (
            <div class={styles.Column}>
              <For each={columnCards}>
                {(card) => (card ? <Card {...card} /> : <Card placeholder />)}
              </For>
            </div>
          )}
        </For>
      </PlayingTable>
      <div class={styles.DrawTable}>
        {winningSuit() && (
          <span>
            {firstToUpper(translateToHumanSuit(winningSuit()))} has won !
          </span>
        )}
        <Deck cards={drawnCards()} revealed />
        <Deck cards={usableCards()} />
        <div class={styles.Actions}>
          <Button
            onClick={handleDrawCard}
            disabled={usableCards()?.length === 0 || !!winningSuit()}
          >
            Draw card
          </Button>
          <Button onClick={reset}>Retry</Button>
        </div>
      </div>
    </div>
  );
};

export default Race;
