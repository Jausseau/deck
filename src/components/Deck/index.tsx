import { Component, For } from 'solid-js';

import { Card as TCard } from '../../types';
import Card from '../Card';
import PlayingTable from '../PlayingTable';

interface DeckProps {
  cards?: TCard[];
  revealed?: boolean;
}

const Deck: Component<DeckProps> = (props) => {
  return (
    <PlayingTable>
      <ul class="deck">
        <For each={props.cards}>
          {(card) => <Card {...card} hidden={!props.revealed} />}
        </For>
      </ul>
    </PlayingTable>
  );
};

export default Deck;
