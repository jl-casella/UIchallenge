import React from 'react'
import styled from 'styled-components'
import Button from '../../../common/components/Button'
import Modal from '../../../common/components/Modal'
import ProductsTable from '../../../common/components/ProductsTable'
import { Product } from '../../types'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
`

const CancelButton = styled(Button)`
  align-self: flex-end;
  margin-top: 25px;
`

interface Props {
  isOpen: boolean
  onProductSelect: (product: Product) => void
  scannedSku: string
  productsWithScannedSku: Product[]
  onCancel: () => void
}

const SelectProductModal: React.FC<Props> = ({
  isOpen,
  scannedSku,
  onProductSelect,
  productsWithScannedSku,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} width="60%" height="400px">
      <Container>
        <h3>Scanned SKU: {scannedSku}</h3>
        <p>
          There is more than one product with provided SKU. Please click on the
          row to select the product you want to pack.
        </p>

        <ProductsTable
          onRowClick={onProductSelect}
          products={productsWithScannedSku}
          actions={[{ text: '➔', onClick: onProductSelect }]}
        />

        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </Container>
    </Modal>
  )
}

export default SelectProductModal
