import React from 'react'
import ProductsTable from '../../../common/components/ProductsTable'
import { Package, Product } from '../../types'

interface Props {
  productsPackage: Package
  unpackProduct: (product: Product) => void
}

const PackageView: React.FC<Props> = ({ productsPackage, unpackProduct }) => {
  return productsPackage.products.length > 0 ? (
    <>
      <p>Click on the product to remove it from the package</p>
      <ProductsTable
        products={productsPackage.products}
        onRowClick={unpackProduct}
        actions={[{ text: '✖️', onClick: unpackProduct }]}
      />
    </>
  ) : (
    <p>Click on the product in the left window to pack it to the package</p>
  )
}

export default PackageView
