import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import { ThemeProvider } from 'styled-components'
import { Route,Router } from 'react-router-dom'

import 'sanitize.css/sanitize.css'
import './services/globalStyles'

import theme from './theme'
import ModalSwitch from './modal-switch'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

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