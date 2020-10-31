import React, { Component } from 'react';
import '../index.css';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import _ from 'lodash';
import MoviesTable from './moviesTable'


export default class movies extends Component {

    getPagedData = () => {
        const { movies: allMovies, 
            onLike, onDelete, 
            onPageChange, selectedGenre, 
            onGenreSelect, 
            pageSize, currentPage, 
            onSort, sortColumn } = this.props;

        

            
        const filtered = selectedGenre && selectedGenre._id 
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

       
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };

    render() {
        const { movies: allMovies, 
            onLike, onDelete, 
            onPageChange, selectedGenre, 
            onGenreSelect, 
            pageSize, currentPage, 
            onSort, sortColumn } = this.props;

        
        const { totalCount, data: movies } = this.getPagedData();

        let message = '';
        allMovies.length === 0 ? message += 'No movies :(' : message += `Showing ${totalCount} movies`;
        

       
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
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                 />               
                </div>

                
                {/*<Genres />*/}
                
                
                
                    
            </div>

        )
    }
}
