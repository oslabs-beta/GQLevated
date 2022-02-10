import Layout from '../components/Layout';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { store } from '../store';
import { Provider } from 'react-redux';
import '../styles/globals.css';


const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      // brand colors
      // background: '#1d1d1d',
      background: '#121212',
      text: 'hsla(0, 100%, 100%, 0.87)',
      selection: '#005cce',
      codeLight: 'rgba(27,31,36,0)',
      gradient: 'linear-gradient(to right, #a359d8, rgba(21, 5, 194, 0.845)',

      // you can also create your own color
      myDarkColor: '#fffff',
      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <NextUIProvider theme={theme}>
          <Component {...pageProps} />
        </NextUIProvider>
      </Layout>
    </Provider>
  );
}

export default MyApp;
