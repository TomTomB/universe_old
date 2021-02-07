import { assign, createMachine } from 'xstate';

export type MachineEvent =
  | {
      type: 'PATCHER_TO_PLAY';
    }
  | {
      type: 'PLAY_TO_LOBBY';
    }
  | {
      type: 'LOBBY_TO_PLAY';
    }
  | {
      type: 'PATCHER_INTRO_END';
    }
  | {
      type: 'TO_PATCHER';
    }
  | {
      type: 'TO_PATCHER_INTRO';
    }
  | {
      type: 'PATCHER_PROGRESS';
      value: number;
    };

export interface MachineContext {
  patcherProgress: number;
}

const stateMachine = createMachine<MachineContext, MachineEvent>({
  id: 'playButton',
  initial: 'play',
  context: {
    patcherProgress: 0,
  },
  states: {
    patcher: {
      on: {
        PATCHER_TO_PLAY: {
          target: 'play',
        },
      },
      states: {
        intro: {
          on: {
            PATCHER_INTRO_END: {
              target: 'progress',
            },
          },
        },
        progress: {
          on: {
            PATCHER_PROGRESS: {
              target: 'progress',
              cond: (_, action) => {
                return action.value <= 100;
              },
              actions: assign({
                patcherProgress: (_, event) => event.value,
              }),
            },
          },
        },
      },
    },
    play: {
      on: {
        PLAY_TO_LOBBY: {
          target: 'lobby',
        },
        TO_PATCHER: {
          target: 'patcher.progress',
        },
        TO_PATCHER_INTRO: {
          target: 'patcher.intro',
        },
      },
    },
    lobby: {
      on: {
        LOBBY_TO_PLAY: {
          target: 'play',
        },
        TO_PATCHER: {
          target: 'patcher',
        },
      },
    },
  },
});

export default stateMachine;
