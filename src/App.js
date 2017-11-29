/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQCI4QxOSxFm8xHTIOBbVlsmid74OCoPbnn8fpFN3WlRiqoSsu3IbiqqwCU2nNwjiPvdI2-I-4w_87FjrEqaNbE9PSzZwdfX4zQt8ycC_irXEY3fIA8uVfNtye4FKtHNOYygD6hL4s2o7QhVLQhsXm4';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();

    this.state = {
      numberMusic: 0,
      songsLoaded: false,
    };
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ songs: data.items });
        this.setState({ songsLoaded: true });
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          {this.state.songsLoaded ?
          <div>
            <p>{this.state.songs.length} musiques pour jouer</p>
            <p>Première chanson : {this.state.songs[0].track.name}</p>
          </div>:
          <img src={loading} alt="logo"/>}
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;
