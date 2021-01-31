import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import useBarcodeScanner from '../hooks/useBarcodeScanner'
import usePackagesManagerState from '../hooks/usePackagesManagerState'
import { Product } from '../types'
import NoMatchingProductsModal from './barcodeScanner/NoMatchingProductsModal'
import SelectProductModal from './barcodeScanner/SelectProductModal'
import PackagesPanel from './packagesPanel/PackagesPanel'
import ProductsPanel from './productsPanel/ProductsPanel'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;

  @media (max-width: 800px) {
    height: auto;
    flex-direction: column;
  }
`

interface Props {
  products: Product[]
}

ReactModal.setAppElement('body')

const PackagesManager: React.FC<Props> = ({ products }) => {
  const {
    unpackedProducts,

    packProduct,
    unpackProduct,

    selectedPackage,
    selectPackage,

    packages,
    addPackage,
    removePackage,

    canShip,
    onShip,
    showSuccessMessage,
  } = usePackagesManagerState(products)

  const {
    showSelectProductModal: isSelectProductModalOpen,
    onSelectProductModalCancel,

    scannedSku,
    productsWithScannedSku,
    onScannedProductSelect,

    showNoMatchingProductsModal,
    closeNoMatchingProductsModal,
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
        onShip={onShip}
        canShip={canShip}
        showSuccessMessage={showSuccessMessage}
      />
      <SelectProductModal
        isOpen={isSelectProductModalOpen}
        scannedSku={scannedSku}
        productsWithScannedSku={productsWithScannedSku}
        onProductSelect={onScannedProductSelect}
        onCancel={onSelectProductModalCancel}
      />
      <NoMatchingProductsModal
        scannedSku={scannedSku}
        isOpen={showNoMatchingProductsModal}
        onClose={closeNoMatchingProductsModal}
      />
    </Container>
  )
}

export default PackagesManager
