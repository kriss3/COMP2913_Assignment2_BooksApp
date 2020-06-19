import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            searchPhrase: 'harry potter'
        }
    }

    handleClick = () => {
        this.props.searchClickBtn(this.state.searchPhrase);
    };

    handleChange = (e) => {
        let ph = e.target.value;
        this.setState({searchPhrase: ph});
    };

    handleKeyDown = (e) => {
        if(e.keyCode === 13){
            this.handleChange(e);
            this.handleClick();
        }
    };

    render() {
        const style = {
            input : {
                display: 'block',
                margin: '15px',
                textAlign: 'center',
                width: '200px'
            },
            button : {
                display: 'block',
                width: '200px',
                marginLeft: '15px'
            }
        };
        return (
            <div>
                <input 
                    style={style.input} 
                    type='text' 
                    value={this.state.searchPhrase} 
                    onChange={this.handleChange} 
                    onKeyDown={this.handleKeyDown}
                    placeholder='Enter search phrase...'
                />
                <Button style={style.button} onClick={this.handleClick}>Search</Button>
            </div>
        );
    }
}
