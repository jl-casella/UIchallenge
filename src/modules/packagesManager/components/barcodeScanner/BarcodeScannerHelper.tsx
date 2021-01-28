import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-left: 25px;

  display: flex;
  flex-direction: row;
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
      <input
        style={{ margin: '0px 5px' }}
        value={barcode}
        onChange={onBarcodeChange}
        onKeyDown={(e) => e.stopPropagation()}
      />
      <button onClick={onSubmit}>Submit</button>
    </Container>
  )
}

export default BarcodeScannerHelper
