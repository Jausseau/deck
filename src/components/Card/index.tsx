import { Component } from 'solid-js';

import { Card as TCard } from '../../types';

const Card: Component<TCard> = (props) => {
  const suitIcon = (() => {
    switch (props.suit) {
      case 'clubs':
        return <>&clubs;</>;
      case 'diams':
        return <>&diams;</>;
      case 'spades':
        return <>&spades;</>;
      case 'hearts':
      default:
        return <>&hearts;</>;
    }
  })();

  if (props.hidden || props.placeholder)
    return (
      <li>
        <div
          class={`card ${props.hidden ? 'back' : ''} ${
            props.placeholder ? 'empty' : ''
          }`}
        />
      </li>
    );

  return (
    <li>
      <div class={`card rank-${props.rank} ${props.suit}`}>
        <span class="rank">
          {typeof props.rank === 'string'
            ? props.rank.toUpperCase()
            : props.rank}
        </span>
        <span class="suit">{suitIcon}</span>
      </div>
    </li>
  );
};

export default Card;
