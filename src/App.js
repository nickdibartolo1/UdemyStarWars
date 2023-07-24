import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchMoviesHandler() {
    setIsLoading(true);
    // must use then() becasue fetch is a promise meaning it wont trigger imediatley
    fetch('https://swapi.dev/api/films/', {}
    ).then(response => {
      return response.json();
      //this then() is needed for after the response.data transformation is done
    }).then(data => {
      //access data.results to target specific data in the data object
      // constant transformedMovies holds the mapped data
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episdoe_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      //state is used to update
      setMovies(transformedMovies);
      setIsLoading(false)
    })
  }

  //async OPTION
  //use async to eliminate .then() chains and make code a little more readable

  // async function fetchMoviesHandler() {
  //   const response = await fetch('https://swapi.dev/api/films/', {})
  //   const data = await response.json()

  //   const transformedMovies = data.results.map(movieData => {
  //     return {
  //       id: movieData.episdoe_id,
  //       title: movieData.title,
  //       openingText: movieData.opening_crawl,
  //       releaseDate: movieData.release_date
  //     }
  //   })
  //   setMovies(transformedMovies);
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies found.</p> }
        {isLoading && <p>LOADING...</p>}

      </section>
    </React.Fragment>
  );
}

export default App;
