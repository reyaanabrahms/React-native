import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { User, all_books } from '../App';

export let MainPage = (navigation) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Page</Text>
      <button onClick={() => navigation.navigation.replace('History')}>History Page</button>
      <button onClick={() => navigation.navigation.replace('Genre')}>Genre Page</button>
      <User></User>
      <Text>Book collection</Text>
      <SearchBar></SearchBar>
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

class BookList extends React.Component {
  render() {
    let filtered_books = all_books.filter(book => {
      return book.title.toLowerCase().includes(this.props.filter.toLowerCase());
    });

    return (
      <View>
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
            <BoldText>Author:</BoldText> <Text>{this.props.book.creator}</Text>
          </div>
          <div>
            <BoldText>Pages:</BoldText> <Text>{this.props.book.pages}</Text>
          </div>
          <div>
            <input type="button" onClick={this.handleInput} value="Toggle book description" />
          </div>
          <Text style={{ display: desc_display }}>{this.props.book.description}</Text>
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
