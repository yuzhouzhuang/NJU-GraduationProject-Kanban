import React from 'react'
import { Link } from 'react-router-dom'
import { history } from '../../../services'

export default class LoginComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      submitted: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { email, password } = this.state
    if (email && password) {
      this.login(email, password).then(user => {
        localStorage.setItem('user', JSON.stringify(user))
        // console.log(user)
        history.push('/')
        history.go()
      }, error => {
        // console.log(error)
        alert(error.toString())
      })
    }
  }

  login (email, password) {
    return fetch(`http://localhost:8080/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password}),
    }).then(this.handleUserResponse)
  }
  handleUserResponse (response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text)
      if (data.code === 1) {
        const user = data && data.result
        return user
      } else {
        const error = data && data.msg
        return Promise.reject(error)
      }
    })
  }

  render () {
    const { email, password, submitted } = this.state
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Login</h2>
        <form name='form' onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' name='email' value={email} onChange={this.handleChange} />
            {submitted && !email &&
            <div className='help-block'>Email is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' value={password}
              onChange={this.handleChange} />
            {submitted && !password &&
            <div className='help-block'>Password is required</div>
            }
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>Login</button>
            <Link to='/register' className='btn btn-link'>Register</Link>
          </div>
        </form>
      </div>
    )
  }
}
