import React from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'
import getPaletteColor from '../../../services/getPaletteColor'
import { prop } from 'styled-tools'
import styled from 'styled-components'

import { Heading } from '../../atoms'

const Container = styled.div`
  border-radius: 3px;
  background: ${getPaletteColor('blue', 300)};
  width: 100%;
  height: 100%;
  padding: 8px;
  color: white;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: none;
    transition: background 0.3s ease;
  }
  &:hover::before {
    background: rgba(0, 0, 0, 0.05);
  }
`

const BoardItem = ({ name, id, ...props }) => {
  return (
    <Link to={{ pathname: `/b/${id}` }} style={{ textDecoration: 'none' }}>
      <Container {...props}>
        <Heading variant='h5'>{name}</Heading>
      </Container>
    </Link>
  )
}

BoardItem.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
}

export default BoardItem
