import React from 'react'
import SearchPage from './components/SearchPage'
import ShelfPage from './components/ShelfPage'
import {Route} from 'react-router-dom'
import './App.css'

const BooksApp = () => (
  <div className="app">
    <Route exact path="/" component={ShelfPage}/>
    <Route exact path="/search" component={SearchPage}/>
  </div>
)

export default BooksApp
