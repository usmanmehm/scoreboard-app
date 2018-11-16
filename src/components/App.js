import React, { Component } from 'react';

import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {

  state = {
    players: [
      { name: "Usman", score: 0, id: 1, isHighScore: false},
      { name: "Jeff", score: 0, id: 2, isHighScore: false},
      { name: "Mike", score: 0, id: 3, isHighScore: false},
      { name: "Ahmed", score: 0, id: 4, isHighScore: false},
      { name: "Saif", score: 0, id: 5, isHighScore: false}
    ]
  };

  //player id counter
  prevPlayerId = 5;

  handleScoreChange = (index, delta) => {

    let players = [...this.state.players];
    players[index].score += delta;
    players = this.handleHighScore(players);
    this.setState({ players: players });
  }

  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          { name, score: 0, id: this.prevPlayerId += 1 }
        ]
      }
    })
  }

  handleHighScore = (players) => {
    let max = 1;
    const totalPlayers = players.length;
    
    for (let i = 0; i < totalPlayers; i++) {
      if (players[i].score > max && players[i].score > 0) {
        max = players[i].score;
      };
    };
    
    for (let i = 0; i < totalPlayers; i++) {
      players[i].isHighScore = players[i].score === max ? true : false;
    };
    return players;
  };

  handleRemovePlayer = (id) => {

    let players = [...this.state.players];

    players = players.filter( player => player.id !== id);
    players = this.handleHighScore(players);
    this.setState({ players });
  }

  render() {
    return (
      <div className="scoreboard">
        <Header 
          title="Scoreboard" 
          players= { this.state.players } 
        />

        {/* Player List */}
        { this.state.players.map( (player, index) => 
          <Player 
          name={player.name} 
          score={player.score}
          id={player.id}
          key={player.id.toString()}
          index={index}
          isHighScore={player.isHighScore}
          changeScore={this.handleScoreChange} 
          removePlayer={this.handleRemovePlayer}
          // checkHighScore={this.handleHighScore}
          />
        )}
        <AddPlayerForm
          addPlayer = {this.handleAddPlayer}
         />
      </div>
    );
  }
}


export default App;
