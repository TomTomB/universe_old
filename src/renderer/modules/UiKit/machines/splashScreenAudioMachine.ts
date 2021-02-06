/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assign, createMachine, send } from 'xstate';

export interface MachineContext {
  isAudioEnabled: boolean;
  hasIntroAudio: boolean;
  introAudio: HTMLAudioElement | null;
  loopAudio: HTMLAudioElement | null;
}

export type MachineEvent =
  | {
      type: 'SET_ENABLED';
      enabled: boolean;
    }
  | {
      type: 'LOADED_INTRO_MUSIC';
      element: HTMLAudioElement | null;
    }
  | {
      type: 'LOADED_LOOP_MUSIC';
      element: HTMLAudioElement | null;
    }
  | {
      type: 'LOADED_ALL';
    }
  | {
      type: 'REPLAY';
    }
  | {
      type: 'LOOP_END';
    };

export const machine = createMachine<MachineContext, MachineEvent>({
  id: 'splashScreenAudio',
  initial: 'loading',
  context: {
    isAudioEnabled: true,
    hasIntroAudio: false,
    introAudio: null,
    loopAudio: null,
  },
  states: {
    loading: {
      on: {
        LOADED_INTRO_MUSIC: {
          target: 'loading',
          actions: [
            assign({
              introAudio: (_, event) => event.element,
            }),
            send('LOADED_ALL'),
          ],
        },

        LOADED_LOOP_MUSIC: {
          target: 'loading',
          actions: [
            assign({
              loopAudio: (_, event) => event.element,
            }),
            send('LOADED_ALL'),
          ],
        },

        LOADED_ALL: [
          {
            target: 'disabled',
            cond: (context) => {
              const isIntroDone =
                !context.hasIntroAudio || !!context.introAudio;

              return (
                !context.isAudioEnabled && isIntroDone && !!context.loopAudio
              );
            },
          },
          {
            target: 'playing',
            cond: (context) => {
              const isIntroDone =
                !context.hasIntroAudio || !!context.introAudio;

              return (
                isIntroDone && !!context.loopAudio && context.isAudioEnabled
              );
            },
            actions: (context) => {
              if (context.hasIntroAudio && context.introAudio) {
                context.introAudio!.play();
              }
              context.loopAudio!.play();
            },
          },
        ],
      },
    },
    playing: {
      on: {
        LOOP_END: {
          target: 'playing',
          actions: (context) => {
            context.loopAudio!.play();
          },
        },

        SET_ENABLED: [
          {
            target: 'disabled',
            cond: (_, action) => !action.enabled,
            actions: [
              assign({
                isAudioEnabled: (_, event) => event.enabled,
              }),
              (context) => {
                if (context.hasIntroAudio && context.introAudio) {
                  context.introAudio!.currentTime = 0;
                  context.introAudio!.pause();
                }

                context.loopAudio!.pause();
                context.loopAudio!.currentTime = 0;
              },
            ],
          },
        ],

        REPLAY: [
          {
            target: 'playing',
            actions: (context) => {
              if (context.hasIntroAudio && context.introAudio) {
                context.introAudio!.currentTime = 0;
                context.introAudio!.play();
              }

              context.loopAudio!.currentTime = 0;
              context.loopAudio!.play();
            },
          },
        ],
      },
    },
    disabled: {
      on: {
        SET_ENABLED: [
          {
            target: 'playing',
            cond: (_, action) => action.enabled,
            actions: [
              assign({
                isAudioEnabled: (_, event) => event.enabled,
              }),
              (context) => {
                context.loopAudio!.play();
              },
            ],
          },
        ],
      },
    },
  },
});
