import getMockedProducts from './mocks/getMockedProducts'
import { Package, Product } from './types'

export const getProducts = (): Promise<Product[]> =>
  Promise.resolve(getMockedProducts())

export const shipPackages = (packages: Package[]) =>
  console.log(JSON.stringify(packages))
