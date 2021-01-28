import { useCallback, useState } from 'react'
import { Product } from '../types'

const useProductsState = (initialProducts: Product[]) => {
  const [unpackedProducts, setUnpackedProducts] = useState<Product[]>(
    initialProducts
  )

  const removeProduct = useCallback((productToRemove: Product) => {
    setUnpackedProducts((products) => {
      return products
        .map((product) =>
          product.id === productToRemove.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    })
  }, [])

  const addProduct = useCallback((productToAdd: Product) => {
    setUnpackedProducts((unpackedProducts) => {
      const isProductOnUnpackedList = unpackedProducts.some(
        (product) => product.id === productToAdd.id
      )

      return isProductOnUnpackedList
        ? unpackedProducts.map((product) =>
            product.id === productToAdd.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        : [...unpackedProducts, { ...productToAdd, quantity: 1 }]
    })
  }, [])

  return {
    unpackedProducts,
    addProduct,
    removeProduct,
  }
}

export default useProductsState
