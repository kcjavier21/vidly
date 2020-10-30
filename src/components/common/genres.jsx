import React, { Component } from 'react'

export default class Genres extends Component {
    render() {
        const {onSelect} = this.props;
        return (
            <div 
                className="btn-group-vertical btn-group-lg" 
                role="group" 
                aria-label="Basic example" 
                style={{ 
                    position: 'absolute',
                    left: '8%',
                    top: '12%',
                    width: '160px'
                }}>
                <button type="button" className="btn btn-outline-secondary" onClick={() => onSelect('All')}>All Genres</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => onSelect('Action')}>Action</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => onSelect('Comedy')}>Comedy</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => onSelect('Thriller')}>Thriller</button>
            </div>
        )
    }
}
