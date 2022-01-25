import Layout from '../components/Layout';
import { NextUIProvider } from '@nextui-org/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
    </Layout>
  );
}

export default MyApp;
