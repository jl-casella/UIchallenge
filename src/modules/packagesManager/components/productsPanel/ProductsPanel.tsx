import React from 'react'
import styled from 'styled-components'
import ProductsTable from '../../../common/components/ProductsTable'
import { Product } from '../../types'

const Container = styled.div`
  flex: 1;
  padding: 20px;
  border-right: 1px solid grey;
`
interface Props {
  products: Product[]
  packProduct: (product: Product) => void
}

const ProductsPanel: React.FC<Props> = ({ products, packProduct }) => {
  return (
    <Container>
      <h3>Available products</h3>

      {products.length > 0 ? (
        <>
          <p>Click on the product to pack it to the selected package</p>
          <ProductsTable
            products={products}
            onRowClick={packProduct}
            actions={[{ icon: '➔', onClick: packProduct }]}
          />
        </>
      ) : (
        <p>All products are already packed</p>
      )}
    </Container>
  )
}

export default ProductsPanel
