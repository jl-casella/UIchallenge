import { act, renderHook } from '@testing-library/react-hooks'
import _ from 'lodash'
import getMockedProducts from '../../mocks/getMockedProducts'
import { shipPackages } from '../../services'
import usePackagesManagerState from '../usePackagesManagerState'
import { initialPackage } from '../usePackagesState'

jest.mock('../../services')

describe('The usePackagesManagerState hook', () => {
  describe('Packing a product', () => {
    it('Packs a product into selected package on packProduct call (if there is only one package)', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.packProduct(getMockedProducts()[0]))

      expect(result.current.selectedPackage.products).toEqual([
        { ...getMockedProducts()[0], quantity: 1 },
      ])
    })

    it('Packs a product into selected package on packProduct call (if there is more than one package)', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.addPackage())
      act(() => result.current.packProduct(getMockedProducts()[0]))

      expect(result.current.selectedPackage.products).toEqual([
        { ...getMockedProducts()[0], quantity: 1 },
      ])
    })

    it('Packs two different products into package on packProduct call (when any package is selected)', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.packProduct(getMockedProducts()[0]))
      act(() => result.current.packProduct(getMockedProducts()[1]))

      expect(result.current.selectedPackage.products).toEqual([
        { ...getMockedProducts()[0], quantity: 1 },
        { ...getMockedProducts()[1], quantity: 1 },
      ])
    })

    it('Increases product quantity in the package on packProduct next call', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.packProduct(getMockedProducts()[0]))
      act(() => result.current.packProduct(getMockedProducts()[0]))

      expect(result.current.selectedPackage.products).toEqual([
        { ...getMockedProducts()[0], quantity: 2 },
      ])
    })

    it('Increases product quantity in the package on packProduct next call if there is other product in the package', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.packProduct(getMockedProducts()[1]))
      act(() => result.current.packProduct(getMockedProducts()[0]))
      act(() => result.current.packProduct(getMockedProducts()[0]))

      expect(result.current.selectedPackage.products).toEqual([
        { ...getMockedProducts()[1], quantity: 1 },
        { ...getMockedProducts()[0], quantity: 2 },
      ])
    })

    it('Reduces product`s quantity in unpacked products list on pack', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      const productToPack = getMockedProducts()[0]
      const initialProductQuantity = productToPack.quantity

      act(() => result.current.packProduct(productToPack))

      expect(
        result.current.unpackedProducts.find(
          (product) => product.id === productToPack.id
        ).quantity
      ).toBe(initialProductQuantity - 1)
    })

    it('Removes product from unpacked list if unpacked quantity is equal 0 (the product was packed quantity-times)', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      const productToPack = getMockedProducts()[0]
      const initialProductQuantity = productToPack.quantity

      _.times(initialProductQuantity, () =>
        act(() => result.current.packProduct(productToPack))
      )

      expect(
        result.current.unpackedProducts.find(
          (product) => product.id === productToPack.id
        )
      ).toBeUndefined()
    })

    it('Does nothing if no package is selected', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      const unpackedProducts = result.current.unpackedProducts
      const packages = result.current.packages

      act(() => result.current.selectPackage(undefined))
      act(() => result.current.packProduct(getMockedProducts()[0]))

      expect(result.current.unpackedProducts).toEqual(unpackedProducts)
      expect(result.current.packages).toEqual(packages)
    })
  })

  describe('Unpacking a product', () => {
    it('Removes a product from the selected package if quantity is equal 0', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.packProduct(getMockedProducts()[0]))
      expect(result.current.selectedPackage.products).toEqual([
        { ...getMockedProducts()[0], quantity: 1 },
      ])

      act(() => result.current.unpackProduct(getMockedProducts()[0]))

      expect(result.current.selectedPackage.products).toEqual([])
    })

    it('Reduces quantity of the product in the selected package on unpack (if quantity > 1)', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )
      const mockedProduct = getMockedProducts()[0]

      act(() => result.current.packProduct(mockedProduct))
      act(() => result.current.packProduct(mockedProduct))
      expect(result.current.selectedPackage.products).toEqual([
        { ...mockedProduct, quantity: 2 },
      ])

      act(() => result.current.unpackProduct(mockedProduct))

      expect(result.current.selectedPackage.products).toEqual([
        { ...mockedProduct, quantity: 1 },
      ])
    })

    it('Reduces quantity of the product in the selected package on unpack (if packages > 1 and products in package > 1)', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )
      const mockedProduct = getMockedProducts()[0]

      act(() => result.current.addPackage())
      act(() => result.current.packProduct(getMockedProducts()[1]))
      act(() => result.current.packProduct(mockedProduct))
      act(() => result.current.packProduct(mockedProduct))
      expect(result.current.selectedPackage.products).toEqual([
        { ...getMockedProducts()[1], quantity: 1 },
        { ...mockedProduct, quantity: 2 },
      ])

      act(() => result.current.unpackProduct(mockedProduct))

      expect(result.current.selectedPackage.products).toEqual([
        { ...getMockedProducts()[1], quantity: 1 },
        { ...mockedProduct, quantity: 1 },
      ])
    })

    it('Adds product to unpacked list if it was fully packed before', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      const product = getMockedProducts()[0]
      const initialProductQuantity = product.quantity

      _.times(initialProductQuantity, () =>
        act(() => result.current.packProduct(product))
      )
      expect(
        result.current.unpackedProducts.find((p) => p.id === product.id)
      ).toBeUndefined()

      act(() => result.current.unpackProduct(product))
      expect(
        result.current.unpackedProducts.find((p) => p.id === product.id)
      ).toEqual({ ...product, quantity: 1 })
    })

    it('Does nothing if no package is selected', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      const unpackedProducts = result.current.unpackedProducts
      const packages = result.current.packages

      act(() => result.current.selectPackage(undefined))
      act(() => result.current.unpackProduct(getMockedProducts()[0]))

      expect(result.current.unpackedProducts).toEqual(unpackedProducts)
      expect(result.current.packages).toEqual(packages)
    })
  })

  describe('Adding a package', () => {
    it('Adds a package on addPackage call', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )
      expect(result.current.packages).toHaveLength(1)

      act(() => result.current.addPackage())

      expect(result.current.packages).toHaveLength(2)
    })

    it('Selects a newly added package', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )
      expect(result.current.packages).toHaveLength(1)

      act(() => result.current.addPackage())
      const newPackageId = result.current.packages.filter(
        (p) => p.id !== initialPackage.id
      )[0].id

      expect(result.current.selectedPackage.id).toBe(newPackageId)
    })
  })

  describe('Removing a package', () => {
    it('Removes a package on removePackage call', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.removePackage(initialPackage.id))

      expect(result.current.packages).toHaveLength(0)
    })

    it('Resets package selection if removed package was selected', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.addPackage())
      const newPackageId = result.current.packages.find(
        (p) => p.id !== initialPackage.id
      ).id
      act(() => result.current.selectPackage(newPackageId))
      act(() => result.current.removePackage(newPackageId))

      expect(result.current.selectedPackage).toBeUndefined()
    })

    it('Keeps package selection when other package is removed', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.addPackage())
      const newPackageId = result.current.packages.find(
        (p) => p.id !== initialPackage.id
      ).id

      act(() => result.current.selectPackage(initialPackage.id))
      act(() => result.current.removePackage(newPackageId))

      expect(result.current.selectedPackage.id).toBe(initialPackage.id)
    })
  })

  describe('Selecting a package', () => {
    it('Selects initial package by default', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      expect(result.current.selectedPackage.id).toBe(initialPackage.id)
    })

    it('Selects package when id provided', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.addPackage())

      const newPackageId = result.current.packages.find(
        (productPackage) => productPackage.id !== initialPackage.id
      ).id
      expect(newPackageId).toBeDefined()

      act(() => result.current.selectPackage(newPackageId))
      expect(result.current.selectedPackage.id).toBe(newPackageId)
    })

    it('Deselects package when invoked with undefined', async () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      act(() => result.current.selectPackage(undefined))

      expect(result.current.selectedPackage).toBeUndefined()
    })
  })

  describe('Ship', () => {
    it('Does not allow to ship if all products are not packed', () => {
      const { result } = renderHook(() =>
        usePackagesManagerState(getMockedProducts())
      )

      expect(result.current.canShip).toBe(false)
    })

    it('Allows to ship packages if all products are packed', () => {
      const product = getMockedProducts()[3]
      const { result } = renderHook(() => usePackagesManagerState([product]))

      expect(result.current.canShip).toBe(false)

      _.times(product.quantity, () =>
        act(() => result.current.packProduct(product))
      )

      expect(result.current.canShip).toBe(true)
    })

    it('Calls ship service with all packages with products when ship method is invoked', () => {
      const mockedShipPackages = jest.fn()
      ;(shipPackages as jest.Mock).mockImplementationOnce(mockedShipPackages)

      const mockedProducts = getMockedProducts()
      const { result } = renderHook(() =>
        usePackagesManagerState(mockedProducts)
      )

      act(() => result.current.packProduct(mockedProducts[1]))
      act(() => result.current.packProduct(mockedProducts[2]))
      act(() => result.current.packProduct(mockedProducts[2]))

      act(() => result.current.addPackage())
      act(() => result.current.packProduct(mockedProducts[3]))

      act(() => result.current.addPackage())

      act(() => result.current.onShip())

      expect(mockedShipPackages).toHaveBeenCalledWith([
        {
          id: 0,
          products: [
            { ...mockedProducts[1], quantity: 1 },
            { ...mockedProducts[2], quantity: 2 },
          ],
        },
        {
          id: 1,
          products: [{ ...mockedProducts[3], quantity: 1 }],
        },
      ])
    })
  })
})
