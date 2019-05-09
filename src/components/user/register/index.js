import React from 'react'
import { Link } from 'react-router-dom'
import { history } from '../../../services'

export default class RegisterComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        userName: '',
        userEmail: '',
        userPass: '',
      },
      submitted: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const { name, value } = event.target
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    this.setState({ submitted: true })
    const { user } = this.state
    if (user.userName && user.userEmail && user.userPass) {
      console.log(user)
      this.register(user).then(
        user => {
          history.push('/login')
          history.go()
        },
        error => {
          alert(error.toString())
        }
      )
    }
  }

  register (user) {
    return fetch(`http://101.132.188.238:8080/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then(this.handleUserResponse)
  }
  handleUserResponse (response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text)
      if (data.code === 1) {
        return data.result
      } else {
        const error = data && data.msg
        return Promise.reject(error)
      }
    })
  }

  render () {
    const { user, submitted } = this.state
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Register</h2>
        <form name='form' onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !user.userEmail ? ' has-error' : '')}>
            <label htmlFor='userEmail'>Email</label>
            <input type='email' className='form-control' name='userEmail' value={user.userEmail}
              onChange={this.handleChange} />
            {submitted && !user.userEmail &&
            <div className='help-block'>Username is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !user.userName ? ' has-error' : '')}>
            <label htmlFor='userName'>Username</label>
            <input type='text' className='form-control' name='userName' value={user.userName}
              onChange={this.handleChange} />
            {submitted && !user.userName &&
            <div className='help-block'>Username is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !user.userPass ? ' has-error' : '')}>
            <label htmlFor='userPass'>Password</label>
            <input type='password' className='form-control' name='userPass' value={user.userPass}
              onChange={this.handleChange} />
            {submitted && !user.userPass &&
            <div className='help-block'>Password is required</div>
            }
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>Register</button>
            <Link to='/login' className='btn btn-link'>Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
}
