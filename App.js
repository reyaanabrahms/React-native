import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useParams } from "react-router-dom";
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Book collection</Text>
      <SearchBar></SearchBar>
      <StatusBar style="auto" />
    </View>
  );
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
      <View style={{ "grid-template-columns": "100px 1fr", display: "grid" }}>
        <img style={{ width: 100, height: 150 }} src={this.props.book.cover}></img>
        <div style={{ "padding-left": "2rem" }}>
          <h3>{this.props.book.title}</h3>
          <b>Author:</b> <span>{this.props.book.author}</span>
          <br></br>
          <b>Pages:</b> <span>{this.props.book.pages}</span>
          <br></br>
          <input type="button" onClick={this.handleInput} value="Toggle book description" />
          <br></br>
          <span style={{ display: desc_display }}>{this.props.book.desc}</span>
        </div>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
