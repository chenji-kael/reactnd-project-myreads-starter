import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter , withRouter } from 'react-router-dom'

const WappedApp = withRouter(App)
ReactDOM.render(<BrowserRouter><WappedApp /></BrowserRouter>, document.getElementById('root'))
