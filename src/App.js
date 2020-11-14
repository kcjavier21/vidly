import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
//import _ from 'lodash';
import './App.css';
//import { paginate } from './utils/paginate';


import { getGenres } from './services/fakeGenreService';
import { getMovies } from './services/fakeMovieService';


import MovieForm from './components/movieForm';
import Movies from './components/movies';
import NavBar from './components/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notfound';
import Login from './components/loginForm';
import Register from './components/registerForm';



export default class App extends Component {
  // ===== STATE =====
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
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
    this.setState({ selectedGenre: genre, searchQuery: "",  currentPage: 1 });
  };
 
  handleSearch = query => {
    console.log("==============");
    console.log(query);
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    //console.log(path);
    this.setState({ sortColumn });
  };

  handleAddMovie = input => {
    const movies = [...this.state.movies];

    console.log(movies);

    movies.push(input);

    console.log(movies);
  
    this.setState({ movies });
  };



  // ====== RENDER ======
    render() {
      const { movies, pageSize, currentPage, genres, selectedGenre, searchQuery, sortColumn } = this.state;
      const { handleGenreSelect, handleLike, handleDelete, handlePageChange, handleSort, handleAddMovie, handleSearch } = this;
      return (
        <React.Fragment>

          <NavBar/>
            <div className="content">
              <Switch>
                {/* <Redirect from="/" to="/movies"/> */}
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/customers" component={Customers}/>
                <Route path="/rentals" component={Rentals}/>
                <Route path="/not-found" component={NotFound}/>
                {/* <Route path="/movies/:id?" component={}></Route> */}
                <Route path="/movies/:id" component={MovieForm}/>
                <Route path="/movies/new" component={MovieForm}/>
                <Route path="/movies" exact render={(props) => <Movies 
                    movies={movies}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    onPageChange={handlePageChange}
                    itemsCount={movies.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    genres={genres}
                    onGenreSelect={handleGenreSelect}
                    selectedGenre={selectedGenre}
                    onSort={handleSort}
                    sortColumn={sortColumn}
                    searchQuery={searchQuery}
                    onHandleSearch={handleSearch}
              />}/>
                <Redirect from="/" exact to="/movies"/>
                <Redirect to="/not-found"/>
  
              </Switch>
            </div>
          
           
        </React.Fragment> 
      );
    }
         
}

