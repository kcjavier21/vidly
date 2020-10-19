import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import '../index.css';
import Like from './common/like'

export default class movies extends Component {
    state = {
        movies: getMovies()
    };

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;

        this.setState({ movies });
        
       console.log(movie);
    }

    render() {
        const { movies } = this.state;
        let message = ''

        movies.length === 0 ? message += 'No movies :(' : message += `Showing ${movies.length} movies`;
        
        return (
            <React.Fragment>
                <h2 style={{ padding: 10 }}>{message}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{ movie.title }</td>
                                <td>{ movie.genre.name }</td>
                                <td>{ movie.numberInStock }</td>
                                <td>{ movie.dailyRentalRate }</td>
                                <td>
                                    <Like liked={movie.liked} onLike={() => this.handleLike(movie)}/>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => this.handleDelete(movie)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>  
                        ))}
                        
                    </tbody>
                    </table>

            </React.Fragment>

        )
    }
}
