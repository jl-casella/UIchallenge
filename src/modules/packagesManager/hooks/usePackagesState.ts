import { useCallback, useMemo, useState } from 'react'
import { Package, Product } from '../types'

export const initialPackage: Package = { id: 0, products: [] }

const usePackagesState = () => {
  const [packages, setPackages] = useState<Package[]>([initialPackage])
  const [selectedPackageId, setSelectedPackageId] = useState<
    number | undefined
  >(initialPackage.id)

  const selectedPackage = useMemo(
    () =>
      packages.find(
        (productsPackage) => productsPackage.id === selectedPackageId
      ),
    [packages, selectedPackageId]
  )

  const selectPackage = useCallback(
    (packageId: number | undefined) => setSelectedPackageId(packageId),
    []
  )

  const addPackage = useCallback(() => {
    setPackages((prevPackages) => {
      const newPackageId = Math.max(...packages.map((p) => p.id + 1), 0)

      const newPackage: Package = {
        id: newPackageId,
        products: [],
      }

      setSelectedPackageId(newPackageId)
      return [...prevPackages, newPackage]
    })
  }, [packages])

  const removePackage = useCallback(
    (packageToRemoveId: number) => {
      setPackages((prevPackages) => {
        const updatedPackages = prevPackages.filter(
          (productsPackage) => productsPackage.id !== packageToRemoveId
        )

        if (selectedPackageId === packageToRemoveId) {
          selectPackage(undefined)
        }

        return updatedPackages
      })
    },
    [selectPackage, selectedPackageId]
  )

  const addProductToPackage = useCallback(
    (productToAdd: Product) => {
      setPackages((packages) => {
        const isProductInPackage = selectedPackage.products.some(
          (product) => product.id === productToAdd.id
        )

        const updatedProducts = isProductInPackage
          ? selectedPackage.products.map((product) =>
              product.id === productToAdd.id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            )
          : [...selectedPackage.products, { ...productToAdd, quantity: 1 }]

        return packages.map((productsPackage) =>
          productsPackage.id === selectedPackage.id
            ? { ...productsPackage, products: updatedProducts }
            : productsPackage
        )
      })
    },
    [selectedPackage]
  )

  const removeProductFromPackage = useCallback(
    (productToRemove: Product) => {
      setPackages((packages) => {
        const productInPackage = selectedPackage.products.find(
          (product) => product.id === productToRemove.id
        )

        const updatedProducts =
          productInPackage.quantity > 1
            ? selectedPackage.products.map((product) =>
                product.id === productToRemove.id
                  ? { ...product, quantity: product.quantity - 1 }
                  : product
              )
            : selectedPackage.products.filter(
                (product) => product.id !== productToRemove.id
              )

        return packages.map((productsPackage) =>
          productsPackage.id === selectedPackage.id
            ? { ...productsPackage, products: updatedProducts }
            : productsPackage
        )
      })
    },
    [selectedPackage]
  )

  return {
    packages,
    addPackage,
    removePackage,

    addProductToPackage,
    removeProductFromPackage,

    selectedPackage,
    selectPackage,
  }
}

export default usePackagesState
