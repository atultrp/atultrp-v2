import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#0B0F17" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
