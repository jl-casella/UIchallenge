import React from 'react'
import App from 'next/app'
import NextHead from 'next/head'

const IS_DEV = process.env.NODE_ENV !== 'production'

class NextApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <NextHead>
          <title>{`UI challenge ${IS_DEV ? ' (dev)' : ' (prod)'}`}</title>
        </NextHead>

        <>
          <Component {...pageProps} />
        </>
      </>
    )
  }
}

export default NextApp
