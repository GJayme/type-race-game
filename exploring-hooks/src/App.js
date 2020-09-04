import React, { useState, useEffect } from 'react';

import './App.css';

const App = () => {

  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];

  const INITIAL_GAME_STATE = {
    victory: false,
    startTime: null,
    endTime: null
  }

  /* 
    useState Hook é como se fosse o state de um componente com classe,
    o primeiro valor dele é o estado atual e a segunda é uma função que
    altera o estado.
  */
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE)

  /*
    useEffect tells React that the component needs to fire an effect after a render. 
    The effect is a callback function that you provide. And under the hood, the React engine will fire 
    off that effect when the DOM updates (in other words, after a render).

    This hook can become the place where you put your functionality that had previously lived in
    lifecycle methods (componentDidMount, componentWillUnmount, etc).
  */
  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
  });

  const updateUserText = event => {
    setUserText(event.target.value);
    console.log(`current userText`, userText);

    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  }

  const chooseSnippet = snippetIndex => () => {
    console.log('setSnippet', snippetIndex);
    setSnippet(SNIPPETS[snippetIndex])
    setGameState({ ...gameState, startTime: new Date().getTime() })
  }

  return (
    <div className='wrapper'>
      <h2>Type Race</h2>
      <h3>Snippet</h3>
      {snippet}
      <h4>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null}</h4>
      <input value={userText} onChange={updateUserText} />

      <div>
        {
          SNIPPETS.map((SNIPPET, index) => (
            <button onClick={chooseSnippet(index)} key={index}>
              {SNIPPET.substring(0, 10)}...
            </button>
          ))
        }
      </div>
    </div>
  )
}



export default App;
