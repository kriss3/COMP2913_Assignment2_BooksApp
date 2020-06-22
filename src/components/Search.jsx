import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import '../App.css';
import { withStyles } from '@material-ui/styles';

const useStyles = (() => ({
    root: {
      '& .MuiTextField-root': {
        margin: 2,
        width: 200,
      },
    },
  }));

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPhrase: this.props.searchPhrase,
            error: false,
            inputLabel: 'Search:',
            helperText: 'Enter a book title to search...'
        }
    }

    handleClick = () => {
        if(this.state.searchPhrase !== '')
            this.props.searchClickBtn(this.state.searchPhrase);
    };

    handleChange = (e) => {
        let ph = e.target.value;
        if(ph !== ''){
            this.setState({
                searchPhrase: ph,
                error: false,
                inputLabel: 'Search',
                helperText: 'Enter a book title to search...'
            });
        } else {
            this.setState({
                searchPhrase: ph,
                error: true,
                inputLabel: 'Required Field...',
                helperText: 'Empty field. Please, provide value.'
            });
        }
    };

    handleKeyDown = (e) => {
        if(e.keyCode === 13 && this.state.searchPhrase !== ''){
            e.preventDefault();
            this.handleChange(e);
            this.handleClick();
        }
    };

    render() {

        const { classes } = this.props;
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            error={this.state.error}
                            label={this.state.inputLabel}
                            value={this.state.searchPhrase}
                            helperText={this.state.helperText}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            autoFocus={true}
                            placeholder='Search phrase'
                        />
                    </div>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        onClick={this.handleClick}
                    >
                        Search
                    </Button>
                </form>                
            </div>
        );
    }
}

export default withStyles(useStyles)(Search);