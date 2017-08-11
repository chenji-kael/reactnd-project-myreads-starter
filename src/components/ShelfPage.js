import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

export default class ShelfPage extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf = (id, dstShelf) => {
    const books = this.state.books.map((book) => {
      if (book.id === id) {
        BooksAPI.update(book, dstShelf).then((resp) => {
        })
        return {...book, shelf: dstShelf}
      } else {
        return {...book}
      }
    })
    this.setState({books})
  }

  render() {
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
                  {this.state.books.filter((x) => x.shelf === "currentlyReading").map((book) => {
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
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.filter((x) => x.shelf === "wantToRead").map((book) => {
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
                  {this.state.books.filter((x) => x.shelf === "read").map((book) => {
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
    )
  }
}