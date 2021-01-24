import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    easing: {
      soft: 'cubic-bezier(0, 0, 0, 1)';
      softStern: 'cubic-bezier(0.2, 0.9, 0, 1)';
      stern: 'cubic-bezier(0, 0, 1, 0)';
      normal: 'cubic-bezier(0, 0, 0.33, 1)';
    };

    colors: {
      gold: {
        1: '#f0e6d2';
        2: '#cdbe91';
        3: '#c8aa6e';
        4: '#c89b3c';
        5: '#785a28';
        6: '#463714';
        7: '#32281e';
      };
      blue: {
        1: '#cdfafa';
        2: '#0ac8b9';
        3: '#0596aa';
        4: '#005a82';
        5: '#0a323c';
        6: '#0a1428';
      };
      grey: {
        gold: '#3c3732';
        blue: '#a3c7c7';
        frame: '#1e282d';
        frame50: 'rgba(30, 35, 40, 0.5)';
        disabled: '#5c5b57';
        1: '#a09b8c';
        2: '#5b5a56';
        3: '#3c3c41';
        4: '#1e2328';
      };
      ip: {
        1: '#1e825a';
        2: '#00a741';
      };
      paladin: {
        1: '#0a96aa';
        2: '#0acbe6';
      };
      mage: {
        1: '#be1e37';
        2: '#ff2345';
      };
      experience: '#643c5a';
      me: '#fabe0a';
      black: '#010a13';
    };
  }
}
