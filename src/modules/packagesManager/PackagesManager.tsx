import React from 'react'
import styled from 'styled-components'
import PackagesPanel from './components/packagesPanel/PackagesPanel'
import ProductsPanel from './components/productsPanel/ProductsPanel'
import usePackagesManagerState from './hooks/usePackagesManagerState'
import { Product } from './types'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`

interface Props {
  initialProducts: Product[]
}

const PackagesManager: React.FC<Props> = ({ initialProducts }) => {
  const {
    unpackedProducts,

    packProduct,
    unpackProduct,

    selectedPackage,
    selectPackage,

    packages,
    addPackage,
    removePackage,
  } = usePackagesManagerState(initialProducts)

  return (
    <Container>
      <ProductsPanel products={unpackedProducts} packProduct={packProduct} />
      <PackagesPanel
        packages={packages}
        selectedPackage={selectedPackage}
        addPackage={addPackage}
        removePackage={removePackage}
        selectPackage={selectPackage}
        unpackProduct={unpackProduct}
      />
    </Container>
  )
}

export default PackagesManager
