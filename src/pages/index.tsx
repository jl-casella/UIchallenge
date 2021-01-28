import React from 'react'
import PackagesManager from '../modules/packagesManager/PackagesManager'
import { getProducts } from '../modules/packagesManager/services'
import { Product } from '../modules/packagesManager/types'

interface Props {
  initialProducts: Product[]
}

const Index: React.FC<Props> = ({ initialProducts }) => (
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
    <PackagesManager initialProducts={initialProducts} />
    </section>
  </>
)

export async function getServerSideProps() {
  const data = await getProducts()

  return {
    props: {
      initialProducts: data,
    },
  }
}

export default Index
