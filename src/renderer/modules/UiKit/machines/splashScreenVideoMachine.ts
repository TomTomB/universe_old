import { assign, createMachine, send } from 'xstate';

export interface MachineContext {
  isVideoEnabled: boolean;
  hasIntroVideo: boolean;
  introVideo: HTMLVideoElement | null;
  loopVideo: HTMLVideoElement | null;
}

export type MachineEvent =
  | {
      type: 'SET_ENABLED';
      enabled: boolean;
    }
  | {
      type: 'LOADED_INTRO_VIDEO';
      element: HTMLVideoElement | null;
    }
  | {
      type: 'LOADED_LOOP_VIDEO';
      element: HTMLVideoElement | null;
    }
  | {
      type: 'LOADED_ALL';
    }
  | {
      type: 'INTRO_END';
    }
  | {
      type: 'LOOP_END';
    }
  | {
      type: 'REPLAY';
    };

export const machine = createMachine<MachineContext, MachineEvent>(
  {
    id: 'splashScreenVideo',
    initial: 'loading',
    context: {
      isVideoEnabled: true,
      hasIntroVideo: false,
      introVideo: null,
      loopVideo: null,
    },
    states: {
      loading: {
        on: {
          LOADED_INTRO_VIDEO: {
            target: 'loading',
            actions: [
              assign({
                introVideo: (_, event) => event.element,
              }),
              send('LOADED_ALL'),
            ],
          },

          LOADED_LOOP_VIDEO: {
            target: 'loading',
            actions: [
              assign({
                loopVideo: (_, event) => event.element,
              }),
              send('LOADED_ALL'),
            ],
          },

          LOADED_ALL: [
            {
              target: 'disabled',
              cond: (context) => {
                const isIntroDone =
                  !context.hasIntroVideo || !!context.introVideo;

                return (
                  !context.isVideoEnabled && isIntroDone && !!context.loopVideo
                );
              },
            },
            {
              target: 'playing',
              cond: { type: 'canPlayIntro' },
              actions: ['resetAndPlayIntro'],
            },
            {
              target: 'playing.loop',
              cond: { type: 'canPlayLoop' },
              actions: ['resetAndPlayLoop'],
            },
          ],
        },
      },
      playing: {
        initial: 'intro',
        states: {
          intro: {
            on: {
              INTRO_END: {
                target: 'loop',
                actions: ['resetAndPlayLoop'],
              },
            },
          },
          loop: {
            on: {
              LOOP_END: {
                target: 'loop',
                actions: ['resetAndPlayLoop'],
              },
            },
          },
        },
        on: {
          SET_ENABLED: {
            target: 'disabled',
            cond: (_, action) => !action.enabled,
            actions: [
              assign({
                isVideoEnabled: (_, event) => event.enabled,
              }),
              'pauseAndResetIntro',
              'pauseAndResetLoop',
            ],
          },

          REPLAY: [
            {
              target: 'playing',
              cond: { type: 'canPlayIntro' },
              actions: ['resetAndPlayIntro', 'pauseAndResetLoop'],
            },
            {
              target: 'playing.loop',
              cond: { type: 'canPlayLoop' },
              actions: ['resetAndPlayLoop'],
            },
          ],
        },
      },
      disabled: {
        on: {
          SET_ENABLED: {
            target: 'playing.loop',
            actions: [
              assign({
                isVideoEnabled: (_, event) => event.enabled,
              }),
              'resetAndPlayLoop',
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      pauseAndResetIntro: (context) => {
        if (!context.introVideo) {
          return;
        }

        context.introVideo.pause();
        context.introVideo.currentTime = 0;
      },
      pauseAndResetLoop: (context) => {
        if (!context.loopVideo) {
          return;
        }

        context.loopVideo.pause();
        context.loopVideo.currentTime = 0;
      },
      resetAndPlayIntro: (context) => {
        if (!context.introVideo) {
          return;
        }

        context.introVideo.currentTime = 0;
        context.introVideo.play();
      },
      resetAndPlayLoop: (context) => {
        if (!context.loopVideo) {
          return;
        }

        context.loopVideo.currentTime = 0;
        context.loopVideo.play();
      },
    },
    guards: {
      canPlayIntro: (context) => {
        return (
          context.hasIntroVideo &&
          !!context.introVideo &&
          !!context.loopVideo &&
          context.isVideoEnabled
        );
      },
      canPlayLoop: (context) => {
        return (
          !context.hasIntroVideo &&
          !!context.loopVideo &&
          context.isVideoEnabled
        );
      },
    },
  }
);
