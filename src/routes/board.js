import React from 'react'
import styled from 'styled-components'
import { object } from 'prop-types'
import getPaletteColor from '../services/getPaletteColor'
import { prop } from 'styled-tools'
import { Redirect } from 'react-router-dom'

import { Header, BoardHeader, BoardList } from '../components'
import { getBoard, deleteBoard } from '../firebase/boards'
// import getPaletteColor from '../services/getPaletteColor'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  background: ${getPaletteColor('blue', 300)};
`

const Body = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`

// const Card = styled.div`
//   height: 56px;
//   border-radius: 3px;
//   background: ${getPaletteColor('shades', 0)};
//   box-shadow: 0 1px 0 ${getPaletteColor('shades', 300)};
//   cursor: pointer;
//   margin-bottom: 8px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// `

class Board extends React.PureComponent {
  static propTypes = {
    match: object.isRequired,
  }

  state = {
    board: {},
    timer: {}
  }

  componentDidMount() {
    this.init()
    let board = this
    this.state.timer = setInterval(() => {
      board.init()
    }, 1000)
    // this.init()
  }

  componentWillUnmount(){
    if(this.state.timer!= null) {

      clearInterval(this.state.timer);

    }
  }

  init = () => {
    const {
      match: { params },
    } = this.props
    let boardId = params.boardId

    if (!boardId) {
      this.setState({ board: null })
      return
    }

    getBoard(boardId).then(board => {
      this.setState({ board: board })
      localStorage.setItem('board', JSON.stringify(board))
      // console.log(board)
      // console.log(localStorage.getItem('user'))
    })
  }


  // componentWillReceiveProps = (props) => {
  //   let board = this
  //   this.timer = setInterval(() => {
  //     board.init()
  //   }, 100)
  //
  // }
  // componentWillUnmount() {
  //   document.body.style.background = 'none'
  //   if (typeof this.unsubcribe === 'function') {
  //     this.unsubcribe()
  //   }
  // }

  onLeaveBoard = () => {
    deleteBoard(this.state.board.id)
  }

  render() {
    const { board } = this.state

    if (!board) {
      return <Redirect to={{ pathname: '/404' }}/>
    }

    // console.log(board)
    return (
      <Container>
        <Header/>
        <Body>
          <BoardHeader boardName={board.boardName} userList={board.ownerId} onLeaveBoard={this.onLeaveBoard}/>
          <BoardList board={board}/>
        </Body>
      </Container>
    )
  }
}

export default Board
