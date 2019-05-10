// import React from 'react'
// import { Link } from 'react-router-dom'
// import { history } from '../../../services'
//
// export default class RegisterComponent extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       user: {
//         userName: '',
//         userEmail: '',
//         userPass: '',
//       },
//       submitted: false,
//     }
//
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//
//   handleChange (event) {
//     const { name, value } = event.target
//     const { user } = this.state
//     this.setState({
//       user: {
//         ...user,
//         [name]: value,
//       },
//     })
//   }
//
//   handleSubmit (event) {
//     event.preventDefault()
//
//     this.setState({ submitted: true })
//     const { user } = this.state
//     if (user.userName && user.userEmail && user.userPass) {
//       console.log(user)
//       this.register(user).then(
//         user => {
//           history.push('/login')
//           history.go()
//         },
//         error => {
//           alert(error.toString())
//         }
//       )
//     }
//   }
//
//   register (user) {
//     return fetch(`http://101.132.188.238:8080/user/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     }).then(this.handleUserResponse)
//   }
//   handleUserResponse (response) {
//     return response.text().then(text => {
//       const data = text && JSON.parse(text)
//       if (data.code === 1) {
//         return data.result
//       } else {
//         const error = data && data.msg
//         return Promise.reject(error)
//       }
//     })
//   }
//
//   render () {
//     const { user, submitted } = this.state
//     return (
//       <div className='col-md-6 col-md-offset-3'>
//         <h2>RegisterComponent</h2>
//         <form name='form' onSubmit={this.handleSubmit}>
//           <div className={'form-group' + (submitted && !user.userEmail ? ' has-error' : '')}>
//             <label htmlFor='userEmail'>Email</label>
//             <input type='email' className='form-control' name='userEmail' value={user.userEmail}
//               onChange={this.handleChange} />
//             {submitted && !user.userEmail &&
//             <div className='help-block'>Username is required</div>
//             }
//           </div>
//           <div className={'form-group' + (submitted && !user.userName ? ' has-error' : '')}>
//             <label htmlFor='userName'>Username</label>
//             <input type='text' className='form-control' name='userName' value={user.userName}
//               onChange={this.handleChange} />
//             {submitted && !user.userName &&
//             <div className='help-block'>Username is required</div>
//             }
//           </div>
//           <div className={'form-group' + (submitted && !user.userPass ? ' has-error' : '')}>
//             <label htmlFor='userPass'>Password</label>
//             <input type='password' className='form-control' name='userPass' value={user.userPass}
//               onChange={this.handleChange} />
//             {submitted && !user.userPass &&
//             <div className='help-block'>Password is required</div>
//             }
//           </div>
//           <div className='form-group'>
//             <button className='btn btn-primary'>RegisterComponent</button>
//             <Link to='/login' className='btn btn-link'>Cancel</Link>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
// import React from 'react'
//
import {Link} from 'react-router-dom'
import {history} from '../../../services'
//
// export default class LoginComponent extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       email: '',
//       password: '',
//       submitted: false,
//     }
//
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//   handleChange (e) {
//     const { name, value } = e.target
//     this.setState({ [name]: value })
//   }
//
//   handleSubmit (e) {
//     e.preventDefault()
//
//     this.setState({ submitted: true })
//     const { email, password } = this.state
//     if (email && password) {
//       this.login(email, password).then(user => {
//         localStorage.setItem('user', JSON.stringify(user))
//         // console.log(user)
//         history.push('/')
//         history.go()
//       }, error => {
//         // console.log(error)
//         alert(error.toString())
//       })
//     }
//   }
//
//   login (email, password) {
//     return fetch(`http://101.132.188.238:8080/user/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({email, password}),
//     }).then(this.handleUserResponse)
//   }
//   handleUserResponse (response) {
//     return response.text().then(text => {
//       const data = text && JSON.parse(text)
//       if (data.code === 1) {
//         const user = data && data.result
//         return user
//       } else {
//         const error = data && data.msg
//         return Promise.reject(error)
//       }
//     })
//   }
//
//   render () {
//     const { email, password, submitted } = this.state
//     return (
//       <div className='col-md-6 col-md-offset-3'>
//         <h2>Login</h2>
//         <form name='form' onSubmit={this.handleSubmit}>
//           <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
//             <label htmlFor='email'>Email</label>
//             <input type='email' className='form-control' name='email' value={email} onChange={this.handleChange} />
//             {submitted && !email &&
//             <div className='help-block'>Email is required</div>
//             }
//           </div>
//           <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
//             <label htmlFor='password'>Password</label>
//             <input type='password' className='form-control' name='password' value={password}
//               onChange={this.handleChange} />
//             {submitted && !password &&
//             <div className='help-block'>Password is required</div>
//             }
//           </div>
//           <div className='form-group'>
//             <button className='btn btn-primary'>Login</button>
//             <Link to='/register' className='btn btn-link'>RegisterComponent</Link>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React from 'react';


class RegisterComponent extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.register(values).then(user => {
                        // localStorage.setItem('user', JSON.stringify(user))
                        // console.log(user)
                        history.push('/login')
                        history.go()
                    },
                    error => {
                        alert(error.toString())

                    });
            }
        });
    }

    register(user) {
        return fetch(`http://101.132.188.238:8080/user/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        }).then(this.handleUserResponse)
    }

    handleUserResponse(response) {
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


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    <p className="login-form-title">Kanban 看板</p>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userEmail', {
                        rules: [{required: true, message: '请输入邮箱!'}],
                    })(
                        <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="邮箱"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userPass', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                    或者 <Link to='/login'>现在登陆</Link>
                </Form.Item>
            </Form>
        );
    }
}

export default RegisterComponent = Form.create({name: 'normal_login'})(RegisterComponent);
