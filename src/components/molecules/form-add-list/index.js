import React from 'react'
import styled from 'styled-components'
import {string, func, node} from 'prop-types'

import getPaletteColor from '../../../services/getPaletteColor'
// import {Button, Input} from 'antd'
import {Button, Input, InputNumber, Form} from "antd";

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   background: ${getPaletteColor('shades', 200)};
//   height: auto;
//   width: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   padding: 4px;
//   border-radius: 3px;
//   transition: height 0.3s ease;
// `

const Action = styled.div`
  margin-top: 4px;
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  grid-gap: 4px;
  justify-items: start;
  justify-content: start;
  align-items: center;
`

const ButtonClose = styled(Button)`
  color: ${getPaletteColor('shades', 400)};
  background: transparent;
`

class FormAddInline extends React.PureComponent {
    static propTypes = {
        children: node,
        actionContent: string,
        onSubmit: func,
        onClose: func,
    }

    state = {
        title: '',
        order: 2,
    }

    onChangeTitle = event => {
        this.setState({title: event.target.value})
    }

    onChangeOrder = event => {
        this.setState({order: event})
    }

    onSubmit = event => {
        event.preventDefault()
        const {title, order} = this.state
        if (this.props.onSubmit && Boolean(title)) {
            this.props.onSubmit(title, order)
        }
    }

    render() {
        const {children, actionContent, onClose, ...props} = this.props
        let size = 3
        size = this.props.listsize
        // console.log(size)
        return (
            <Form {...props} onSubmit={this.onSubmit}>
                <Form.Item>
                    <Input
                        placeholder='请输入列名称'
                        // style={{fontWeight: 700}}
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                    />
                </Form.Item>
                <Form.Item>
                    <InputNumber onChange={this.onChangeOrder} placeholder='请输入列的位置' min={2} max={size}
                                 value={this.state.order}/>
                    <Button onClick={this.onSubmit} htmlType="submit" type='primary'>
                        增加列
                    </Button>
                    {/*<ButtonClose type='button' icon='Close' onClick={onClose}/>*/}
                </Form.Item>
            </Form>
        )
    }
}

export default FormAddInline
