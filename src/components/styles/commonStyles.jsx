import styled from 'styled-components'

export const Button = styled.button`
 {
    width: 35%;
    background-color: rgb(247, 184, 12);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  :hover {
    background-color: #f37a17;
  }
  :disabled {
    background-color: gainsboro;
  }
`

export const Button1 = styled.button`
 {
    width: 100%;
    background-color: rgb(247, 184, 12);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  :hover {
    background-color: #f37a17;
  }
  :disabled {
    background-color: gainsboro;
  }
`

export const StyledInput = styled.input`
 {
    width: 35%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`
export const StyledTick = styled.button`
 {
  position: absolute;
  right: 150px;
  top: 50%;
  margin-top: -13px;
  z-index: 1033;
  background-color: #FFFFFF;
  display: block;
  border-radius: 50%;
  opacity: 0.8;
  line-height: 20px;
  font-size: 12px;
  width: 100px;
  height: 25px;
  outline: 0 !important;
  text-align: center;
  color:#000000;
  padding: 3px;
  font-weight: 300;
  box-shadow: 0;
   }
  :hover {
    opacity: 1; }
    :active {
      box-shadow: 0; }
`

export const StyledClose = styled.button`
{
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -13px;
  z-index: 1033;
  background-color: #FFFFFF;
  display: block;
  border-radius: 50%;
  opacity: 0.8;
  line-height: 20px;
  font-size: 12px;
  width: 100px;
  height: 25px;
  outline: 0 !important;
  text-align: center;
  color:#000000;
  padding: 3px;
  font-weight: 300;
  box-shadow: 0;
   }
  :hover {
    opacity: 1; }
    :active {
      box-shadow: 0; }
`