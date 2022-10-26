import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useParams } from "react-router-dom";
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <User></User>
      <Text>Book collection</Text>
      <SearchBar></SearchBar>
      <StatusBar style="auto" />
    </View>
  );
}

class User extends React.Component {
  render() {
    let user = users[0];
    let book_id = user.currently_reading;
    let book = all_books.filter(book => {
      return book.id == book_id;
    })[0];

    console.log(user.books_read);
    let read_books = Object.keys(user.books_read).map((a) => {
      return Number(a);
    });
    console.log(read_books);

    let read_books_objects = all_books.filter(book => {
      return read_books.includes(book.id);
    });
    let pages_read = 0;
    console.log(read_books_objects);
    for (let a of read_books_objects) {
      pages_read += a.pages;
    }

    let average_pages_read = pages_read/read_books.length;

    if (book == undefined) {
      return (
        <View style={styles.searchBar}>
          <Text>{user.name}</Text>
          <Text>All pages read: {pages_read}</Text>
          <Text>Avg pages read: {average_pages_read}</Text>
          <Text>Not reading a book right now.</Text>
        </View>
      );
    } else {
      console.log(book);
      return (
        <View style={styles.searchBar}>
          <Text>{user.name}</Text>
          <Text>All pages read: {pages_read}</Text>
          <Text>Avg pages read: {average_pages_read}</Text>
          <Book key={book_id} book={book}></Book>
        </View>
      );
    }
  }
}

class SearchBar extends React.Component {
  state = {
    query: "",
    search: "",
  };

  handleInput = event => {
    this.setState({ query: event.target.value });
  };

  filterBooks = event => {
    event.preventDefault();
    this.setState({ search: this.state.query, query: "" });
  };

  render() {
    return (
      <View style={styles.searchBar}>
        <input type="text" onChange={this.handleInput} placeholder="Search..." />
        <button onClick={this.filterBooks}>Search</button>
        <BookList filter={this.state.search}></BookList>
      </View>
    );
  }
}

const all_books = require('./books.json');
const users = require('./users.json');

class BookList extends React.Component {
  render() {
    let filtered_books = all_books.filter(book => {
      return book.title.toLowerCase().includes(this.props.filter.toLowerCase());
    });

    return (
      <View>
        <Text>{this.props.filter}</Text>
        {filtered_books.map(book => (
          <Book key={book.id} book={book}></Book>
        ))}
      </View>
    );
  }
}

class Book extends React.Component {
  state = {
    show: false,
  };

  handleInput = event => {
    this.setState({ show: !this.state.show });
  };

  render() {
    let desc_display = this.state.show ? "block" : "none";
    return (
      <View style={{ gridTemplateColumns: "100px 1fr", display: "grid" }}>
        <img style={{ width: 100, height: 150 }} src={this.props.book.cover}></img>
        <div style={{ paddingLeft: "2rem" }}>
          <BoldText>{this.props.book.title}</BoldText>
          <div>
            <BoldText>Author:</BoldText> <Text>{this.props.book.author}</Text>
          </div>
          <div>
            <BoldText>Pages:</BoldText> <Text>{this.props.book.pages}</Text>
          </div>
          <div>
            <input type="button" onClick={this.handleInput} value="Toggle book description" />
          </div>
          <Text style={{ display: desc_display }}>{this.props.book.desc}</Text>
        </div>
      </View>
    );
  }
}

function BoldText({ children }) {
  return <span style={{ fontWeight: 'bold' }}>{children}</span>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
