import { Component } from 'solid-js';

import { Route, Routes } from '@solidjs/router';

import styles from './App.module.css';
import Menu from './components/Menu';
import AllCards from './pages/AllCards';
import Race from './pages/Race';

const App: Component = () => {
  return (
    <>
      <h1>Decks</h1>
      <nav class={styles.Nav}>
        <Menu
          entries={[
            { path: '/all-cards', title: 'All cards' },
            { path: '/race', title: 'Race' },
          ]}
        />
      </nav>
      <Routes>
        <Route path="/all-cards" component={AllCards}></Route>
        <Route path="/race" component={Race}></Route>
      </Routes>
    </>
  );
};

export default App;
