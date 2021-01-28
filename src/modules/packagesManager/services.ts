import getMockedProducts from "./mocks/getMockedProducts"
import { Product } from "./types"

export const getProducts = (): Promise<Product[]> =>
  Promise.resolve(getMockedProducts())
