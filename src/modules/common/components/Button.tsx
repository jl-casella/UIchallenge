import styled from 'styled-components'

const Button = styled.button`
  align-self: flex-end;

  border: 1px solid black;
  padding: 5px 10px;
  height: 32px;

  background-color: white;

  font-size: 14px;

  cursor: pointer;

  :focus {
    outline: none;
  }
`

export default Button
