import React, {Component} from "react";
import Book from "./components/Book";
import Search from "./components/Search";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Divider, Paper } from '@material-ui/core';

import './App.css';

const useStyles = (theme) =>({
  root: {
    flexGrow: 1,
    backgroundColor:'#282c34',
  },
  paper:{
    backgroundColor:'#282c34'
  },
  control: {
    padding: theme.spacing(2),
  },
  spinner: {
    textAlign: 'center', 
    backgroundColor:'#282c34', 
    height: '700px', 
    padding:'100px'
  },
  noBooks: {
    textAlign: 'center',
    color: 'yellowgreen'
  },
  errorPhrase: {
    color: 'red',
    display: 'inline',
    margin: 5,
    fontStyle: 'italic'
  }
});

class App extends Component {
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

  //delaying fetch data to clearly show progress component
  getData = (phrase) => {
    this.setState({isLoading: true, defaultSearch: phrase}, ()=>{
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${phrase}`)
        .then((response) => setTimeout(() => {
            console.log(response);
            this.setState({
              books: response.data.items, 
              isLoading: false
            });
          }, 2000))
        .catch((error) => this.handleError(error));
    });
  };

  handleError = (response) => {
    this.setState({isLoading: false, errorMessage: response.message});
  };

  handleSearch = (phrase) => {
    this.getData(phrase);
  }; 

  render(){
    let book = this.state.books && (
      this.state.books.map((b) => {
        return(
          <Book key={b.id} b={b}/>
        )
      })
    )

    const { classes } = this.props;

    return (
      <>
        <div className='App-search'>
          <Search 
            searchPhrase={this.state.defaultSearch} 
            searchClickBtn={this.handleSearch}
          /> 
        </div>
        <Divider/>
        
        {this.state.isLoading ? (
          <div className={classes.spinner}>
            <CircularProgress color='secondary' />
          </div>) : (
            <Grid container alignItems='stretch' className={classes.root} spacing={2}>
              <Grid item sm={12}>
                <Paper className={classes.paper}>
                {this.state.errorMessage !== '' || !this.state.books
                  ? (<h3 className={classes.noBooks}>
                        No Books found for phrase:  
                        <p className={classes.errorPhrase}>
                          {this.state.defaultSearch}
                        </p>
                        <p>{this.state.errorMessage}</p>
                      </h3>)
                  : (
                    <Grid container justify="center" spacing={2}>
                      {book}
                    </Grid>)}
                </Paper>
              </Grid>
            </Grid>
          )
        }
      </>
    );
  }
};

export default withStyles(useStyles)(App);