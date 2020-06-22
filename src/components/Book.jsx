import React, { Component } from 'react';
import { 
    Card, 
    CardActions, 
    CardActionArea, 
    CardMedia, 
    CardContent, 
    Typography, 
    Button 
} from '@material-ui/core';
import '../App.css';
import { withStyles } from '@material-ui/styles';

const useStyles = () => ({
    root: {
        maxWidth: 345,
        margin: 15,
    },
    media: {
        height: 260,
        width: 380,
    },
    description: {
        overflow: "hidden", 
        textOverflow: "ellipsis", 
        width: '20rem', 
        height:'8rem',
    },
  });


class Book extends Component {
        
    handleNewTab = (link) => {
        let info = window.open(link, '_blank');
        info.focus();
    };

    handelDescription=(text)=>{
        let ellipsis ='...';
        return text.substring(0, 200).concat(ellipsis);
    };

    render() {
        
        const {b} = this.props;
        const {classes} = this.props;
        
        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={b.volumeInfo.imageLinks 
                            ? b.volumeInfo.imageLinks.thumbnail 
                            : require('../resources/noImageAvail.png')}
                        title={b.volumeInfo.title}
                    />
                    <CardContent>
                        
                        <Typography gutterBottom={true} variant="h5" component="h2"> 
                            {b.volumeInfo.title}
                        </Typography>
                        
                        <div className={classes.description}> 
                        <Typography variant="body2" color="textSecondary" component="span">
                            <section><b>Description: </b></section>{b.volumeInfo.description 
                                ? this.handelDescription(b.volumeInfo.description) 
                                : 'No Description Avail.'}
                        </Typography></div>
                        <Typography variant='body2' color='textSecondary' component='span'>
                            <section><b>Categories: </b></section>{b.volumeInfo.categories 
                                ? b.volumeInfo.categories 
                                : 'Not Available.'}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button 
                        variant='contained' 
                        color="primary" 
                        onClick={()=>this.handleNewTab(b.volumeInfo.infoLink)}
                    >
                        More Info...
                    </Button>
                </CardActions>
            </Card>    
        )
    };
};

export default withStyles(useStyles)(Book)