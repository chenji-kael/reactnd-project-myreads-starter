import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
export default class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      searchBooks:[]
    }
  }

  changeShelf= (id, dstShelf) => {
    let altered = this.state.searchBooks.map((book)=>{
      if (book.id === id) {
        BooksAPI.update(book, dstShelf).then((resp)=> {
        })
        return Object.assign({}, book, {shelf: dstShelf})
      } else {
        return Object.assign({}, book)
      }
    })
    this.setState({searchBooks:altered})
  }

    onInputChange = (event) => {
      this.setState({query: event.target.value}, ()=>{
        if (this.state.query !== "") {
          BooksAPI.search(this.state.query, 100).then((books)=>{
            if (books.length > 0) {
              let syncedBooks = books.map((book) => this.props.syncBook(book))
              this.setState({searchBooks:syncedBooks})
            }
          })
        }
      })
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
                        <input type="text" placeholder="Search by title or author" onChange={this.onInputChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                      {this.state.searchBooks.length > 0 && this.state.searchBooks.map((book)=>{
                        return (
                          <li key={book.id} >
                            <Book book={book} changeShelf={this.changeShelf}/>
                          </li>
                        )
                      })}
                    </ol>
                </div>
            </div>
        )
    }
}

