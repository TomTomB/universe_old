import theme from '@styles/theme';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import * as Styles from '@styles';
import store from '@store';
import { Provider } from 'react-redux';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'black',
    values: [
      {
        name: 'black',
        value: '#010a13',
      },
      {
        name: 'white',
        value: '#fff',
      },
    ],
  },
};

export const decorators = [
  Story => (
    <Provider store={store}>
      <StyleSheetManager disableVendorPrefixes>
        <>
          <Styles.Reset />
          <Styles.FontFaces />

          <ThemeProvider theme={Styles.theme}>
            <Styles.Scrollbar />
            <Styles.BodyTypography />
            <Styles.HeadingTypography />
            <Story />
          </ThemeProvider>
        </>
      </StyleSheetManager>
    </Provider>
  ),
];
