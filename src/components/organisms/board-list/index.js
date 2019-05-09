import React from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { moveCard } from '../../../firebase/boards'

import {
  getBoardList,
  createList,
  createCard,
  deleteList, getBoard,
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
    if (!boardId) {
      this.setState({ sortedList: null })
      return
    } else {
      let sortedList = nextProps.board.columns.sort((a, b) => a.columnId - b.columnId)
      // console.log(sortedList)
      this.setState({
        sortedList,
      })
    }
  }

  onDragEnd = result => {
    const { destination, source, type, draggableId } = result

    if (!destination) {
      return
    }

    // const destinationIndex = destination.index
    // const sourceIndex = source.index

    // const { list, sortedList } = this.state
    // const mutatedList = { ...list }

    // if (type === 'LIST') {
    //   const moveToRight = destinationIndex > sourceIndex
    //   const moveToLeft = destinationIndex < sourceIndex
    //   const notMove = destinationIndex === sourceIndex
    //
    //   if (notMove) {
    //     return
    //   }
    //
    //   sortedList.map(item => {
    //     const itemIndex = item.index
    //
    //     if (item.index === sourceIndex) {
    //       mutatedList[item.id].index = destinationIndex
    //     }
    //
    //     if (
    //       moveToRight &&
    //       itemIndex <= destinationIndex &&
    //       itemIndex > sourceIndex
    //     ) {
    //       mutatedList[item.id].index -= 1
    //     }
    //
    //     if (
    //       moveToLeft &&
    //       itemIndex >= destinationIndex &&
    //       itemIndex < sourceIndex
    //     ) {
    //       mutatedList[item.id].index += 1
    //     }
    //   })
    //
    //   updateList(mutatedList)
    // }

    if (type === 'CARD') {
      const destinationDroppableId = destination.droppableId
      const sourceDroppableId = source.droppableId
      // const sourceList = mutatedList[sourceDroppableId]
      // const destinationList = mutatedList[destinationDroppableId]

      if (destinationDroppableId !== sourceDroppableId) {
        // Different list
        moveCard(this.props.board.boardId, draggableId, sourceDroppableId, destinationDroppableId)
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


  onCreateList = columnName => {
    const {
      match: { params },
    } = this.props
    createList({
      columnName,
      boardId: params.boardId,
      index: this.state.currentIndex + 1,
    })
  }

  onCreateCard = (listId, boardId) => ({ title }) => {
    createCard({ listId, boardId, title })
  }

  onRemoveList = listId => () => {
    deleteList({ listId })
  }

  onUpdateList = list => title => {
    // updateList({ [list.id]: { ...list, title } })
  }

  render() {
    const { sortedList } = this.state
    if (!sortedList) {
      return null
    }
    const elements = []
    sortedList.forEach((list) => {
      let cards = list.cards
      // console.log(cards)
      const sortedCards = cards.sort((a, b) => a.cardId - b.cardId)
      // console.log(sortedCards)
      elements.push(
        <Column key={list.columnId}>
          <List
            list={{ title: list.columnName, id: list.columnId.toString(), cards: sortedCards }}
            onCreateCard={this.onCreateCard(list.columnId, this.props.board.boardId)}
            onRemoveList={this.onRemoveList(list.id)}
            onUpdateListTitle={this.onUpdateList(list)}
          />
        </Column>,
      )
    })
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
                <Column>
                  <InitialList onCreate={this.onCreateList}/>
                </Column>
              </BoardContent>
            )}
          </Droppable>
        </BoardCanvas>
      </DragDropContext>
    )
  }
}

export default withRouter(BoardList)
