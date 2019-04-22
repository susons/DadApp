import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SearchForm.css';

const SearchForm = props => {
  const onSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit();
  };
  return (
    <form onSubmit={onSubmit} className='form'>
    <input
    className='input'
      type='text'
      placeholder='Enter a search term...'
      onChange={event => props.onSearchChange(event.target.value)}/>

    <button className='button1' disabled={props.isFetchingJokes}>Search</button>

    <button
    className='button2'
      onClick={props.onSingleSeachClick}
      disabled={props.isFetchingJokes}>Im feeling funny!
    </button>
  </form>
  );
};

export default SearchForm;