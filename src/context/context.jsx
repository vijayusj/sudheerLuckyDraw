import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react';
import dune from '/dune.mp3';
import got from '/got.mp3';

import buz from '/buzzer.mp3';
const initialState = {
  playStatus: false,
  game_status: false,

  got_music: new Audio(got),
  buzzer_music: new Audio(buz),
  dune_music: new Audio(dune),
};
const reducer = (state, action) => {
  if (state.playStatus && action.payload) {
    // console.log('get out');
    return { ...state };
  }
  if (action.type === 'got') {
    if (action.payload) {
      state.got_music.currentTime = 0;
      state.got_music.play();
      return { ...state, playStatus: true };
    } else {
      // console.log('got paused');
      state.got_music.pause();
      return { ...state, playStatus: false };
    }
  }
  if (action.type === 'dune') {
    if (action.payload) {
      state.dune_music.currentTime = 15;
      state.dune_music.play();
      return { ...state, playStatus: true };
    } else {
      // console.log('dune paused');
      state.dune_music.pause();
      return { ...state, playStatus: false };
    }
  }
  if (action.type === 'buz') {
    if (action.payload) {
      state.buzzer_music.currentTime = 18;
      state.buzzer_music.play();
      return { ...state, playStatus: true };
    } else {
      // console.log('buz paused');
      state.buzzer_music.pause();
      return { ...state, playStatus: false };
    }
  }
  if (action.type === 'game') {
    if (action.payload) {
      return { ...state, game_status: true };
    } else {
      // console.log('game paused');
      return { ...state, game_status: false };
    }
  }
};
const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const music = useRef();
  // const playStatus = useRef(false);
  const got = (play) => {
    dispatch({ type: 'got', payload: play });
  };
  const dune = (play) => {
    dispatch({ type: 'dune', payload: play });
  };
  const buzzer = (play) => {
    dispatch({ type: 'buz', payload: play });
  };
  const game = (play) => {
    dispatch({ type: 'game', payload: play });
  };

  return (
    <GlobalContext.Provider value={{ ...state, got, dune, buzzer, game }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
