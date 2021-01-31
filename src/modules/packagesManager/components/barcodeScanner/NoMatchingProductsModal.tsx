import React from 'react'
import styled from 'styled-components'
import Button from '../../../common/components/Button'
import Modal from '../../../common/components/Modal'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;

  width: 100%;
  height: 100%;
`

const CloseButton = styled(Button)`
  align-self: flex-end;
  margin-top: 25px;
  margin-bottom: 10px;
`

const Header = styled.h3`
  word-break: break-word;
`

interface Props {
  scannedSku: string
  isOpen: boolean
  onClose: () => void
}

const NoMatchingProductsModal: React.FC<Props> = ({
  scannedSku,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="60%" height="250px">
      <Container>
        <Header>Scanned SKU: {scannedSku}</Header>
        <p>There are no matching products for the provided SKU.</p>

        <CloseButton onClick={onClose}>Close</CloseButton>
      </Container>
    </Modal>
  )
}

export default NoMatchingProductsModal
