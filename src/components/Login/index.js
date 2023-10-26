import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {
  LoginAppBg,
  LoginForm,
  Logo,
  LabelButton,
  Input,
  CheckboxContainer,
  CheckboxInput,
  LoginButton,
  ErrorMsg,
} from './styledComponents'

class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    showPassword: false,
    showErrorMsg: false,
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeCheckboxStatus = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSuccessfulLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submittingForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.setState({
        showErrorMsg: true,
        errMsg: data.error_msg,
      })
    }
  }

  render() {
    const {username, password, showPassword, showErrorMsg, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <LoginAppBg>
        <LoginForm onSubmit={this.submittingForm}>
          <Logo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <LabelButton marginTop="10px" htmlFor="username">
            USERNAME
          </LabelButton>
          <Input
            value={username}
            height="40px"
            placeholder="Username"
            type="text"
            id="username"
            width="100%"
            onChange={this.onChangeUsername}
          />
          <LabelButton marginTop="10px" htmlFor="password">
            PASSWORD
          </LabelButton>
          <Input
            value={password}
            height="40px"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            width="100%"
            onChange={this.onChangePassword}
          />
          <CheckboxContainer>
            <CheckboxInput
              onChange={this.onChangeCheckboxStatus}
              margin="8px"
              type="checkbox"
              id="showpassword"
            />
            <LabelButton color="black" marginTop="0px" htmlFor="showpassword">
              Show Password
            </LabelButton>
          </CheckboxContainer>
          <LoginButton type="submit">Login</LoginButton>
          {showErrorMsg && <ErrorMsg>*{errMsg}</ErrorMsg>}
        </LoginForm>
      </LoginAppBg>
    )
  }
}

export default Login
