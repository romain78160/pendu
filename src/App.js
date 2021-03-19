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
    guesses: 0,
    score:0
  }
}

class App extends Component {
  state = INITSTATE();

  handleLetterClick = (index) =>{
    const {letters, currentWord,  usedLetters, guesses, score} = this.state;

    let currentLetter = letters[index];
    let newScore = score;

    //incrementation des essais
    const newGuesses = guesses+ 1;//nombre d'essai

    //ne pas reclicker sur la mm lettre
    if(usedLetters.includes(currentLetter))
    {
      // TODO: autoriser le reclick
      newScore = newScore-2;//-2 si reclick sur une lettre deja tentée
      return false;
    }
    usedLetters.push(currentLetter);

    if ([...currentWord].includes(currentLetter)) {
      newScore = newScore +2;//+2 en cas de lettre trouvée
    } else {
      newScore--;//-1 en cas de lettre non trouvée
    }

    this.setState({usedLetters: usedLetters, guesses: newGuesses, score: newScore});
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
    const {usedLetters, currentWord, score} = this.state;

    let missingLetters = [...currentWord].filter(aLetter => !usedLetters.includes(aLetter));

    let max = missingLetters.length-1;
    let min = 0;
    let randIdx = Math.floor(Math.random() * (max - min + 1)) + min;
    usedLetters.push(missingLetters[randIdx]);

    const newScore = score - 3;//-3 si demande d'aide

    this.setState({usedLetters: usedLetters, score: newScore});
  }

  onFinishWord = () =>{
    this.setState({finished : true});
  }

  render() {
    
    const {canPlay,letters, usedLetters, currentWord, finished, score} = this.state;

    return(

      <div className="container pt-2 pb-1">

        {!canPlay ?(

          // parmètres du jeu

          <Parameters currentWord={currentWord} onClickPlay={this.onClickPlay} />

        ):(
          //canPlay == true

          <div className="playArea">
            {(finished) && (
              <div className="row">
                <h1 className="col display-3 text-center">TROUVÉ !</h1>
              </div>
            )}

            <WordArea value={currentWord} usedLetters={usedLetters} onFinish={this.onFinishWord} />

            {(!finished) && (
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
            )}
            

            <div className="row justify-content-center mb-5 text-center">
              <div className="col">
                <blockquote className="blockquote display-4 text-center">
                    Score : {score}
                    {(!finished) && (
                      <footer className="blockquote-footer">lettre trouvée = +2 , lettre non trouvée = -1 , aide = -3 </footer>
                    )}                  
                </blockquote>
              </div>
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
