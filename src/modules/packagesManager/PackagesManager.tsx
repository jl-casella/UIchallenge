import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import BarcodeScannerModal from './components/barcodeScanner/BarcodeScannerModal'
import PackagesPanel from './components/packagesPanel/PackagesPanel'
import ProductsPanel from './components/productsPanel/ProductsPanel'
import useBarcodeScanner from './hooks/useBarcodeScanner'
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

ReactModal.setAppElement('body')

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

  const {
    isSelectProductModalOpen,
    onSelectProductModalCancel,

    scannedSku,
    productsWithScannedSku,
    onScannedProductSelect,
  } = useBarcodeScanner(unpackedProducts, packProduct)

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
      <BarcodeScannerModal
        isOpen={isSelectProductModalOpen}
        scannedSku={scannedSku}
        productsWithScannedSku={productsWithScannedSku}
        onProductSelect={onScannedProductSelect}
        onCancel={onSelectProductModalCancel}
      />
    </Container>
  )
}

export default PackagesManager
