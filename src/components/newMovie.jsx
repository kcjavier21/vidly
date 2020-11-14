import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { v4 as uuidv4 } from 'uuid';


export default class newMovie extends Form {
    state = {
        data: { title: '',
                tempGenre: '', 
                numberInStock: '', 
                dailyRentalRate: '',
                
            },
        errors: {}
    };

    schema = {
        title: Joi.string().required().label('Title'),
        tempGenre: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(1).required().label('Stocks'),
        dailyRentalRate: Joi.number().min(1).max(5).required().label('Rate'),
    };

    doSubmit= () => {
        const { data } = this.state;

        // ===== ASSIGN ID and LIKE VALUE ====
        data._id = uuidv4();
        data.liked = false;

        let submitGenre = { _id: '', name: '' };
        submitGenre.name = data.tempGenre;

        if (submitGenre.name === 'Action') 
            submitGenre._id = '5b21ca3eeb7f6fbccd471818';
        else if (submitGenre.name === 'Thriller') 
            submitGenre._id = '5b21ca3eeb7f6fbccd471820';
        else if (submitGenre.name === 'Comedy') 
            submitGenre._id = '5b21ca3eeb7f6fbccd471814';
        else
            submitGenre._id = '0000';

        delete data.tempGenre;  
        
        // ====== CONVERT STOCK and RATE to NUMBERS =====
        data.numberInStock = parseInt(data.numberInStock); 
        data.dailyRentalRate = parseFloat(data.dailyRentalRate); 

        // ===== Add to STATE.DATA OBJECT =====
        Object.assign(data, {genre: submitGenre});

        console.log('Saved');
        
        console.log(data);

        const newMovie = data;

        this.props.onAddMovie(newMovie);
    };


    render() {
        //const options = ['Action', 'Comedy', 'Thriller'];
        return (
            <div>
                <h1>New Movie</h1>
                <form onSubmit={this.handleSubmit} style={{width: '90%'}}>
                    {this.renderInput('title', 'Title')}
                    {this.renderDataList('tempGenre', 'Genre', ['Action', 'Comedy', 'Thriller'])}
                    {this.renderInput('numberInStock', 'Number in Stock')}
                    {this.renderInput('dailyRentalRate', 'Rate')}
                    
                    {this.renderButton('Save')}
                </form>

            </div>
        )
    }
}
