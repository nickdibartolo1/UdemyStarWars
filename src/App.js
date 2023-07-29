import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  //async OPTION
  // use async to eliminate .then() chains and make code a little more readable
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://udemy-http-923e3-default-rtdb.firebaseio.com/movies.json', {})
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,

        })
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

 async function addMovieHandler(movie) {
    const response = await fetch('https://udemy-http-923e3-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
        });
        const data = await response.json()
    console.log(movie)
  }

  let content = <p>Found no movies.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies}></MoviesList>
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  //this is the older approach below to making an http request with .then() chains

  //   // must use then() becasue fetch is a promise meaning it wont trigger imediatley
  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/', {}
  //   ).then(response => {
  //     return response.json();
  //     //this then() is needed for after the response.data transformation is done
  //   }).then(data => {
  //     //access data.results to target specific data in the data object
  //     // constant transformedMovies holds the mapped data
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episdoe_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     //state is used to update
  //     setMovies(transformedMovies);
  //     setIsLoading(false)
  //   })
  // }


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
