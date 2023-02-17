import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import '../styles/globals.css'

function Nation3({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default Nation3
