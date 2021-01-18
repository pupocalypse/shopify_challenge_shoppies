import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Header from "./components/Header";
import Banner from "./components/Banner";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import Nominations from "./components/Nominations";
import Footer from "./components/Footer";

import ScrollToTopButton from "./components/elements/ScrollToTopButton";

import "./styles/app.css";

const apiKey = process.env.REACT_APP_API_KEY;
const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=`;
const idDetailsUrl = `https://www.omdbapi.com?apikey=${apiKey}&i=`;

const randomMovies = [
  "Tropic Thunder",
  "Clue",
  "A Bug's Life",
  "Little Miss Sunshine",
  "Ordinary People",
  "This Is Spinal Tap",
  "Raging Bull",
  "Shawshank Redemption",
  "Dumb and Dumber",
  "Saturday Night Fever",
  "Monty Python and the Holy Grail",
];

// let randomMovie = randomIndex();

const App = () => {
  const rootElement = document.documentElement;

  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);

  const randomIndex = useCallback(() => {
    const movies = randomMovies.filter(
      (movie) => !nominations.some((nom) => nom.title === movie)
    );

    const index = Math.floor(Math.random() * movies.length);
    return movies[index];
  }, [nominations]);

  const scrollToTop = useCallback(() => {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [rootElement]);

  useEffect(() => {
    if (nominations.length === 0) {
      const savedNoms = JSON.parse(localStorage.getItem("nominations"));
      if (savedNoms?.length > 0) {
        setNominations(savedNoms);
      }
    }

    if (nominations.length === 5) {
      setRandomMovie(randomIndex());
      setFinished(true);
      scrollToTop();
    } else {
      setFinished(false);
    }

    localStorage.setItem("nominations", JSON.stringify(nominations));
  }, [nominations, scrollToTop, randomMovie, randomIndex]);

  // reduce load on rapid onChange input
  const debouncer = () => {
    let timer;
    let input;
    return (e) => {
      if (timer) {
        clearTimeout(timer);
      }
      setLoading(true);
      input = e.target.value;
      timer = setTimeout(() => {
        search(input);
        timer = null;
      }, 1000);
    };
  };

  const search = (movieTitle) => {
    if (!movieTitle) {
      setSearchTerm(null);
      setSearchResults([]);
      setLoading(false);
    } else {
      setSearchTerm(movieTitle);
      axios
        .get(`${searchUrl}${movieTitle}&type=movie`)
        .then((response) => {
          let results;
          if (response.data.Search) {
            results = response.data.Search.reduce((acc, movieObj) => {
              let movieMatch = axios.get(`${idDetailsUrl}${movieObj.imdbID}`);

              acc.push(movieMatch);
              return acc;
            }, []);
          }
          return Promise.all(results);
        })
        .then((results) => {
          const matches = results
            .filter(
              (result) =>
                result.data.Genre.includes("Short") === false &&
                result.data.Genre !== "X"
              // this API includes some naughty results =\
            )
            .map((result) => {
              const alreadyNominated = nominations.findIndex(
                (nom) => nom.id === result.data.imdbID
              );
              let movie = {
                id: result.data.imdbID,
                title: result.data.Title,
                year: result.data.Year,
                country: result.data.Country,
                genre: result.data.Genre,
                nominated: false,
              };
              if (alreadyNominated !== -1) {
                movie.nominated = true;
              }
              return movie;
            });
          setSearchResults(matches);
        })
        .catch(() => {
          // no results found from searchTerm
          setSearchResults([]);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
  };

  // onClick event, passed to Results
  // receives result object
  // pushes nomination to state
  // deactive 'add' button in Results list for that title
  const addNomination = (movieObj) => {
    if (nominations.length !== 5) {
      movieObj.nominated = true;
      setNominations([...nominations, movieObj]);
    }
  };

  // onClick event, passed to Nominations
  // receives nomination object
  // removes nomination from state
  // IF same title is displayed in Results, reactivate the 'add' button
  const removeNomination = (movieObj) => {
    movieObj.nominated = false;
    const index = searchResults.findIndex(
      (movie) => movie.title === movieObj.title
    );
    if (index !== -1) {
      searchResults[index].nominated = false;
    }
    let updatedNominations = nominations.filter(
      (nom) => nom.title !== movieObj.title
    );
    if (updatedNominations.length === 0) {
      updatedNominations = [];
    }
    setSearchResults(searchResults);
    setNominations(updatedNominations);
    localStorage.setItem("nominations", JSON.stringify(updatedNominations));
  };

  return (
    <>
      <Header />
      <main className="app">
        <Banner
          finished={finished}
          nominations={nominations}
          randomMovie={randomMovie}
        />
        <SearchBar debouncer={debouncer} loading={loading} />
        <Results
          searchTerm={searchTerm}
          searchResults={searchResults}
          addNomination={addNomination}
          noResults={searchTerm && searchResults.length === 0}
          disabled={nominations.length >= 5}
        />
        <Nominations
          nominations={nominations}
          removeNomination={removeNomination}
          nomCount={5 - nominations.length}
        />
        <ScrollToTopButton scrollToTop={scrollToTop} />
      </main>
      <Footer />
    </>
  );
};

export default App;
