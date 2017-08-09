import React from 'react'
import { Link } from 'react-router-dom'
import Book from './components/Book'
import SearchPage from './components/SearchPage'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  fetchBook = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  componentDidMount() {
    this.fetchBook()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === "/" && this.props.location.pathname !== nextProps.location.pathname) {
      this.fetchBook()
    }
  }

  syncBook = (book) => {
    for(let i=0; i <this.state.books.length; i ++) {
      if (this.state.books[i].id === book.id) {
        return this.state.books[i]
      }
    }
    return Object.assign({},book,{shelf:"none"})
  }

  changeShelf = (id, dstShelf) => {
    let altered = this.state.books.map((book)=>{
      if (book.id === id) {
        BooksAPI.update(book, dstShelf).then((resp)=> {
        })
        return Object.assign({}, book, {shelf: dstShelf})
      } else {
        return Object.assign({}, book)
      }
    })
    this.setState({books:altered})
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>{
          return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                       {this.state.books.filter((x)=> x.shelf === "currentlyReading").map((book) => {
                          return (
                            <li key={book.id} >
                              <Book book={book} changeShelf={this.changeShelf}/>
                            </li>
                          )
                      })}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter((x)=> x.shelf === "wantToRead").map((book) => {
                          return (
                            <li key={book.id}>
                              <Book book={book} changeShelf={this.changeShelf}/>
                            </li>
                          )
                        })}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter((x)=> x.shelf === "read").map((book) => {
                          return (
                            <li key={book.id}>
                              <Book book={book} changeShelf={this.changeShelf}/>
                            </li>
                          )
                        })}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        }/>
        <Route exact path="/search" render={(props)=>{
          return (
            <SearchPage {...props} syncBook={this.syncBook}/>
          )
        }}/>
      </div>
    )
  }
}

export default BooksApp
