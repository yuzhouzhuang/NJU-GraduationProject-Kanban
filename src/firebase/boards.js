//import Firebase from '.'

export const createBoard = ({name}) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))

    return fetch(`http://101.132.188.238:8080/kanbans/kanban/${currentUser.userId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({boardName: name, ownerId: currentUser.userId}),
    }).then(handleCardUpdateResponse)
}

export const getBoards = () => {
    const requestOptions = {
        method: 'GET',
    }

    const ownerId = JSON.parse(localStorage.getItem('user')).userId

    return fetch(`http://101.132.188.238:8080/kanbans/owner/${ownerId}`, requestOptions).then(handleResponse)
}

export const getUserBoards = () => {
    const requestOptions = {
        method: 'GET',
    }

    const ownerId = JSON.parse(localStorage.getItem('user')).userId

    return fetch(`http://101.132.188.238:8080/kanbans/user/boardList/${ownerId}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        var boards = []
        for (var key in data) {
            boards.push({id: key, name: data[key]})
        }
        console.log(boards[0])
        return boards
    })
}

function handleKanbanResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        // console.log(data.result)
        return data.result
    })
}

export const getBoard = (boardId) => {
    return fetch(`http://101.132.188.238:8080/kanbans/${boardId}`, {
        method: 'GET',
    })
        .then(handleKanbanResponse)
    //
    // const boardRef = Firebase.database.ref('boards').child(boardId)
    // boardRef.on('value', snapshot => {
    //   const snapshotValue = snapshot.val()
    //   onBoardChange(snapshotValue)
    // })
    //
    // return () => boardRef.off('value')
}

export const deleteBoard = boardId => {
    // Firebase.database
    //   .ref('boards')
    //   .child(boardId)
    //   .remove()
}

export const getBoardList = (boardId, onListChange) => {
    // const listRef = Firebase.database
    //   .ref('list')
    //   .orderByChild('boardId')
    //   .equalTo(boardId)
    //
    // listRef.on('value', snapshot => {
    //   const snapshotValue = snapshot.val() || {}
    //
    //   onListChange(snapshotValue)
    // })

    // return () => listRef.off('value')
}

export const updateList = (columnId, columnName, columnWip) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    return fetch(`http://101.132.188.238:8080/kanban/column/modify/${columnId}/${currentUser.userId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({columnName, columnWip}),
    }).then(handleCardUpdateResponse)
}

export const createList = ({columnName, boardId, columnOrder, columnWIP}) => {
    // const currentUser = JSON.parse(localStorage.getItem('user'))

    return fetch(`http://101.132.188.238:8080/kanban/column/create/${boardId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({columnName, boardId, columnOrder, columnWIP}),
    }).then(handleCardUpdateResponse)
}

// export const updateList = data => {
//   return Firebase.database.ref('list').update(data)
// }

export const deleteList = (listId) => {
    return fetch(`http://101.132.188.238:8080/kanban/column/delete/${listId}`, {
        method: 'DELETE',
    }).then(handleCardUpdateResponse)
}

export const createCard = ({listId, boardId, title}) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    let card = {
        cardTitle: title,
        cardDescription: '新建卡片',
        creatorName: currentUser.userName,
        deadline: '2019-12-31 19:52:24',
        scale: 5,
        color: 'blue',
        creatorId: currentUser.userId
    }
    return fetch(`http://101.132.188.238:8080/kanban/card/create/${boardId}/${listId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(card),
    }).then(handleCardUpdateResponse)
}

export const deleteCard = (cardId, boardId) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    return fetch(`http://101.132.188.238:8080/kanban/card/delete/${boardId}/${cardId}/${currentUser.userId}`, {
        method: 'DELETE',
    }).then(handleCardUpdateResponse)
}

function handleCardResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        console.log(data.result)
        return data.result
    })
}


export const getCard = ({cardId}) => {
    return fetch(`http://101.132.188.238:8080/kanbans/${cardId}`, {
        method: 'GET',
    })
        .then(handleKanbanResponse)
}

export const updateCard = (data, boardId, cardId, userId) => {
    return fetch(`http://101.132.188.238:8080/kanban/card/modify/${boardId}/${cardId}/${userId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    }).then(handleCardUpdateResponse)
}


function handleCardUpdateResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (data.code === 1) {
            return null
        } else {
            const error = data && data.msg
            return Promise.reject(error)
        }
    })
}

export const moveCard = (boardId, cardId, sourceLaneId, targetLaneId, isFinish) => {
    const userId = JSON.parse(localStorage.getItem('user')).userId
    const version = (new Date()).getTime()
    const data = {
        cardId, sourceLaneId, targetLaneId, userId, version, isFinish: isFinish ? 1 : 0
    }
    return fetch(`http://101.132.188.238:8080/kanban/card/move/${boardId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    }).then(handleCardUpdateResponse)
}
