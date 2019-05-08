import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Route,Router } from 'react-router-dom'

import 'sanitize.css/sanitize.css'
import './services/globalStyles'

import theme from './theme'
import ModalSwitch from './modal-switch'
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Route component={ModalSwitch} />
      </Router>
    </ThemeProvider>
  )
}

export default App
