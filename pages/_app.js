import Layout from '../components/Layout';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import '../styles/globals.css';

const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      // brand colors
      background: '#1d1d1d',
      text: '#fff',
      gradient: 'linear-gradient(to right, #a359d8, rgba(21, 5, 194, 0.845)',
      // you can also create your own color
      myDarkColor: '#ff4ecd',
      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </Layout>
  );
}

export default MyApp;
