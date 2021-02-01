import { assign, createMachine, EventObject } from 'xstate';

export enum PlayButtonState {
  Patcher,
  Play,
  Lobby,
}

export interface StateMachineContext {
  state: PlayButtonState;
}

export const setState = assign<
  StateMachineContext,
  EventObject & { value: PlayButtonState }
>({
  state: (_context, action) => action.value,
});

const stateMachine = createMachine<StateMachineContext>({
  id: 'playButton',
  initial: 'intro',
  context: {
    state: PlayButtonState.Play,
  },
  states: {
    intro: {
      on: { IDLE: 'idle', ACTIVE: 'active' },
    },
    idle: {
      on: { CLICK: 'click' },
    },
    active: {
      on: { IDLE: 'idle', CLICK: 'click' },
    },
    click: {
      on: { ACTIVE: 'active', IDLE: 'idle' },
    },
  },
});

export default stateMachine;
