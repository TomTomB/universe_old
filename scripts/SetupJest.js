// See: https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

// See: https://stackoverflow.com/questions/59934084/how-to-write-unit-test-for-ipcrenderer-on-and-ipcrenderer-send-in-jest
jest.mock(
  'electron',
  () => {
    const mElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
    return mElectron;
  },
  { virtual: true }
);

// See: https://github.com/jsdom/jsdom/issues/2155#issuecomment-366703395
window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.addTextTrack = () => {
  /* do nothing */
};

// See: https://github.com/testing-library/react-testing-library/issues/470#issuecomment-710775040
Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
  set: () => {},
});
