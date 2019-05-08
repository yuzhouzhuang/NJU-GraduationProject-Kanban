import React from 'react'
import { Link } from 'gatsby'
import { object } from 'prop-types'
import { ifProp } from 'styled-tools'
import { css } from 'styled-components'

import getPaletteColor from '../../../services/getPaletteColor'
import { Paper, Paragraph } from '../../atoms'
// import { Box } from '../../utilities'

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
  overflow: hidden;
  word-wrap: break-word;
`

// const IconContainer = Box.extend`
//   color: ${getPaletteColor('shades', 400)};
// `

class CardFront extends React.PureComponent {
  static propTypes = {
    card: object,
  }

  render() {
    const { card, columnId, ...props } = this.props
    let boardId
    if (localStorage.getItem('board')) {

      boardId = JSON.parse(localStorage.getItem('board')).boardId
      // boardId = localStorage.getItem('board').boardId
    }
    // let color = getPaletteColor(card.color, 100)
    // console.log(color)
    return (
      <Link
        to={{ pathname: `/c/${boardId}/${columnId}/${card.cardId}`, state: { modal: true, card: card } }}
        style={{ textDecoration: 'none' }}
      >
        <Container {...props}
                   style={{ background: card.color ==='blue'? '#BCD9EA' : '#FAF3C0' }}>
          <Title>{card.cardTitle}</Title>
          {/* <IconContainer mt='8px'>
          <Icon name='Description' size='small' />
        </IconContainer> */}
        </Container>
      </Link>
    )
  }
}

export default CardFront
