import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://adminpannelcss.vercel.app/style.css" />
        <title>BuilderFloor.com</title>
        <meta name="description" content="Start Exploring Your Dream - Builder Floor now" data-react-helmet="true" />
        <meta name="google-site-verification" content="3Wif_r7y_jTUFU3LdYhT-79MeHPkjjMiIbVb4sOKRUk" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P43PLQ2NH2"></script>
        <script>
          {/* window.dataLayer = window.dataLayer || []
          function gtag() {
            dataLayer.push(arguments)
          }
          gtag('js', new Date())
          gtag('config', 'G-P43PLQ2NH2') */}
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
