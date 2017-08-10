import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import _ from 'lodash'
export default class SearchPage extends Component {
  state = {
    query: "",
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  syncBook = (book) => {
    const currentBook = this.state.books.find(b => b.id === book.id)
    if (currentBook !== undefined) {
      return currentBook
    } else {
      return {...book, shelf: "none"}
    }
  }

  changeShelf = (id, dstShelf) => {
    const altered = this.state.searchBooks.map((book) => {
      if (book.id === id) {
        BooksAPI.update(book, dstShelf).then((resp) => {
        })
        return {...book, shelf: dstShelf}
      } else {
        return {...book}
      }
    })
    this.setState({searchBooks: altered})
  }

  inputHandle = _.debounce((event) => {
    this.setState({query: event.target.value}, () => {
      if (this.state.query !== "") {
        BooksAPI.search(this.state.query, 100).then((books) => {
          if (books.length > 0) {
            const syncedBooks = books.map((book) => this.syncBook(book))
            this.setState({searchBooks: syncedBooks})
          }
        })
      }
    })
  }, 1000)

  onInputChange = (event) => {
    event.persist()
    this.inputHandle(event)
  }


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
             */}
            <input type="text" placeholder="Search by title or author" onChange={this.onInputChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.length > 0 ? this.state.searchBooks.map((book) => {
              return (
                <li key={book.id}>
                  <Book book={book} changeShelf={this.changeShelf}/>
                </li>
              )
            }) : <div/>}
          </ol>
        </div>
      </div>
    )
  }
}

