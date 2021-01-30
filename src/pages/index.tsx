import React from 'react'
import styled from 'styled-components'
import BarcodeScannerHelper from '../modules/packagesManager/components/barcodeScanner/BarcodeScannerHelper'
import PackagesManager from '../modules/packagesManager/components/PackagesManager'
import { getProducts } from '../modules/packagesManager/services'
import { Product } from '../modules/packagesManager/types'

const HeaderContainer = styled.header`
  height: 60px;
  padding: 0 20px;
  display: flex;

  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid grey;

  @media (max-width: 800px) {
    flex-direction: column;

    height: auto;
    padding-bottom: 10px;
  }
`

const ContentContainer = styled.section`
  height: calc(100vh - 60px);
  overflow: hidden;

  @media (max-width: 800px) {
    height: 100%;
  }
`

interface Props {
  products: Product[]
}

const IS_DEV = process.env.NODE_ENV !== 'production'

const Index: React.FC<Props> = ({ products }) => (
  <>
    <HeaderContainer>
      <p>UI challenge</p>
      {IS_DEV ? <BarcodeScannerHelper /> : null}
    </HeaderContainer>

    <ContentContainer>
      <PackagesManager products={products} />
    </ContentContainer>
  </>
)

export async function getServerSideProps() {
  const data = await getProducts()

  return {
    props: {
      products: data,
    },
  }
}

export default Index
