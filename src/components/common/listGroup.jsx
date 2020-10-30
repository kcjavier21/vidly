import React, { Component } from 'react';

const ListGroup = (props) => {
    const { genres, textProperty, valueProperty, onGenreSelect, selectedGenre } = props;
    console.log(textProperty);
    console.log(valueProperty);
    return(
        <ul className="list-group">
            {genres.map(genre => (
                <li onClick = {() => onGenreSelect(genre)} 
                    key={genre[valueProperty]} 
                    className={ genre === selectedGenre ? "list-group-item active" : "list-group-item" }>
                    {genre[textProperty]}    
                </li>
            ))}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}; 
 
export default ListGroup;