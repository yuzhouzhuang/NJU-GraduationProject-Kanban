import React from 'react'
import { object } from 'prop-types'
import { prop } from 'styled-tools'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import getPaletteColor from '../../../services/getPaletteColor'
// import AuthContext from '../../../context/auth'
import { Button, Heading } from '../../atoms'
import { Box } from '../../utilities'

const NavSection = Box.extend`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 4px;
  gap: 4px;
`

const Container = styled.header`
  padding: 8px;
  width: 100%;
  background: ${getPaletteColor('blue', 500)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Header = ({ history, ...props }) => {
  return (
    <Container {...props}>
      <Button
        iconText='Boards'
        onClick={() => history.push('/')}
      />

      <Heading variant='h5' style={{ color: 'white', userSelect: 'none' }}>
        Kanban Board
      </Heading>

      <NavSection>
        <Button iconText='Logout' onClick={() => {
          localStorage.removeItem('user')
          history.push('/')
        }}/>
      </NavSection>
    </Container>
  )
}

Header.propTypes = {
  history: object.isRequired,
}

export default withRouter(Header)
