import config from 'config';
import React, { createContext, useReducer, Dispatch } from 'react';
import { io } from 'socket.io-client';
import reducer from './reducer';
import { ActionType, ContextType, GlobalStateInterface } from './types';

interface StoreProps {
  children: React.ReactNode;
}

export const initState: GlobalStateInterface = {
  testVal: '',
  socket: io(config.apiUrl),
};

export const StoreContext = createContext<ContextType>({
  globalState: initState,
  dispatch: {} as Dispatch<ActionType>,
});

const StoreProvider: React.FC<StoreProps> = ({ children }) => {
  const [globalState, dispatch] = useReducer(reducer, initState);
  return (
    <StoreContext.Provider value={{ globalState, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
