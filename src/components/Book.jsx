import React, { Component } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import '../App.css';

export default class Book extends Component {
    
    handleNewTab = (e) => {
        let info = window.open(e.target.value, '_blank');
        info.focus();
    };

    render() {
        const style = {
            cardText: {
                color: 'black',
                whiteSpace:'nowrap',
                textOverflow:'ellipsis',
                overflow: 'hidden',
                maxHeight:'150px',
                maxWidth:'200px',
                fontSize: '10px'
            }
        };
        const {b} = this.props;
        return (
            <Col sm='4'>
                <Card style={{ width: '200px', height: '270px' }}>
                    {b.volumeInfo.imageLinks ? (
                        <Card.Img 
                        style={{marginTop:'25px', alignSelf:'center',maxWidth:'20%', width:'auto', height:'auto'}} 
                        src={b.volumeInfo.imageLinks.smallThumbnail} 
                    />) : <p>No image</p>}
                    <Card.Body>
                    <Card.Title style={{height: '20px', fontSize:'10px'}}>{b.volumeInfo.title}</Card.Title>
                    <Card.Text style={style.cardText}>
                        {b.volumeInfo.description}
                    </Card.Text>
                    <p style={{fontSize:'10px', color:'blue'}}>Categories: {b.volumeInfo.categories ? b.volumeInfo.categories : 'Not Available'} </p>

                    <Button variant="primary" value={b.volumeInfo.infoLink} onClick={this.handleNewTab}>More Book Info</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    };
};