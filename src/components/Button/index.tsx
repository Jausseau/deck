import { Component, JSX } from 'solid-js';

import styles from './styles.module.css';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      class={props.class || ''}
      classList={{ [styles.Button]: true }}
      {...props}
    >
      <span class={styles.ButtonTop}>{props.children}</span>
    </button>
  );
};

export default Button;
