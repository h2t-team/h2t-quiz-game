import { Dispatch } from 'react';
import { Socket } from 'socket.io-client';

export interface GlobalStateInterface {
  testVal: string;
  socket: Socket;
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};
