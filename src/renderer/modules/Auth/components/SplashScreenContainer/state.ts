/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assign, createMachine, send } from 'xstate';

export interface StateMachineContext {
  introVideo: HTMLVideoElement | null;
  loopVideo: HTMLVideoElement | null;
  introMusic: HTMLAudioElement | null;
  loopMusic: HTMLAudioElement | null;
}

export type StateMachineEvent =
  | {
      type: 'LOADED_INTRO_VIDEO';
      element: HTMLVideoElement;
    }
  | {
      type: 'LOADED_LOOP_VIDEO';
      element: HTMLVideoElement;
    }
  | {
      type: 'LOADED_INTRO_MUSIC';
      element: HTMLVideoElement;
    }
  | {
      type: 'LOADED_LOOP_MUSIC';
      element: HTMLVideoElement;
    }
  | {
      type: 'LOADED_ALL';
    }
  | {
      type: 'PAUSE';
    }
  | {
      type: 'REPLAY';
    };

// TODO: Intros and loops should not start at the same time
const stateMachine = createMachine<StateMachineContext, StateMachineEvent>({
  id: 'splashScreen',
  initial: 'loading',
  context: {
    introVideo: null,
    introMusic: null,
    loopMusic: null,
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
        LOADED_INTRO_MUSIC: {
          target: 'loading',
          actions: [
            assign({
              introMusic: (_, event) => event.element,
            }),
            send('LOADED_ALL'),
          ],
        },
        LOADED_LOOP_MUSIC: {
          target: 'loading',
          actions: [
            assign({
              loopMusic: (_, event) => event.element,
            }),
            send('LOADED_ALL'),
          ],
        },
        LOADED_ALL: {
          target: 'playing',
          cond: (context) => {
            return (
              !!context.introMusic &&
              !!context.loopMusic &&
              !!context.introVideo &&
              !!context.loopVideo
            );
          },
          actions: (context) => {
            context.introMusic!.play();
            context.loopMusic!.play();
            context.introVideo!.play();
            context.loopVideo!.play();
          },
        },
      },
    },
    playing: {
      on: {
        PAUSE: {
          target: 'paused',
          actions: (context) => {
            context.introMusic!.pause();
            context.loopMusic!.pause();
            context.introVideo!.pause();
            context.loopVideo!.pause();
          },
        },
        REPLAY: {
          target: 'playing',
          actions: (context) => {
            context.introMusic!.currentTime = 0;
            context.loopMusic!.currentTime = 0;
            context.introVideo!.currentTime = 0;
            context.loopVideo!.currentTime = 0;

            context.introMusic!.play();
            context.loopMusic!.play();
            context.introVideo!.play();
            context.loopVideo!.play();
          },
        },
      },
    },
    paused: {
      on: {
        PAUSE: {
          target: 'playing',
          actions: (context) => {
            context.introMusic!.play();
            context.loopMusic!.play();
            context.introVideo!.play();
            context.loopVideo!.play();
          },
        },
      },
    },
  },
});

export default stateMachine;
