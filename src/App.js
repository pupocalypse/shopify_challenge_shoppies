import React from "react";
import axios from "axios";

import Header from "./components/Header";
import Banner from "./components/Banner";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import Nominations from "./components/Nominations";
import Footer from "./components/Footer";

import "./styles/app.css";

const apiKey = "a3d02416";
const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=`;
const idDetailsUrl = `https://www.omdbapi.com?apikey=${apiKey}&i=`;

class App extends React.Component {
  state = {
    searchTerm: null,
    searchResults: [],
    nominations: [],
    loading: false,
    finished: false,
  };

  componentDidMount() {
    const savedNoms = localStorage.getItem("nominations");
    const nominations = JSON.parse(savedNoms);
    if (nominations && nominations.length > 0) {
      this.setState({
        nominations,
      });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    // once this.state.nominations has five movies, render Banner component
    // change state to finished: true
    if (
      prevState.nominations.length !== 5 &&
      this.state.nominations.length === 5
    ) {
      this.setState({
        finished: true,
      });
    }
    // set localStorage is nominations has changed
    let allNoms = this.state.nominations;
    localStorage.setItem("nominations", JSON.stringify(allNoms));
  }

  // trying something new - reduce load on rapid onChange input
  debouncer = () => {
    let timer;
    let input;
    return (e) => {
      if (timer) {
        clearTimeout(timer);
      }
      input = e.target.value;
      timer = setTimeout(() => {
        this.search(input);
        timer = null;
      }, 1000);
    };
  };

  search = (e) => {
    const movieTitle = e;
    if (!movieTitle) {
      this.setState({
        searchTerm: "",
        searchResults: [],
        loading: false,
      });
    } else {
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
          this.setState({
            loading: true,
            searchTerm: movieTitle,
          });
          return Promise.all(results);
        })
        .then((results) => {
          const matches = results
            .filter(
              (result) =>
                result.data.Genre.includes("Short") === false &&
                result.data.Genre !== "X"
            )
            .map((result) => {
              const nominations = this.state.nominations;
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
          this.setState({
            loading: false,
            searchResults: matches,
          });
        })
        .catch((error) => console.log(error));
    }
  };

  addNomination = (movieObj) => {
    // onClick event, passed to Results
    // receives result object
    // pushes nomination to setState
    // deactive 'add' button in Results list for that title
    if (this.state.nominations.length !== 5) {
      movieObj.nominated = true;
      this.setState({
        nominations: [...this.state.nominations, movieObj],
      });
    }
  };

  removeNomination = (movieObj) => {
    // onClick event, passed to Nominations
    // receives nomination object
    // pops nomination from setState
    // IF same title is displayed in Results, reactivate the 'add' button
    movieObj.nominated = false;
    let searchResults = this.state.searchResults;
    const index = searchResults.findIndex(
      (movie) => movie.title === movieObj.title
    );
    if (index !== -1) {
      searchResults[index].nominated = false;
    }
    let updatedNominations = this.state.nominations.filter(
      (nom) => nom.title !== movieObj.title
    );
    if (updatedNominations.length === 0) {
      updatedNominations = [];
    }
    this.setState({
      searchResults: searchResults,
      nominations: updatedNominations,
    });
    localStorage.setItem("nominations", JSON.stringify(updatedNominations));
  };

  render() {
    const nomCount = 5 - this.state.nominations.length;

    return (
      <>
        <Header />
        <main className="app">
          <Banner
            status={this.state.finished}
            nominations={this.state.nominations}
          />
          <SearchBar search={this.search} debouncer={this.debouncer} />
          <Results
            searchTerm={this.state.searchTerm}
            searchResults={this.state.searchResults}
            addNomination={this.addNomination}
            disabled={this.state.nominations.length >= 5}
            loading={this.state.loading}
          />
          <Nominations
            nominations={this.state.nominations}
            removeNomination={this.removeNomination}
            nomCount={nomCount}
          />
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
