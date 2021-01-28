import { useCallback, useEffect, useMemo, useState } from 'react'
import { Product } from '../types'

const useBarcodeScanner = (
  unpackedProducts: Product[],
  packProduct: (product: Product) => void
) => {
  const [
    isSelectProductModalOpen,
    setIsSelectProductModalOpen,
  ] = useState<boolean>(false)
  const [scannedSku, setScannedSku] = useState<string>('')
  const productsWithScannedSku = useMemo(
    () => unpackedProducts.filter((product) => product.sku === scannedSku),
    [scannedSku, unpackedProducts]
  )

  const onClose = useCallback(() => {
    setScannedSku('')
    setIsSelectProductModalOpen(false)
  }, [])

  useEffect(() => {
    if (productsWithScannedSku.length === 1) {
      packProduct(productsWithScannedSku[0])
      setScannedSku('')
    }

    if (productsWithScannedSku.length > 1) {
      setIsSelectProductModalOpen(true)
    }
  }, [isSelectProductModalOpen, onClose, packProduct, productsWithScannedSku])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isSelectProductModalOpen) {
        setScannedSku((prevValue) => prevValue + e.key)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isSelectProductModalOpen])

  const onScannedProductSelect = useCallback(
    (product: Product) => {
      packProduct(product)
      onClose()
    },
    [onClose, packProduct]
  )

  return {
    isSelectProductModalOpen,

    scannedSku,
    productsWithScannedSku,

    onScannedProductSelect,
    onSelectProductModalCancel: onClose,
  }
}

export default useBarcodeScanner
