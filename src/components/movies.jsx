import React, { Component } from 'react';
import '../index.css';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import _ from 'lodash';
import MoviesTable from './moviesTable'


export default class movies extends Component {
    render() {
        const { movies: allMovies, 
            onLike, onDelete, 
            onPageChange, selectedGenre, 
            onGenreSelect, itemsCount, 
            pageSize, currentPage, 
            onSort, sortColumn } = this.props;

        let message = '';

        const filtered = selectedGenre && selectedGenre._id 
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        allMovies.length === 0 ? message += 'No movies :(' : message += `Showing ${filtered.length} movies`;

        const movies = paginate(sorted, currentPage, pageSize);

        // console.log('MOVIES: ' + movies[0].title);
        // console.log('CURRENT PAGE: ' + currentPage);
        // console.log('PAGE SIZE: ' + pageSize);
        
        return (
            <div className="row" 
                style={{
                    width: "75%",
                    margin: "auto",
                    cursor: "pointer"
                    }}>
                <div className="col-3">
                    <ListGroup 
                        genres={this.props.genres}
                        // textProperty={this.props.textProperty}
                        // valueProperty={this.props.valueProperty}
                        textProperty="name"
                        valueProperty="_id"
                        onGenreSelect={onGenreSelect}
                        selectedGenre={selectedGenre}
                    />
                </div>
                <div className="col">
                    <h4>{message}</h4>
                      
                <MoviesTable 
                    movies={movies}
                    onLike={onLike}
                    onDelete={onDelete}
                    onSort={onSort}
                    sortColumn={sortColumn}
                />

                <Pagination 
                        onPageChange={onPageChange}
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                 />               
                </div>

                
                {/*<Genres />*/}
                
                
                
                    
            </div>

        )
    }
}
