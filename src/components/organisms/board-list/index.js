import React from 'react'
import {object} from 'prop-types'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {getCard, moveCard, updateCard} from '../../../firebase/boards'

import {
    getBoardList,
    createList,
    createCard,
    deleteList, getBoard, updateList
} from '../../../firebase/boards'
import List from '../list'
import InitialList from '../initial-list'

const BoardCanvas = styled.div`
  flex: 1;
  position: relative;
`

const BoardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 8px;
  padding-bottom: 8px;
  white-space: nowrap;
`

const Column = styled.div`
  width: 272px;
  height: 100%;
  margin: 0 4px;
  display: inline-block;
  vertical-align: top;
  &:first-child {
    margin-left: 8px;
  }
  &:last-child {
    margin-right: 8px;
  }
`

class BoardList extends React.PureComponent {
    static propTypes = {
        match: object,
    }

    state = {
        sortedList: [],
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.board)
        let boardId = nextProps.board.boardId
        // console.log(nextProps.board.columns)
        if (!boardId) {
            this.setState({sortedList: null})
            return
        } else {
            let sortedList = nextProps.board.columns.sort((a, b) => a.columnOrder - b.columnOrder)
            // console.log(sortedList)
            this.setState({
                sortedList,
            })
        }
    }

    onDragEnd = result => {
        const {destination, source, type, draggableId} = result

        if (!destination) {
            return
        }

        // const destinationIndex = destination.index
        // const sourceIndex = source.index

        // const { list, sortedList } = this.state
        // const mutatedList = { ...list }

        // if (type === 'LIST') {
        //     const destinationDroppableId = destination.droppableId
        //     const sourceDroppableId = source.droppableId
        //     console.log(destination)
        //     console.log(source)
        // const moveToRight = destinationIndex > sourceIndex
        // const moveToLeft = destinationIndex < sourceIndex
        // const notMove = destinationIndex === sourceIndex
        //
        // if (notMove) {
        //   return
        // }
        //
        // sortedList.map(item => {
        //   const itemIndex = item.index
        //
        //   if (item.index === sourceIndex) {
        //     mutatedList[item.id].index = destinationIndex
        //   }
        //
        //   if (
        //     moveToRight &&
        //     itemIndex <= destinationIndex &&
        //     itemIndex > sourceIndex
        //   ) {
        //     mutatedList[item.id].index -= 1
        //   }
        //
        //   if (
        //     moveToLeft &&
        //     itemIndex >= destinationIndex &&
        //     itemIndex < sourceIndex
        //   ) {
        //     mutatedList[item.id].index += 1
        //   }
        // })
        //
        // updateList(mutatedList)
        // }

        if (type === 'CARD') {
            const destinationDroppableId = destination.droppableId
            const sourceDroppableId = source.droppableId
            // const sourceList = mutatedList[sourceDroppableId]
            // const destinationList = mutatedList[destinationDroppableId]

            if (destinationDroppableId !== sourceDroppableId) {
                // Different list
                let dropList
                let last = false
                this.state.sortedList.forEach(list => {
                    last = false
                    if (list.columnId.toString() === destinationDroppableId.toString()) {
                        dropList = list
                        last = true
                    }
                })
                // console.log(dropList)
                if (dropList) {
                    if (dropList.columnWIP > dropList.cards.length) {
                        if (last) {
                            let movecard = {}
                            let column = {}
                            this.state.sortedList.forEach(list => {
                                // console.log(list)
                                if (list.columnId.toString() === sourceDroppableId.toString()) {
                                    column = list
                                }
                            })
                            column.cards.forEach(card => {
                                if (card.cardId.toString() === draggableId.toString()) {
                                    movecard = card
                                }
                            })
                            movecard.rate = 9;
                            // movecard.columnId = destinationDroppableId;
                            updateCard(movecard, this.props.board.boardId, draggableId, JSON.parse(localStorage.getItem('user')).userId).then(
                                card => moveCard(this.props.board.boardId, draggableId, sourceDroppableId, destinationDroppableId, last)
                            )
                        } else {
                            moveCard(this.props.board.boardId, draggableId, sourceDroppableId, destinationDroppableId, last)
                        }

                    } else {
                        alert("超过在制品限制")
                    }
                }

                // // Reorder sourceList.cards
                // Object.values(sourceList.cards).map(card => {
                //   if (card.index > sourceIndex) {
                //     sourceList.cards[card.id].index -= 1
                //   }
                // })
                //
                // const finalDestinationIndex = destinationIndex + 1
                //
                // // Add card to destinationList.cards
                // destinationList.cards = {
                //   ...destinationList.cards,
                //   [draggableId]: {
                //     ...sourceList.cards[draggableId],
                //     index: finalDestinationIndex,
                //     listId: destinationDroppableId,
                //   },
                // }
                //
                // // Reorder destinationList.cards
                // Object.values(destinationList.cards)
                //   .filter(({ id }) => id !== draggableId)
                //   .map(card => {
                //     if (card.index >= finalDestinationIndex) {
                //       destinationList.cards[card.id].index += 1
                //     }
                //   })
                //
                // // Delete card from sourceList.cards
                // delete sourceList.cards[draggableId]
            }

            // updateList(mutatedList)
        }
    }


    onCreateList = (columnName, columnOrder) => {
        let boardId
        if (localStorage.getItem('board')) {

            boardId = JSON.parse(localStorage.getItem('board')).boardId
            // boardId = localStorage.getItem('board').boardId
        }
        console.log(columnName + "," + columnOrder)
        createList({
            columnName,
            boardId: boardId,
            columnOrder,
            columnWIP: 3,
        })
    }

    onCreateCard = (listId, boardId) => ({title}) => {
        createCard({listId, boardId, title})
    }

    onRemoveList = listId => () => {
        deleteList({listId})
    }

    onUpdateList = list => title => {
        console.log(list)
        updateList(list.columnId, title, list.columnWIP)
    }

    isLast = order => {
        let last = true
        this.state.sortedList.forEach((list) => {
            if (list.columnOrder > order) {
                last = false
            }
        })
        return last
    }

    render() {
        const {sortedList} = this.state
        if (!sortedList) {
            return null
        }
        const elements = []
        let index = 1
        let lastId
        sortedList.forEach((list) => {
            lastId = list.columnId
        })
        sortedList.forEach((list) => {
            let cards = list.cards
            // console.log(cards)
            const sortedCards = cards.sort((a, b) => a.cardId - b.cardId)
            // console.log(sortedCards)
            elements.push(
                <Column key={list.columnId}>
                    <List
                        editable={this.props.editable}
                        isEdged={(index === 1 || index === sortedList.length)}
                        list={{
                            title: list.columnName,
                            id: list.columnId.toString(),
                            cards: sortedCards,
                            order: list.columnOrder,
                            wip: list.columnWIP
                        }}
                        lastid ={lastId}
                        onCreateCard={this.onCreateCard(list.columnId, this.props.board.boardId)}
                        onRemoveList={this.onRemoveList(list.id)}
                        onUpdateListTitle={this.onUpdateList(list)}
                    />
                </Column>,
            )
            index = index + 1
        })
        // console.log(sortedList.length)
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <BoardCanvas>
                    <Droppable droppableId='board' type='LIST' direction='horizontal'>
                        {provided => (
                            <BoardContent
                                innerRef={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {elements}
                                {provided.placeholder}
                                {this.props.editable ? (
                                    <Column>
                                        <InitialList listsize={sortedList.length} onCreate={this.onCreateList}/>
                                    </Column>) : null
                                }
                            </BoardContent>
                        )}
                    </Droppable>
                </BoardCanvas>
            </DragDropContext>
        )
    }
}

export default withRouter(BoardList)
