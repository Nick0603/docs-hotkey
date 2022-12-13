import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { NextPage } from 'next'
import theme from 'lib/theme'
import NavBar from 'components/NavBar'
import 'styles/globals.css'
import DocumentationPage from 'components/DocumentationPage'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Docs Hotkey</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <ChakraProvider theme={theme}>
        {/* <NavBar /> */}
        <DocumentationPage>
          <Component {...pageProps} />
        </DocumentationPage>
      </ChakraProvider>
    </>
  )
}
export default MyApp
