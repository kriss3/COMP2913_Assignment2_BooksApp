import React, {Component} from "react";
import Book from "./components/Book";
import Search from "./components/Search";
import axios from 'axios';
import {Container, Row, Spinner } from 'react-bootstrap';

import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      defaultSearch: 'harry potter',
      isLoading: false,
      errorMessage: ''
    };
  };

  componentDidMount() {
    this.setState({isLoading: true}, ()=>{
      this.getData(this.state.defaultSearch)
    });
  };

  getData = (phrase) => {
    this.setState({isLoading: true, defaultSearch: phrase}, ()=>{
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${phrase}`)
        .then((response) => setTimeout(() => {
            console.log(response);
            this.setState({
              books: response.data.items, 
              isLoading: false
            });
          }, 3000))
        .catch((error) => this.handleError(error));
    });
  };

  handleError = (response) => {
    console.log('in handleError: ' + JSON.stringify(response));
    this.setState({isLoading: false, errorMessage: response.message});
  };

  handleSearch = (phrase) => {
    console.log(`We are looking for ${phrase}`);
    this.getData(phrase);
  }; 

  render(){
    let book;
    this.state.books && (
      book = this.state.books.map((b) => {
        return(
          <Book key={b.id} b={b}/>
        )
      })
    )

    return (
      <>
        <div className='App-search'>
          <Search 
            searchPhrase={this.state.booksToSearch} 
            searchClickBtn={this.handleSearch}
          /> 
        </div>
        <hr/>

        {this.state.isLoading ? <div style={{textAlign: 'center', backgroundColor:'#282c34', height: '700px', padding:'100px'}}><Spinner animation="border" variant='danger' /></div> : (
          <Container fluid className='App-header'>
            {this.state.errorMessage !== '' || !this.state.books ? (<p>No Books found for phrase: {this.state.defaultSearch}<br/>{this.state.errorMessage}</p>) : (
            <Row sm='2'>
              {book}
            </Row> )}
          </Container> 
        )}
      </>
    );
  }
};