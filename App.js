import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useParams } from "react-router-dom";
import React from 'react';



const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Genre" component={GenreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

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

    let average_pages_read = pages_read / read_books.length;

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

let number_of_pages = 3;

class Navbar extends React.Component {
  state = {
    page: 0,
  }

  handleInput = _ => {
    this.setState({ page: (this.state.page + 1) % number_of_pages });
  };

  render() {
    if (this.state.page == 0) {
      return (
        <View>
          <button onClick={this.handleInput}>Genres</button>
          <User></User>
          <Text>Book collection</Text>
          <SearchBar></SearchBar>
          <StatusBar style="auto" />
        </View>
      );
    } else if (this.state.page == 1) {
      return (
        <View style={styles.searchBar}>
          <button onClick={this.handleInput}>History</button>
          <GenrePage></GenrePage>
        </View>
      );
    } else if (this.state.page == 2) {
      return (
        <View style={styles.searchBar}>
          <button onClick={this.handleInput}>Main screen</button>
          <HistoryPage></HistoryPage>
        </View>
      );
    }
  }
}

class GenrePage extends React.Component {
  state = {
    all_read_books: [],
    genre_stats: {},
  }

  render() {
    // Fill all_read_books with all books read by all users
    for (let user of users) {
      let read_books = Object.keys(user.books_read).map((a) => {
        return Number(a);
      });
      let read_books_objects = all_books.filter(book => {
        return read_books.includes(book.id);
      });
      this.state.all_read_books = this.state.all_read_books.concat(read_books_objects);
    }
    console.log(this.state.all_read_books);

    // Fill genre_stats with all genres and their counts
    for (let book of this.state.all_read_books) {
      for (let genre of book.genres) {
        if (genre in this.state.genre_stats) {
          this.state.genre_stats[genre] += 1;
        } else {
          this.state.genre_stats[genre] = 1;
        }
      }
    }
    console.log(this.state.genre_stats);

    // Create a table showing all genres and their counts sorted by count
    let genre_table = [];
    for (let genre in this.state.genre_stats) {
      genre_table.push([genre, this.state.genre_stats[genre]]);
    }
    genre_table.sort((a, b) => {
      return b[1] - a[1];
    }
    );
    console.log(genre_table);

    // Generate a HTML table from the genre_table
    let table = [];
    let genre_num = 0
    while (genre_table.length >  genre_num) {
      let genre = genre_table[genre_num];
      table.push(<tr><td>{genre[0]}</td><td>{genre[1]}</td></tr>);
      genre_num += 1;
    }
    return (
      <View>
        <Text>Genre stats</Text>
        <table>
          <tbody>
            <tr>
              <th>Genre</th>
              <th>Count</th>
            </tr>
            {table}
          </tbody>
        </table>
      </View>
    );
  }
}


class HistoryPage extends React.Component {
  state = {
    read_books: [],
  }

  render() {
    // Show all books read by user
    let user = users[0];
    let read_books = Object.keys(user.books_read).map((a) => {
      return Number(a);
    });
    let read_books_objects = all_books.filter(book => {
      return read_books.includes(book.id);
    });
    console.log(read_books_objects);
    return (
      <View>
        <Text>History</Text>
        {read_books_objects.map(book => (
          <Book key={book.id} book={book}></Book>
        ))}
      </View>
    );
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
