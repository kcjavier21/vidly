import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';


export default class RegisterForm extends Form {
    state = {
        data: { username: '', password: '' , name: ''},
        errors: {}
    };

    // ==== Create SCHEMA for VALIDATION

    schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label('Name')
    };

    doSubmit = () => {
         console.log('Registered');
    }

    render() {
        return (
            <div>
                <h1>Register</h1>             
                <form onSubmit={this.handleSubmit} style={{width: '90%'}}>
                    {/* this.renderInput(name, label, type = 'text') */}
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    
                    {/* this.renderButton('label') */}
                    {this.renderButton('Register')}
                </form>
            </div>
        )
    }
}