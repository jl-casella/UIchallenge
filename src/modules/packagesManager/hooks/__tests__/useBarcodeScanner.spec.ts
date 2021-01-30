import { fireEvent } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import getMockedProducts from '../../mocks/getMockedProducts'
import useBarcodeScanner from '../useBarcodeScanner'

describe('The userBarcodeScanner hook', () => {
  it('Pack product and resets scannedSKU if provided SKU matches', () => {
    const mockedProduct = getMockedProducts()[1]
    const mockedPackProduct = jest.fn()
    const { result } = renderHook(() =>
      useBarcodeScanner([mockedProduct], mockedPackProduct)
    )

    act(() => {
      for (const letter of mockedProduct.sku) {
        fireEvent.keyDown(document.body, { key: letter })
      }
    })

    expect(mockedPackProduct).toHaveBeenCalledWith(mockedProduct)
    expect(result.current.scannedSku).toBe('')
  })

  it('Opens modal if more than one product matches provided SKU', () => {
    const mockedProducts = getMockedProducts()
    const scannedSku = mockedProducts[0].sku
    const { result } = renderHook(() =>
      useBarcodeScanner(mockedProducts, () => {})
    )

    act(() => {
      for (const letter of scannedSku) {
        fireEvent.keyDown(document.body, { key: letter })
      }
    })

    expect(result.current.showSelectProductModal).toBe(true)
    expect(result.current.scannedSku).toBe(scannedSku)
  })

  it('Closes modal and resets scannedSku on onCancel call', () => {
    const mockedProducts = getMockedProducts()
    const scannedSku = mockedProducts[0].sku
    const { result } = renderHook(() =>
      useBarcodeScanner(mockedProducts, () => {})
    )

    act(() => {
      for (const letter of scannedSku) {
        fireEvent.keyDown(document.body, { key: letter })
      }
    })

    expect(result.current.showSelectProductModal).toBe(true)
    expect(result.current.scannedSku).toBe(scannedSku)

    act(() => result.current.onSelectProductModalCancel())

    expect(result.current.showSelectProductModal).toBe(false)
    expect(result.current.scannedSku).toBe('')
  })

  it('Packs selected product on onSelect call, closes the modal and resets sku', () => {
    const mockedPackProduct = jest.fn()
    const mockedProducts = getMockedProducts()
    const scannedSku = mockedProducts[0].sku
    const { result } = renderHook(() =>
      useBarcodeScanner(mockedProducts, mockedPackProduct)
    )

    act(() => {
      for (const letter of scannedSku) {
        fireEvent.keyDown(document.body, { key: letter })
      }
    })

    expect(result.current.showSelectProductModal).toBe(true)
    expect(result.current.scannedSku).toBe(scannedSku)

    act(() => result.current.onScannedProductSelect(mockedProducts[0]))

    expect(mockedPackProduct).toHaveBeenCalledWith(mockedProducts[0])
    expect(result.current.showSelectProductModal).toBe(false)
    expect(result.current.scannedSku).toBe('')
  })

  it('Does not change scannedSku on key press if modal is open', () => {
    const mockedProducts = getMockedProducts()
    const scannedSku = mockedProducts[0].sku
    const { result } = renderHook(() =>
      useBarcodeScanner(mockedProducts, () => {})
    )

    act(() => {
      for (const letter of scannedSku) {
        fireEvent.keyDown(document.body, { key: letter })
      }
    })

    expect(result.current.showSelectProductModal).toBe(true)
    expect(result.current.scannedSku).toBe(scannedSku)

    fireEvent.keyDown(document.body, { key: 'a' })

    expect(result.current.showSelectProductModal).toBe(true)
    expect(result.current.scannedSku).toBe(scannedSku)
  })

  describe('NoMatchingProductsModal', () => {
    it('Is opened if there are no matching products for the provided SKU', () => {
      const { result } = renderHook(() =>
        useBarcodeScanner(getMockedProducts(), () => {})
      )

      expect(result.current.showNoMatchingProductsModal).toBe(false)

      act(() => {
        fireEvent.keyDown(document.body, { key: 'z' })
      })

      expect(result.current.showNoMatchingProductsModal).toBe(true)
    })

    it('Closes and clears scannedSku on closeNoMatchingProductsModal', () => {
      const { result } = renderHook(() =>
        useBarcodeScanner(getMockedProducts(), () => {})
      )

      expect(result.current.showNoMatchingProductsModal).toBe(false)
      act(() => {
        fireEvent.keyDown(document.body, { key: '-' })
      })
      expect(result.current.showNoMatchingProductsModal).toBe(true)
      expect(result.current.scannedSku).toBe('-')

      act(() => result.current.closeNoMatchingProductsModal())
      expect(result.current.showNoMatchingProductsModal).toBe(false)
      expect(result.current.scannedSku).toBe('')
    })
  })

  describe('ScannedSKU', () => {
    it('Returns pressed keys as scannedSku property', () => {
      const { result } = renderHook(() =>
        useBarcodeScanner(getMockedProducts(), () => {})
      )

      act(() => {
        fireEvent.keyDown(document.body, { key: 'g' })
        fireEvent.keyDown(document.body, { key: 'r' })
      })

      expect(result.current.scannedSku).toBe('gr')
    })

    it('Scans numbers', () => {
      const { result } = renderHook(() =>
        useBarcodeScanner(getMockedProducts(), () => {})
      )

      act(() => {
        fireEvent.keyDown(document.body, { key: '1' })
      })

      expect(result.current.scannedSku).toBe('1')
    })

    it('Scans dashes', () => {
      const { result } = renderHook(() =>
        useBarcodeScanner(getMockedProducts(), () => {})
      )

      act(() => {
        fireEvent.keyDown(document.body, { key: '-' })
      })

      expect(result.current.scannedSku).toBe('-')
    })

    it('Does not scan special characters', () => {
      const { result } = renderHook(() =>
        useBarcodeScanner(getMockedProducts(), () => {})
      )

      act(() => {
        fireEvent.keyDown(document.body, { key: '_' })
        fireEvent.keyDown(document.body, { key: '*' })
        fireEvent.keyDown(document.body, { key: '/' })
        fireEvent.keyDown(document.body, { key: ':' })
      })

      expect(result.current.scannedSku).toBe('')
    })
  })
})
