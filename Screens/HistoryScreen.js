import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useParams } from "react-router-dom";
import React from 'react';
import MyStack from '../App';

const HistoryScreen = () => {
  return(
    <view style={{flex:1,justifyContent :'center',alignItems:'center'}}>
    <Text>History Page</Text>
    <button onPress = {()=>navigation.navigation('Genre')}title='Genre Page'></button>
    <button onPress = {()=>navigation.navigation('Home')}title='Home Page'></button>
</view>
  )
  
}

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Navbar></Navbar>
    </View>
  );
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