import '../styles/globals.css'
import "../styles/landing.css"
import 'normalize.css/normalize.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Daniel Bly | Full Stack Developer</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
