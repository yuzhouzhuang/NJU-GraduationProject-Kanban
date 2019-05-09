import React from 'react'
import styled from 'styled-components'
import { string, func } from 'prop-types'
import getPaletteColor from '../../../services/getPaletteColor'

import { Button } from '../../atoms'
// import Label from '../../atoms/icon/icons/Label'

const Container = styled.div`
  height: 48px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${getPaletteColor('blue', 300)};
`

const BoardHeader = ({ boardName, userList, onLeaveBoard }) => {
  return (
    <Container>
      <Button size='Small' iconText={boardName}/>
      用户列表:{userList}
      <Button icon='Close' iconText='Delete Board' onClick={onLeaveBoard}/>
    </Container>
  )
}

BoardHeader.propTypes = {
  boardName: string,
  onLeaveBoard: func,
}

export default BoardHeader
