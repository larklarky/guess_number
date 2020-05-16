import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      target_number: '',
      computer_score: 0,
      user_score: 0,
      computer_guess: '',
      user_guess: 0,
      game_running: true,
    }
  }

  getNumber() {
    let random_number = Math.floor(Math.random() * 10);
    this.setState({target_number: random_number})
  }

  computerGuess() {
    let comp_number = Math.floor(Math.random() * 10);
    this.setState({computer_guess: comp_number})
  }


  IncrementItem() {
    if(this.state.user_guess < 9 ) {
      this.setState({user_guess: this.state.user_guess +1});
    }
  }

  
  DecreaseItem() {
    if(this.state.user_guess > 0) {
      this.setState({user_guess: this.state.user_guess -1})
    }
  }

  compareGuesses() {
    if (this.state.user_guess === this.state.computer_guess) {
        return 'human'; //user wins
    } else if (Math.abs(this.state.target_number - this.state.user_guess) < Math.abs(this.state.target_number - this.state.computer_guess) ) {
        return 'human'; //user wins
    } else {
        //computer wins
        return 'computer';
    }
  };

  

  updateScore() {
    let winner = this.compareGuesses();
    if (winner === 'computer') {
      this.setState({computer_score: this.state.computer_score + 1})
    } else {
      this.setState({user_score: this.state.user_score + 1})
    }
    
    this.setState({game_running: false})
    

  }



  advanceRound() {
    this.setState({ round: this.state.round + 1 })
    this.getNumber()
    this.computerGuess()
    this.setState({game_running: true})
  }


  componentDidMount() {
    this.getNumber();
    this.computerGuess();
  }

  render() {
    let target_number = '';
    

    return (
    <div className = 'App'>
      <div className = 'title'><h2>Guess Number</h2></div>
      <div className = 'grid-container'>
        <div className = 'round'>Round:  {this.state.round} </div>
        <div className = 'target-number'>Target Number: {(this.state.game_running == true) ? "?" : this.state.target_number } </div>
        <div className = 'computer'>
          <h3>Computer</h3>
          <p>Score: {this.state.computer_score} </p>
          <h1>{(this.state.game_running == true) ? "?" : this.state.computer_guess }</h1>
        </div>
        <div className = 'user'>
          <h3>User</h3>
          <p>Score: {this.state.user_score} </p>
          <input type = 'text' value = {this.state.user_guess} />
          <div className = 'number-control' >
            <button className='control-left' onClick = {() => this.DecreaseItem()}>–</button>
            <button className='control-right' onClick = {() => this.IncrementItem()}>+</button>
          </div>
          <button className = 'submit' disabled = { (this.state.game_running == true) ? false : true } onClick = {() => this.updateScore()}>Make a guess</button>
        </div>
        <div className = 'next-round'>
          <button className = 'submit' disabled = { (this.state.game_running == true) ? true : false } onClick = {() => this.advanceRound()}>Next Round</button>
        </div>
      </div>
    </div>
    )
  }
}


export default App;
