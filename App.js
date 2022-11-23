import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainPage } from './Screens/MainPage';
import { HistoryScreen } from './Screens/HistoryScreen';
import { GenreScreen } from './Screens/GenreScreen';
import React from 'react';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer independent={true} >
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

export class User extends React.Component {
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

export const all_books = require('./books.json');
export const users = require('./users.json');

export class BookList extends React.Component {
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

export class Book extends React.Component {
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
