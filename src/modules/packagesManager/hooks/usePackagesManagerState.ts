import { useCallback } from 'react'
import { Product } from '../types'
import usePackagesState from './usePackagesState'
import useProductsState from './useProductsState'

const usePackagesManagerState = (initialProducts: Product[]) => {
  const {
    unpackedProducts,
    addProduct: addProductToUnpacked,
    removeProduct: removeProductFromUnpacked,
  } = useProductsState(initialProducts)

  const {
    packages,
    addPackage,
    removePackage,

    addProductToPackage,
    removeProductFromPackage,

    selectedPackage,
    selectPackage,
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

  return {
    unpackedProducts,

    packages,
    addPackage,
    removePackage,

    selectedPackage,
    selectPackage,

    packProduct,
    unpackProduct,
  }
}

export default usePackagesManagerState
