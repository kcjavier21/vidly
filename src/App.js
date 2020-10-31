import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import { getGenres } from './services/fakeGenreService';
import { getMovies } from './services/fakeMovieService';
//import Genres from './components/common/genres';



export default class App extends Component {
  // ===== STATE =====
  state = {
    temp: getMovies(),
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: '',
    sortColumn: { path: 'title', order: 'asc' }
  };

  // ===== MOUNTING =====
  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres });
  };

  // ===== METHODS =====
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
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  /*
  handleSelect = genre => {
    let temp = [...this.state.temp];
    let movies = [...temp];

    this.setState({ movies: temp });

    if(genre !== 'All'){
        movies = movies.filter(m => m.genre.name === genre);
        this.setState({ movies });
    }
  }
  */

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    //console.log(path);
    this.setState({ sortColumn });
  };



  // ====== RENDER ======
    render() {
      const { movies, pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state;
      const { handleGenreSelect, handleLike, handleDelete, handlePageChange, handleSort} = this;
      return (
        <React.Fragment>
          <Movies 
              movies={movies}
              onLike={handleLike}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
              /* itemsCount={movies.length} */
              pageSize={pageSize}
              currentPage={currentPage}
              genres={genres}
              onGenreSelect={handleGenreSelect}
              selectedGenre={selectedGenre}
              onSort={handleSort}
              sortColumn={sortColumn}
          /> 
        </React.Fragment> 
      );
    }
         
}

