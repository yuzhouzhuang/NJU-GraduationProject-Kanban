import React from 'react'
import {Link} from 'react-router-dom'
import {object} from 'prop-types'
import {ifProp} from 'styled-tools'
import {css} from 'styled-components'
import theme from '../../../theme'

import getPaletteColor from '../../../services/getPaletteColor'
import {Paper, Paragraph} from '../../atoms'
// import { Box } from '../../utilities'
import {
    Button, Modal, Form, Input, Radio,
} from 'antd';

const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Please input the title of collection!'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description')(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item className="collection-create-form_last-form-item">
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value="public">Public</Radio>
                                    <Radio value="private">Private</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

const Container = Paper.extend`
  cursor: pointer;
  margin-bottom: 8px;
  outline: none;
  transition: background 85ms ease;

  &:hover {
    background: ${getPaletteColor('shades', 100)};
  }

  ${ifProp(
    'isDragging',
    css`
      border: 1px solid ${getPaletteColor('shades', 300)};
      border-bottom-color: ${getPaletteColor('shades', 300)};
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    `,
)};
`

const Title = Paragraph.extend`
  color: ${getPaletteColor('shades', 600)};
  margin: 0;
  overflow: hidden;
  word-wrap: break-word;
`

// const IconContainer = Box.extend`
//   color: ${getPaletteColor('shades', 400)};
// `

class CardFront extends React.PureComponent {

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
        // console.log(this.state.visible);
    }

    handleCancel = () => {
        // console.log("cancel");
        this.setState({visible: false});
        // this.state.visible = false;
        // console.log(this.state.visible);
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
        // console.log(this.formRef)
        // this.formRef.props.form.setFields({title: "1", description: "1"})
    }

    static propTypes = {
        card: object,
    }

    render() {
        const {card, columnId, ...props} = this.props
        let boardId
        if (localStorage.getItem('board')) {

            boardId = JSON.parse(localStorage.getItem('board')).boardId
            // boardId = localStorage.getItem('board').boardId
        }
        // let color = getPaletteColor('shades', 100)
        // console.log(color)
        return (
            <Container  {...props}
                       style={{background: theme.palette[card.color][100]}}>
                <Title onClick={this.showModal} >{card.cardTitle}</Title>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                {/* <IconContainer mt='8px'>
          <Icon name='Description' size='small' />
        </IconContainer> */}
            </Container>

        )
        // return (
        //     <Link
        //         to={{pathname: `/c/${boardId}/${columnId}/${card.cardId}`, state: {modal: true, card: card}}}
        //         style={{textDecoration: 'none'}}
        //     >
        //         <Container {...props}
        //                    style={{background: theme.palette[card.color][100]}}>
        //             <Title>{card.cardTitle}</Title>
        //             {/* <IconContainer mt='8px'>
        //   <Icon name='Description' size='small' />
        // </IconContainer> */}
        //         </Container>
        //     </Link>
        // )
    }
}

export default CardFront
