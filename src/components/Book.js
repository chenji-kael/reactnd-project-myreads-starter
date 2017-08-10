import React, {Component} from 'react'

export default class Book extends Component {
  onSelectChange = (event) => {
    const {book, changeShelf} = this.props
    changeShelf(book.id, event.target.value)
  }

  render() {
    const {book} = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : null})`
          }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.onSelectChange} value={book.shelf}>
              <option value="can not be none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}