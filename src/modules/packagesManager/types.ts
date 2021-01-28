export interface Product {
  id: number
  quantity: number
  sku: string
  location: string
}

export interface Package {
  id: number
  products: Product[]
}
