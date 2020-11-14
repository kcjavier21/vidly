import React, { Component } from 'react';

export default class DataList extends Component {

    render() { 
        const { name, label, options, error, ...rest } = this.props;

        return ( 
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                    <select 
                        {...rest}
                        options={options}
                        name={name}
                        className="form-control" 
                        id={name}
                    >
                        { options.map(option => (
                            <option key={option} placeholder="Genres">{option}</option>
                        ))}
                    </select>
            </div>
         );
    }
}
 
