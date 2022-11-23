import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useParams } from "react-router-dom";
import React from 'react';
import MyStack from '../App';

const GenreScreen = () => {
  return(
    <view style={{flex:1,justifyContent :'center',alignItems:'center'}}>
    <Text>Genre Page</Text>
    <button onPress = {()=>navigation.navigation('History')}title='History Page'></button>
    <button onPress = {()=>navigation.navigation('Home')}title='Home Page'></button>
</view>
  )
  
}

export default function GenreScreen() {
  return (
    <View style={styles.container}>
      <Navbar></Navbar>
    </View>
  );
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