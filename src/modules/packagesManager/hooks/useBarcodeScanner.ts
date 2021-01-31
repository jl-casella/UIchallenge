import { useCallback, useEffect, useMemo, useState } from 'react'
import { Product } from '../types'

const isAllowedKey = (e: KeyboardEvent) => {
  return (
    (e.key >= 'a' && e.key <= 'z') ||
    (e.key >= '0' && e.key <= '9') ||
    e.key === '-'
  )
}

const useBarcodeScanner = (
  unpackedProducts: Product[],
  packProduct: (product: Product) => void
) => {
  const [showSelectProductModal, setShowSelectProductModal] = useState<boolean>(
    false
  )
  const [
    showNoMatchingProductsModal,
    setShowNoMatchingProductsModal,
  ] = useState<boolean>(false)
  const [scannedSku, setScannedSku] = useState<string>('')

  const productsWithScannedSku = useMemo(
    () => unpackedProducts.filter((product) => product.sku === scannedSku),
    [scannedSku, unpackedProducts]
  )
  const productsStartingWithProvidedSku = useMemo(
    () =>
      unpackedProducts.filter((product) => product.sku.startsWith(scannedSku)),
    [scannedSku, unpackedProducts]
  )

  const onClose = useCallback(() => {
    setScannedSku('')
    setShowSelectProductModal(false)
  }, [])

  useEffect(() => {
    if (productsWithScannedSku.length === 1) {
      packProduct(productsWithScannedSku[0])
      setScannedSku('')
    }

    if (productsWithScannedSku.length > 1) {
      setShowSelectProductModal(true)
    }

    if (
      unpackedProducts.length > 0 &&
      productsStartingWithProvidedSku.length === 0
    ) {
      setShowNoMatchingProductsModal(true)
    }
  }, [
    showSelectProductModal,
    onClose,
    packProduct,
    productsWithScannedSku,
    productsStartingWithProvidedSku.length,
    unpackedProducts.length,
  ])

  useEffect(() => {
    setScannedSku('')
  }, [unpackedProducts.length])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!showSelectProductModal && isAllowedKey(e)) {
        setScannedSku((prevValue) => prevValue + e.key)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [showSelectProductModal])

  const onScannedProductSelect = useCallback(
    (product: Product) => {
      packProduct(product)
      onClose()
    },
    [onClose, packProduct]
  )

  const closeNoMatchingProductsModal = useCallback(() => {
    setScannedSku('')
    setShowNoMatchingProductsModal(false)
  }, [])

  return {
    showSelectProductModal,

    scannedSku,
    productsWithScannedSku,

    onScannedProductSelect,
    onSelectProductModalCancel: onClose,

    showNoMatchingProductsModal,
    closeNoMatchingProductsModal,
  }
}

export default useBarcodeScanner
