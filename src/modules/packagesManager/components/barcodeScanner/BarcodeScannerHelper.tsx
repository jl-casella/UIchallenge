import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../common/components/Button'

const Container = styled.div`
  margin-left: 25px;

  display: flex;
  flex-direction: row;
  align-items: center;
`

const BarcodeInput = styled.input`
  margin: 0px 5px;
  height: 32px;

  border: 1px solid black;
`

const BarcodeScannerHelper = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [barcode, setBarcode] = useState<string>('')

  const onBarcodeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBarcode(value)
  }, [])

  const onSubmit = useCallback(() => {
    for (const letter of barcode) {
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: letter,
        })
      )
    }
    setBarcode('')
  }, [barcode])

  return (
    <Container ref={containerRef}>
      <div>[Dev Mode]: Enter a barcode:</div>
      <BarcodeInput
        value={barcode}
        onChange={onBarcodeChange}
        onKeyDown={(e) => e.stopPropagation()}
        placeholder="Fill in the SKU..."
      />
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  )
}

export default BarcodeScannerHelper
