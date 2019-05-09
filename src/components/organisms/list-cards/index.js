import React from 'react'
import styled from 'styled-components'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import {string, func, bool, array} from 'prop-types'

import {CardFront, FormAddCard} from '../../molecules'

const Container = styled.div`
  min-height: 26px;
  flex: 1;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar-button {
    display: none;
  }
`

const ScrollView = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100%;
  flex: 1;
  padding: 0 8px;
`

class ListCards extends React.PureComponent {
    static propTypes = {
        listId: string,
        listType: string,
        onAddCard: func,
        onCloseForm: func,
        isFormShow: bool,
        getFormRef: func,
        cards: array,
    }

    render() {
        const {
            listId,
            listType,
            onAddCard,
            isFormShow,
            onCloseForm,
            getFormRef,
            cards,
            editable
        } = this.props

        return (
            <Droppable droppableId={listId} type={listType} ignoreContainerClipping>
                {provided => (
                    <Container innerRef={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps}>
                        <ScrollView>
                            {cards.map(card => (
                                <Draggable
                                    draggableId={card.cardId}
                                    key={card.cardId}
                                >
                                    {(dragProvided, dragSnapshot) => (
                                        <CardFront
                                            innerRef={dragProvided.innerRef}
                                            isDragging={dragSnapshot.isDragging}
                                            {...dragProvided.dragHandleProps}
                                            {...dragProvided.draggableProps}
                                            card={card}
                                            columnId={listId}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {editable ?
                                (isFormShow && (
                                    <FormAddCard
                                        innerRef={getFormRef}
                                        onClose={onCloseForm}
                                        onSubmit={onAddCard}
                                    />
                                )) : null
                            }
                        </ScrollView>
                    </Container>
                )}
            </Droppable>
        )
    }
}

export default ListCards
