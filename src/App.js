import React, { Component } from 'react';
import './App.css';

import $ from 'jquery';

import tags from "./requestData/tags.json";
import phrases from "./requestData/phrases.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      imgBinary: ''
    }
  }

  componentDidMount = () => {
    const tag = tags[Math.floor(Math.random() * tags.length)];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    $.ajax({
      type: 'GET',
      url: `https://cataas.com/c/${tag}/s/${phrase}`,
      cache: false,
      xhr: () => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        return xhr;
      },
      success: (data) => {
        this.setState({
          isLoaded: true,
          imgBinary: data
        })
      },
      error: () => {
        console.log('Error in ajax request\n');
      }
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return(
        <div className="App">
          <h1>Ждём кота...</h1>
        </div>
      );
    } else {
      return(
        <div className="App">
          <h1>Ваш кот:</h1>
          <img src={URL.createObjectURL(this.state.imgBinary)} />
        </div>
      );
    }
  }
}

export default App;
