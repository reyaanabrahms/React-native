import { Text, View } from 'react-native';
import React from 'react';
import Book from '../App';
import { users, all_books } from '../App';

export const HistoryScreen = (navigation) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>History Page</Text>
      <button onClick={() => navigation.navigation.replace('Genre')}>Genre Page</button>
      <button onClick={() => navigation.navigation.replace('Home')}>Home Page</button>
      <HistoryPage></HistoryPage>
    </View>
  )
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
        <Text>Hisrtosdasdksad;</Text>
        {read_books_objects.map(book => (
          <Book key={book.id} book={book}></Book>
        ))}
      </View>
    );
  }
}