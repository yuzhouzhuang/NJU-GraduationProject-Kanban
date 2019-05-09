import React from 'react'
import {Link} from 'react-router-dom'
import {object} from 'prop-types'
import {ifProp} from 'styled-tools'
import {css} from 'styled-components'
import theme from '../../../theme'
import moment from 'moment';
import 'moment/locale/zh-cn';

import getPaletteColor from '../../../services/getPaletteColor'
import {Paper, Paragraph} from '../../atoms'
// import { Box } from '../../utilities'
import {
    Button, Modal, Form, Input, Radio, Select, InputNumber, Slider, DatePicker
} from 'antd';
import {updateCard} from "../../../firebase/boards";
moment.locale('zh-cn');
const {Option} = Select;
const CollectionCreateForm = Form.create({
        name: 'form_in_modal',
        onFieldsChange(props, changedFields) {
            props.onChange(changedFields);
        }
        ,
        mapPropsToFields(props) {
            return {
                name: Form.createFormField({
                    ...props.name,
                    value: props.name.value,
                }),
                description: Form.createFormField({
                    ...props.description,
                    value: props.description.value,
                }),
                scale: Form.createFormField({
                    ...props.scale,
                    value: props.scale.value,
                }),
                progress: Form.createFormField({
                    ...props.progress,
                    value: props.progress.value,
                }),
                color: Form.createFormField({
                    ...props.color,
                    value: props.color.value,
                }),
                deadline: Form.createFormField({
                    ...props.deadline,
                    value: props.deadline.value,
                }),
            };
        },
        onValuesChange(_, values) {
            console.log(values);
        }
    })
    ((props) => {
            const {
                visible, onCancel, onCreate, form,
            } = props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="修改卡片信息"
                    okText="修改"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="卡片名称">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '请选择名称!'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="卡片详情">
                            {getFieldDecorator('description', {
                                rules: [
                                    {required: true, message: '请选择卡片详情!'},
                                ]
                            })(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item
                            label="工作项大小"
                        >
                            {getFieldDecorator('scale', {
                                rules: [
                                    {required: true, message: '请选择工作项大小!'},
                                ], initialValue: 3
                            })(
                                <InputNumber min={1} max={10}/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="完成进度"
                        >
                            {getFieldDecorator('progress', {
                                rules: [
                                    {required: true, message: '请选择进度!'},
                                ]
                            })(
                                <Slider  min={0} max={9} marks={{
                                    0: '开始', 3: '进行', 6: '收尾', 9: '完成',
                                }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="截止日期"
                        >
                            {getFieldDecorator('deadline', {
                                rules: [
                                    {required: true, message: '请选择截止日期！'},
                                ]
                            })(
                                <DatePicker
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="颜色"
                            hasFeedback
                        >
                            {getFieldDecorator('color', {
                                rules: [
                                    {required: true, message: '请选择卡片颜色!'},
                                ],
                            })(
                                <Select placeholder="请选择卡片颜色">
                                    <Option value="blue">蓝色</Option>
                                    <Option value="yellow">黄色</Option>
                                    <Option value="red">红色</Option>
                                    <Option value="green">绿色</Option>
                                    <Option value="orange">橘色</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    )
;

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
  font-size: 15px;
  overflow: hidden;
  word-wrap: break-word;
`

// const IconContainer = Box.extend`
//   color: ${getPaletteColor('shades', 400)};
// `

class CardFront extends React.PureComponent {

    state = {
        visible: false,
        fields: {
            name: {
                value: "",
            },
            description: {
                value: "",
            },
            scale: {
                value: "",
            },
            progress: {
                value: "",
            },
            color: {
                value: "",
            },
            deadline: {
                value: "",
            },
        }
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
        // const form = this.formRef.props.form;
        // form.validateFields((err, values) => {
        //     if (err) {
        //         return;
        //     }
        //
        //     console.log('Received values of form: ', values);
        //     form.resetFields();
        //     this.setState({visible: false});
        // });
        console.log('Received values of form: ', this.state.fields);
        const {card, columnId, ...props} = this.props
        let boardId
        if (localStorage.getItem('board')) {

            boardId = JSON.parse(localStorage.getItem('board')).boardId
            // boardId = localStorage.getItem('board').boardId
        }

        let userId
        if (localStorage.getItem('user')) {

            userId = JSON.parse(localStorage.getItem('user')).userId
            // boardId = localStorage.getItem('board').boardId
        }
        console.log(this.state.fields.deadline.value._i)
        this.state.card = {
            ...this.props.card,
            cardTitle : this.state.fields.name.value,
            cardDescription :this.state.fields.description.value,
            scale :this.state.fields.scale.value,
            rate :this.state.fields.progress.value,
            color:this.state.fields.color.value,
            deadline : this.state.fields.deadline.value._i
        }
        updateCard({
            ...this.state.card,
        }, boardId, card.cardId, userId).then(card=>{},error=>{alert("错误")})
        this.setState({visible: false});
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
        // console.log(this.formRef)
        // this.formRef.props.form.setFields({title: "1", description: "1"})
    }

    handleFormChange = (changedFields) => {
        this.setState(({fields}) => ({
            fields: {...fields, ...changedFields},
        }));
    }

    static propTypes = {
        card: object,
    }
    componentDidMount = () => {
        const {card, columnId, ...props} = this.props
        if (card) {
            console.log(card)
            this.setState(
                {
                    fields: {
                        name: {
                            value: card.cardTitle,
                        },
                        description: {
                            value: card.cardDescription,
                        },
                        scale: {
                            value: card.scale,
                        },
                        progress: {
                            value: card.rate,
                        },
                        color: {
                            value: card.color,
                        },
                        deadline: {
                            value: moment(card.deadline, 'YYYY-MM-DD'),
                        },
                    }
                }
            )
        }
    }

    render() {
        const {card, columnId, ...props} = this.props
        let boardId
        if (localStorage.getItem('board')) {

            boardId = JSON.parse(localStorage.getItem('board')).boardId
            // boardId = localStorage.getItem('board').boardId
        }
        const size = card.scale ? 50 + 30 * Math.log(card.scale) : 100;
        const fields = this.state.fields;

        // let color = getPaletteColor('shades', 100)
        // console.log(fields)
        return (
            <Container  {...props}
                        style={{background: theme.palette[card.color][100], height: size + 'px'}}>
                <Title onClick={this.showModal}>{card.cardTitle}</Title>
                <CollectionCreateForm
                    {...fields} onChange={this.handleFormChange}
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
