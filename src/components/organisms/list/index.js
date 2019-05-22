import React from 'react'
import {ifProp} from 'styled-tools'
import styled, {css} from 'styled-components'
import {object, func} from 'prop-types'
import {Draggable, Droppable} from 'react-beautiful-dnd'

import getPaletteColor from '../../../services/getPaletteColor'
import ListHeader from '../list-header'
import ListFooter from '../list-footer'
import ListCards from '../list-cards'
import {
    Button, Modal, Form, Input, Radio, Select, InputNumber, Slider, DatePicker, Popconfirm
} from 'antd';
import {deleteList, updateCard, updateList} from "../../../firebase/boards";
import moment from "../../molecules/card-front";

const CollectionCreateForm = Form.create({
        name: 'form_in_modal',
        onFieldsChange(props, changedFields) {
            props.onChange(changedFields);
        }
        ,
        mapPropsToFields(props) {
            return {
                title: Form.createFormField({
                    ...props.title,
                    value: props.title.value,
                }),
                wip: Form.createFormField({
                    ...props.wip,
                    value: props.wip.value,
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
                    title="修改列信息"
                    okText="修改"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="列名称">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: '请选择名称!'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="在制品数量"
                        >
                            {getFieldDecorator('wip', {
                                rules: [
                                    {required: true, message: '请选择在制品数量!'},
                                ], initialValue: 3
                            })(
                                <InputNumber min={1} max={100}/>
                            )}
                        </Form.Item>
                    </Form>
                    <Popconfirm title="确认删除?" onConfirm={(record) => props.onDelete(record)}>
                        <Button type="danger" block>删除列</Button>
                    </Popconfirm>
                </Modal>
            );
        }
    )
;

const Container = styled.div`
  border-radius: 3px;
  background: ${getPaletteColor('shades', 100)};
  display: flex;
  flex-direction: column;
  max-height: 100%;
  ${ifProp(
    'isDragging',
    css`
      border: 1px solid ${getPaletteColor('shades', 300)};
      border-bottom-color: ${getPaletteColor('shades', 300)};
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    `
)};
`

class List extends React.PureComponent {
    static propTypes = {
        list: object.isRequired,
        onRemoveList: func,
        onCreateCard: func,
        onUpdateListTitle: func,
    }

    // static getDerivedStateFromProps ({ list: { cards } }) {
    //   const sortedCards = cards
    //     ? Object.values(cards).sort((a, b) => a.index > b.index)
    //     : []
    //   return {
    //     sortedCards,
    //     currentIndex:
    //       sortedCards.length > 0 ? sortedCards[sortedCards.length - 1].index : 0,
    //   }
    // }

    state = {
        open: false,
        currentIndex: 0,
        sortedCards: [],
        visible: false,
        fields: {
            title: {
                value: "",
            },
            wip: {
                value: "",
            },
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    componentDidMount = () => {
        const {list} = this.props
        if (list) {
            console.log(list)
            this.setState(
                {
                    fields: {
                        title: {
                            value: list.title,
                        },
                        wip: {
                            value: list.wip
                        }
                    }
                }
            )
        }
    }
    setFormState = open => () => {
        this.setState({open}, () => {
            if (open) {
                document.addEventListener('click', this.handleClickOutside)
            } else {
                document.removeEventListener('click', this.handleClickOutside)
            }
        })
    }

    handleClickOutside = event => {
        if (!this.state.open) {
            return
        }

        if (this.form.contains(event.target)) {
            return
        }

        this.setFormState(false)()
    }

    onAddCard = title => {
        const {onCreateCard} = this.props
        // const { currentIndex } = this.state

        onCreateCard({
            title
            // index: currentIndex + 1,
        })
    }

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
        // console.log('Received values of form: ', this.state.fields);
        // const {card, columnId, ...props} = this.props
        // let boardId
        // if (localStorage.getItem('board')) {
        //
        //     boardId = JSON.parse(localStorage.getItem('board')).boardId
        //     // boardId = localStorage.getItem('board').boardId
        // }
        //
        // let userId
        // if (localStorage.getItem('user')) {
        //
        //     userId = JSON.parse(localStorage.getItem('user')).userId
        //     // boardId = localStorage.getItem('board').boardId
        // }
        // console.log(this.state.)
        this.state.list = {
            ...this.props.list,
            title: this.state.fields.title.value,
            wip: this.state.fields.wip.value,
        }
        updateList(this.state.list.id, this.state.list.title, this.state.list.wip)
        // updateCard({
        //     ...this.state.list,
        // }, boardId, card.cardId, userId).then(card => {
        // }, error => {
        //     alert("错误")
        // })
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
    getFormRef = node => {
        this.form = node
    }

    handleDelete = () => {
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
        // console.log('Received values of form: ', this.state.fields);
        const {list, ...props} = this.props
        console.log(list)
        deleteList(list.id).then(list => {
        }, error => {
            alert("错误")
        })
        this.setState({visible: false});
    }

    render() {
        const {
            list: {title, id, wip, cards},
            onRemoveList,
            onUpdateListTitle,
            editable
        } = this.props

        const {open, sortedCards} = this.state
        const fields = this.state.fields;
        return (
            <Draggable draggableId={id}>
                {(provided, snapshot) => (
                    <Container
                        isDragging={snapshot.isDragging}
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Button
                            onClick={this.showModal}
                            style={{fontSize:'15px', minHeight:'50px', maxHeight:'50px'}}
                        >{this.props.isEdged ? title : (title + "(" + cards.length + "/" + wip + ")")}</Button>

                        <CollectionCreateForm
                            {...fields} onChange={this.handleFormChange}
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                            onDelete={this.handleDelete}
                        />
                        <ListCards
                            lastid={this.props.lastid}
                            editable={editable}
                            listId={id}
                            cards={cards}
                            listType='CARD'
                            isFormShow={open}
                            onAddCard={this.onAddCard}
                            getFormRef={this.getFormRef}
                            onCloseForm={this.setFormState(false)}
                        />
                        {editable ? (!open && <ListFooter onClick={this.setFormState(true)}/>) : null}
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default List
