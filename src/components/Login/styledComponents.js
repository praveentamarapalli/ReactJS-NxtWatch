import styled from 'styled-components'

export const LoginAppBg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Roboto';
  padding: 10px;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 0px 8px 40px rgba(7, 7, 7, 0.08);
  padding: 50px 20px;
  width: 100%;
  min-width: 300px;
  max-width: 420px;
  border-radius: 10px;
`

export const Logo = styled.img`
  width: 150px;
  margin-bottom: 25px;
  align-self: center;
`

export const LabelButton = styled.label`
  color: #7d8595;
  margin-top: ${props => props.marginTop};
  font-weight: 500;
  font-size: 12px;
  color: ${props => props.color};
`

export const Input = styled.input`
  height: ${pops => pops.height};
  width: ${pops => pops.width};
  border: 1px solid #d6dfe8;
  border-radius: 4px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 15px;
  margin-right: ${props => props.marginRight};
  outline: none;
`

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  align-self: flex-start;
  margin-top: 5px;
`

export const CheckboxInput = styled.input`
  border: 1px solid #d6dfe8;
  border-radius: 4px;
  margin-bottom: 5px;
  padding-left: 15px;
  margin-right: ${props => props.marginRight};
  height: 18px;
  width: 18px;
`

export const LoginButton = styled.button`
  align-self: stretch;
  margin-top: 20px;
  border: none;
  height: 35px;
  border-radius: 4px;
  background-color: #2082f2;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`

export const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
`
