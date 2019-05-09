import React from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { history } from '../services'
import getPaletteColor from '../services/getPaletteColor'
import { getCard, getList, updateCard, deleteCard } from '../firebase/boards'
import {
  Backdrop,
  Box,
  Icon,
  Button,
  Heading,
  Textarea,
  FormAddDescription,
} from '../components'

const Container = styled.div`
  max-width: 728px;
  width: 100%;
  min-width: 300px;
  margin: 48px 0 80px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  background: ${getPaletteColor('shades', 100)};
  z-index: 25;
  padding: 8px 16px 16px 8px;
`

const Section = Box.extend`
  display: grid;
  grid-template-areas: 'icon content';
  grid-template-columns: 32px 1fr;
  grid-gap: 8px;
  gap: 8px;
  margin-bottom: 8px;
`

const IconBox = Box.extend`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getPaletteColor('shades', 400)};
  grid-area: icon;
`

const ContentBox = Box.extend`
  display: flex;
  flex-direction: column;
`

const ContentTitle = Box.extend``

const TitleInput = Textarea.extend`
  background: transparent;
  min-height: 24px;
  height: 26px;
  resize: none;
  border: 1px solid transparent;
  box-shadow: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  overflow: hidden;
  word-wrap: break-word;
  padding: 0;
  margin-top: 2px;

  &:focus {
    background: rgba(255, 255, 255, 0.85);
  }
`

const ButtonClose = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  color: ${getPaletteColor('shades', 400)};
  background: none;
  &:hover,
  &:focus {
    background: none;
    color: ${getPaletteColor('shades', 500)};
  }
`

class Card extends React.PureComponent {
  static propTypes = {
    match: object,
    history: object,
  }

  state = {
    card: {},
    list: {},
    title: '',
  }

  componentDidMount() {
    const {
      match: { params },
      history,
    } = this.props

    console.log(history.location.state)
    this.setState({ card: history.location.state.card, title: history.location.state.card.cardTitle })

    const cardId = params.cardId
    const columnId = params.columnId
    const boardId = params.boardId
    // console.log(boardId)
    // if (!cardId) {
    //   this.setState({ card: null })
    //   return
    // }

    // this.unsubcribeCard = getCard({
    //   listId,
    //   cardId,
    //   onCardChange: card =>
    //     this.setState({ card, title: card ? card.title : '' }),
    // })
    //
    // this.unsubcribeList = getList(listId, list => this.setState({ list }))

    document.addEventListener('keydown', this.handleKeydown)
  }

  // componentWillUnmount () {
  //   if (typeof this.unsubcribeCard === 'function') {
  //     this.unsubcribeCard()
  //   }
  //   if (typeof this.unsubcribeList === 'function') {
  //     this.unsubcribeList()
  //   }
  //   document.removeEventListener('keydown', this.handleKeydown)
  // }

  handleKeydown = event => {
    const { card } = this.state
    const { history, match: { params } } = this.props
    console.log(params.boardId)
    if (event.which === 27 && event.target.nodeName === 'BODY') {
      history.push(`/b/${params.boardId}`)
    }
  }

  onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.onCloseCard()
    }
  }

  onCloseCard = () => {
    const { card } = this.state
    const { history, match: { params } } = this.props
    history.push(`/b/${params.boardId}`)
  }

  onDeleteCard = () => {
    deleteCard(this.state.card.cardId, this.props.match.params.boardId)
    history.push(`/b/${this.props.match.params.boardId}`)
    // history.go()
  }

  onSubmitDescription = cardDescription => {
    const ownerId = JSON.parse(localStorage.getItem('user')).userId
    this.state.card.cardDescription = cardDescription
    updateCard({
      ...this.state.card,
    }, this.props.match.params.boardId, this.props.match.params.cardId, ownerId)
    history.push('/b/' + this.props.match.params.boardId)
    // history.go()
  }

  onSubmitScale = scale => {
    const ownerId = JSON.parse(localStorage.getItem('user')).userId
    this.state.card.scale = scale
    updateCard({ ...this.state.card }, this.props.match.params.boardId, this.props.match.params.cardId, ownerId)
    history.push('/b/' + this.props.match.params.boardId)
    // history.go()
  }

  getInputRef = node => {
    this.input = node
  }

  resizeInput = () => {
    this.input.style.height = 'auto'
    this.input.style.height = `${this.input.scrollHeight}px`
    this.input.style.height = `${
      this.input.scrollHeight <= 46 ? 26 : this.input.scrollHeight
      }px`
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value }, this.resizeInput)

  }

  onBlur = () => {
    this.resizeInput()
    const cardTitle = String(this.state.title).trim()
    if (cardTitle) {
      const ownerId = JSON.parse(localStorage.getItem('user')).userId
      this.state.card.cardTitle = cardTitle
      updateCard({
        ...this.state.card,
      }, this.props.match.params.boardId, this.props.match.params.cardId, ownerId)
      history.push('/b/' + this.props.match.params.boardId)
      // history.go()
    }
  }

  onKeyDown = event => {
    if (event.which === 13 || event.which === 27) {
      this.input.blur()
    }
  }

  render() {
    const { card } = this.state

    if (!card) {
      return <Redirect to='/'/>
    }

    return (
      <Backdrop onClick={this.onBackdropClick}>
        {card.cardId && (
          <Container>
            <ButtonClose icon='Close' onClick={this.onCloseCard}/>
            <Section>
              <IconBox>
                <Icon name='Card'/>
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <TitleInput
                    value={this.state.title}
                    innerRef={this.getInputRef}
                    onChange={this.onChangeTitle}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur}
                  />
                </ContentTitle>
              </ContentBox>
            </Section>
            <Section>
              <IconBox>
                <Icon name='Card'/>
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <Heading variant='h6' style={{ marginTop: 6 }}>
                    描述
                  </Heading>
                </ContentTitle>
                <FormAddDescription
                  description={this.state.card.cardDescription}
                  onSubmit={this.onSubmitDescription}
                />
              </ContentBox>
            </Section>
            <Section>
              <IconBox>
                <Icon name='Card'/>
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <Heading variant='h6' style={{ marginTop: 6 }}>
                    工作项大小
                  </Heading>
                </ContentTitle>
                <FormAddDescription
                  description={card.scale.toString()}
                  onSubmit={this.onSubmitScale}
                />
              </ContentBox>
            </Section>
            <Section>
              <IconBox>
                <Icon name='Card'/>
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <Heading variant='h6' style={{ marginTop: 6 }}>
                    创建者:{card.creatorName}
                  </Heading>
                </ContentTitle>
              </ContentBox>
            </Section>
            <Section>
              <IconBox>
                <Icon name='Card'/>
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <Heading variant='h6' style={{ marginTop: 6 }}>
                    截止日期: {card.deadline}
                  </Heading>
                </ContentTitle>
              </ContentBox>
            </Section>
            <Section>
              <IconBox>
                <Icon name='Card'/>
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <Heading variant='h6' style={{ marginTop: 6 }}>
                    颜色: {card.color}
                  </Heading>
                </ContentTitle>
              </ContentBox>
            </Section>
            <Section>
              <IconBox>
                <Icon name='Collections'/>
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <Heading variant='h6' style={{ marginTop: 6 }}>
                  </Heading>
                </ContentTitle>
                <Box mt='8px'>
                  <Button onClick={this.onDeleteCard}>
                    Delete
                  </Button>
                </Box>
              </ContentBox>
            </Section>
          </Container>
        )}
      </Backdrop>
    )
  }
}

export default Card
