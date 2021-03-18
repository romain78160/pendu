import React, { Component } from 'react'

// import { FontAwesomeIc on } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import './App.css';
import Letter from './Letter';
import WordArea from './word';
import Parameters from './parameters';
import {generateLetters} from "./functions"

function INITSTATE(){
  return {
    canPlay : false,
    finished : false,
    letters : generateLetters(),
    currentWord: '',
    usedLetters : [],
    guesses: 0
  }
}


class App extends Component {
  state = INITSTATE();

  handleLetterClick = (index) =>{
    const {letters, usedLetters, guesses} = this.state;

    let currentLetter = letters[index];

    //incrementation des essais
    const newGuesses = guesses+ 1;//nombre d'essai de pair

    //ne pas reclicker sur la mm lettre
    if(usedLetters.includes(currentLetter))
    {
      return false;
    }
    usedLetters.push(currentLetter);  

    this.setState({usedLetters: usedLetters, guesses: newGuesses});
  }

  getStateBtn(index){
    const {letters, usedLetters} = this.state;

    if(usedLetters.includes(letters[index])){
      return "disabled";
    }
    else{
      return ""
    }
  }

  onClickPlay = (word) =>{

    this.setState({currentWord: word.toUpperCase(),canPlay : true});
  }

  onClickReplay = (event) => {
    this.setState(INITSTATE());
  }

  onClickHelp = (event) =>{
    const {usedLetters, currentWord} = this.state;

    let missingLetters = [...currentWord].filter(aLetter => !usedLetters.includes(aLetter));

    let max = missingLetters.length-1;
    let min = 0;
    let randIdx = Math.floor(Math.random() * (max - min + 1)) + min;
    usedLetters.push(missingLetters[randIdx]);

    this.setState({usedLetters: usedLetters});
  }

  onFinishWord = () =>{
    this.setState({finished : true});
  }

  render() {
    
    const {canPlay,letters, usedLetters, currentWord, finished} = this.state;

    return(

      <div className="container pt-2 pb-1">

        {!canPlay ?(

          // parmètres du jeu

          <Parameters currentWord={currentWord} onClickPlay={this.onClickPlay} />

        ):(
          //canPlay == true

          <div className="playArea">

            <WordArea value={currentWord} usedLetters={usedLetters} onFinish={this.onFinishWord} />

            <div className="row w-50 mb-5 mx-auto justify-content-center letterList">
              {
                letters.map((letter, index) => (

                  <Letter
                    letter={letter}
                    etat={this.getStateBtn(index)}
                    index={index}
                    key={index}
                    onClick={this.handleLetterClick}
                  />

                ))
              }
            </div>

            <div className="row justify-content-around ">

                {(!finished) && (
                  <button type="button" className="btn btn-primary" onClick={this.onClickHelp}>
                    <i className="fas fa-hand-holding-medical"></i> Aide
                  </button>
                )}

                <button type="button" className="btn btn-primary " onClick={this.onClickReplay}>
                  <i className="fas fa-sync-alt"></i> Replay
                </button>

            </div>
          </div>

        ) }

      </div>
    )
  }
}

export default App;
