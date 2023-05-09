import { Component, For } from 'solid-js';

import { A } from '@solidjs/router';

import Button from '../Button';

import './default.css';

interface MenuProps {
  entries: { title: string; path: string }[];
}

const Menu: Component<MenuProps> = (props) => {
  return (
    <>
      <For each={props.entries}>
        {(entry) => (
          <A href={entry.path}>
            <Button>{entry.title}</Button>
          </A>
        )}
      </For>
    </>
  );
};

export default Menu;
