import { useCallback, useMemo } from 'react'
import { Product } from '../types'
import usePackagesState from './usePackagesState'
import useProductsState from './useProductsState'

const usePackagesManagerState = (products: Product[]) => {
  const {
    unpackedProducts,
    addProduct: addProductToUnpacked,
    removeProduct: removeProductFromUnpacked,
  } = useProductsState(products)

  const {
    packages,
    addPackage,
    removePackage,

    addProductToPackage,
    removeProductFromPackage,

    selectedPackage,
    selectPackage,

    onShip,
    showSuccessMessage,
  } = usePackagesState()

  const packProduct = useCallback(
    (product: Product) => {
      if (selectedPackage !== undefined) {
        addProductToPackage(product)
        removeProductFromUnpacked(product)
      }
    },
    [selectedPackage, addProductToPackage, removeProductFromUnpacked]
  )

  const unpackProduct = useCallback(
    (product: Product) => {
      if (selectedPackage !== undefined) {
        removeProductFromPackage(product)
        addProductToUnpacked(product)
      }
    },
    [addProductToUnpacked, removeProductFromPackage, selectedPackage]
  )

  const canShip = useMemo(
    () => unpackedProducts.length === 0 && packages.length > 0,
    [packages.length, unpackedProducts.length]
  )

  return {
    unpackedProducts,

    packages,
    addPackage,
    removePackage,

    selectedPackage,
    selectPackage,

    packProduct,
    unpackProduct,

    onShip,
    canShip,
    showSuccessMessage,
  }
}

export default usePackagesManagerState
