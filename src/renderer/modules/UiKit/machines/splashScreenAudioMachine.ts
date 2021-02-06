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

export const machine = createMachine<MachineContext, MachineEvent>(
  {
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
              actions: ['resetAndPlayIntro', 'resetAndPlayLoop'],
            },
          ],
        },
      },
      playing: {
        on: {
          LOOP_END: {
            target: 'playing',
            actions: ['resetAndPlayLoop'],
          },

          SET_ENABLED: [
            {
              target: 'disabled',
              cond: (_, action) => !action.enabled,
              actions: [
                assign({
                  isAudioEnabled: (_, event) => event.enabled,
                }),
                'pauseAndResetIntro',
                'pauseAndResetLoop',
              ],
            },
          ],

          REPLAY: [
            {
              target: 'playing',
              actions: ['resetAndPlayIntro', 'resetAndPlayLoop'],
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
                'resetAndPlayLoop',
              ],
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      pauseAndResetIntro: (context) => {
        if (!context.introAudio) {
          return;
        }

        context.introAudio.pause();
        context.introAudio.currentTime = 0;
      },
      pauseAndResetLoop: (context) => {
        if (!context.loopAudio) {
          return;
        }

        context.loopAudio.pause();
        context.loopAudio.currentTime = 0;
      },
      resetAndPlayIntro: (context) => {
        if (!context.introAudio) {
          return;
        }

        context.introAudio.currentTime = 0;
        context.introAudio.play();
      },
      resetAndPlayLoop: (context) => {
        if (!context.loopAudio) {
          return;
        }

        context.loopAudio.currentTime = 0;
        context.loopAudio.play();
      },
    },
  }
);
