import { Component, createSignal, For } from 'solid-js';

import styles from './styles.module.css';

import Button from '../../components/Button';
import Card from '../../components/Card';
import PlayingTable from '../../components/PlayingTable';
import { Rank, Suit } from '../../types';
import { getAllCards } from '../../utils/cards';
import shuffle from '../../utils/shuffle';

import '../../styles/card.css';

const AllCards: Component = () => {
  const [deck, setDeck] = createSignal<{ suit: Suit; rank: Rank }[]>(
    getAllCards()
  );

  function handleShuffle() {
    setDeck(shuffle([...deck()]));
  }

  function handleRearrange() {
    setDeck(getAllCards());
  }
  return (
    <div class={styles.ACContainer}>
      <PlayingTable classes={styles.ACTable}>
        <For each={deck()}>
          {({ suit, rank }) => <Card rank={rank} suit={suit} />}
        </For>
      </PlayingTable>
      <div class={styles.ACActions}>
        <Button onClick={handleShuffle}>Shuffle</Button>
        <Button onClick={handleRearrange}>Rearrange</Button>
      </div>
    </div>
  );
};

export default AllCards;
