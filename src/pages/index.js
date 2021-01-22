import React from 'react'

import { Layout } from 'components/Layout'

const Index = () => (
  <>
    <header
      style={{
        height: 50,
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid grey',
      }}
    >
      <p>UI challenge</p>
    </header>

    <section style={{ height: 'calc(100vh - 50px)', overflow: 'hidden' }}>
      <Layout />
    </section>
  </>
)

export default Index
