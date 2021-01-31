import React from 'react'
import styled from 'styled-components'
import { Product } from '../../packagesManager/types'

const Table = styled.table`
  width: 100%;
  border: 1px solid grey;
  border-collapse: collapse;

  thead {
    background-color: #bebebe;
  }

  td {
    cursor: pointer;
    height: 31px;
  }

  th,
  td {
    padding: 2px 5px;
    border: 1px solid grey;
  }
`

const ActionsCell = styled.td`
  text-align: center;
`

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: default;
`

interface Props {
  products: Product[]
  onRowClick: (product: Product) => void
  actions?: {
    text: string
    onClick: (product: Product) => void
  }[]
}

const ProductsTable: React.FC<Props> = ({ products, onRowClick, actions }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>sku</th>
          <th>location</th>
          <th>quantity</th>
          {actions ? <th>actions</th> : null}
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id} onClick={() => onRowClick(product)}>
            <td>{product.id}</td>
            <td>{product.sku}</td>
            <td>{product.location}</td>
            <td>{product.quantity}</td>
            {actions ? (
              <ActionsCell onClick={(e) => e.stopPropagation()}>
                <ActionsContainer>
                  {actions.map((action) => (
                    <div
                      key={action.text}
                      onClick={() => action.onClick(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      {action.text}
                    </div>
                  ))}
                </ActionsContainer>
              </ActionsCell>
            ) : null}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ProductsTable
