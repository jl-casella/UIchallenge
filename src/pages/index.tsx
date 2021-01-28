import React from 'react'
import styled from 'styled-components'
import BarcodeScannerHelper from '../modules/packagesManager/components/barcodeScanner/BarcodeScannerHelper'
import PackagesManager from '../modules/packagesManager/PackagesManager'
import { getProducts } from '../modules/packagesManager/services'
import { Product } from '../modules/packagesManager/types'

const HeaderContainer = styled.header`
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid grey;
`

interface Props {
  initialProducts: Product[]
}

const IS_DEV = process.env.NODE_ENV !== 'production'

const Index: React.FC<Props> = ({ initialProducts }) => (
  <>
    <HeaderContainer>
      <p>UI challenge</p>
      {IS_DEV ? <BarcodeScannerHelper /> : null}
    </HeaderContainer>

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
