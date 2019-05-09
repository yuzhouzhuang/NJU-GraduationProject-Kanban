import React from 'react'
import {object} from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {history} from '../services'

import {Header, BoardGrid} from '../components'
import getPaletteColor from '../services/getPaletteColor'
import {createBoard, getBoards} from '../firebase/boards'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Body = styled.main`
  flex: 1;
  background-color: ${getPaletteColor('shades', 0)};
  overflow-y: auto;
  padding: 56px;
`

class Home extends React.PureComponent {
    static propTypes = {
        theme: object.isRequired,
    }

    state = {
        boards: [],
    }

    componentDidMount() {
        // const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        // if (user) {
        getBoards().then(
            boards => {
                console.log(boards)
                this.setState({boards})
            }, error => {

            })
        console.log(this.state.boards)
        // } else {
        //     // history.push('/login')
        //     history.go()
        // }
    }

    // componentWillUnmount () {
    //   this.unsubcribe()
    // }

    onCreateBoard = closePortal => values => {
        createBoard(values)
        closePortal()
    }

    render() {
        const {theme} = this.props
        return (
            <Container>
                <Header background={theme.palette.blue[500]}/>
                <Body>
                    <BoardGrid boards={this.state.boards} onSubmit={this.onCreateBoard}/>
                </Body>
            </Container>
        )
    }
}

export default withTheme(Home)
