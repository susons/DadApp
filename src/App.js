import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import SearchForm from './SearchForm'
import { runInThisContext } from 'vm';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      jokes: [],
      isFetchingJoke: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  // componentDidMount() {
  //   this.searchJokes();
  // }

  onSearchChange(value) {
    this.setState({ searchTerm: value});
  }

  renderJokes() {
    return(
      <ul className='jokesContainer'>
      {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
      </ul>
    );
  }

  searchJokes(limit=20) {
    this.setState({ isfetchingJoke: true })
    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
      }).then(response => response.json()).then(json =>  {
        const jokes = json.results;
        this.setState({
          jokes: jokes,
          isfetchingJoke: false
        });
      });
  }

  render() {
    return (
      <div className='MainContainer'>
        <img src='https://lh3.googleusercontent.com/Y0ENtdC3WqvMCcbfGiHnvO5mGF24VtGy8K67lLBk0bcnHoSutxXMO13WbAKFM7gsNA' />
      <SearchForm
        onFormSubmit={this.searchJokes}
        onSearchChange={this.onSearchChange}
        isFetchingJoke={this.state.isFetchingJoke}
        onSingleSeachClick={() => this.searchJokes(1)}
      />
        {this.state.isFetchingJoke ? 'Searching for jokes...' : this.renderJokes()}
      </div>
    );
  }
}




export default App;
