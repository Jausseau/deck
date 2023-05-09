import { Component, JSX } from 'solid-js';

interface PlayingTableProps {
  children: JSX.Element;
  option?:
    | 'fourColors'
    | 'faceImages'
    | 'simpleCards'
    | 'inText'
    | 'rotateHand';
  classes?: string;
}

const PlayingTable: Component<PlayingTableProps> = (props) => {
  return (
    <div class={`playingCards ${props.option || 'faceImages'}`}>
      <ul class={`table ${props.classes || ''}`}>{props.children}</ul>
    </div>
  );
};

export default PlayingTable;
