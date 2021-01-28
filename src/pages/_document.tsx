import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const globalStyles = `
  html,
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    color: #000000;
    font-family: Roboto;
    -webkit-font-smoothing: antialiased;
  }

  * {
    box-sizing: border-box;
  }
`

export default class MyDocument extends Document<{
  styleTags: Array<React.ReactElement<{}>>
}> {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps, ...page, styleTags }
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.styleTags}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <style type="text/css">{globalStyles}</style>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
