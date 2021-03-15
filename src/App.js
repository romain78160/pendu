import React, { Component } from 'react'
import './App.css';
import Letter from './Letter';
import WordArea from './word';

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

class App extends Component {
  state = {
    letters : this.generateLetters(),
    currentWord: this.getWord(),
    guesses: 0
  }

  generateLetters() {
    const result = [];
    alphabet.forEach(aLetter => {
      result.push(aLetter.toUpperCase())
    });
    return result;
  }

  getWord(){
    return "POUETTE";
  }
  

  render() {
    
    const {letters, currentWord} = this.state;

    return(

      <div className="container">

        {/* <div className="row justify-content-center wordSpace">
          <div className="col-1">T</div>
          <div className="col-1">O</div>
          <div className="col-1">T</div>
          <div className="col-1">O</div>
        </div> */}

        <WordArea value={currentWord} />

        <div className="row w-50 mx-auto justify-content-center letterList">
          {
            letters.map((letter, index) => (

              <Letter
                letter={letter}
                etat="notFounded"
                index={index}
                key={index}
              />

            ))
          }
        </div>

      </div>
    )
  }
}

export default App;
