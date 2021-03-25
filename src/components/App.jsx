import React, { Component } from 'react'

// import { FontAwesomeIc on } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import '../css/App.css';
import Letter from './Letter';
import WordArea from './word';
import Parameters from './parameters';
import {generateLetters} from "../utils/functions"

const SUCCESSLIB  = "TROUVÉ !";
const LOSELIB     = "PERDU !";

function INITSTATE(){
  return {
    canPlay : false,
    finished : false,
    letters : generateLetters(),
    currentWord: '',
    usedLetters : [],
    guesses: 0,
    step: 0,// idx etape de l'image du pendu
    score:0,
    win :false
  }
}

class App extends Component {
  state = INITSTATE();

  handleLetterClick = (index) =>{
    const {letters, currentWord,  usedLetters, guesses, score, step, finished, win} = this.state;

    let currentLetter = letters[index];  

    let stateObj = {
      usedLetters: usedLetters, guesses: guesses+ 1, score: score,
      step: step, finished: finished, win: win
    }

    //ne pas reclicker sur la mm lettre
    if(stateObj.usedLetters.includes(currentLetter))
    {
      // TODO: autoriser le reclick
      stateObj.score = stateObj.score - 2;//-2 si reclick sur une lettre deja tentée
      return false;
    }
    stateObj.usedLetters.push(currentLetter);

    if ([...currentWord].includes(currentLetter)) {
      stateObj.score = stateObj.score +2;//+2 en cas de lettre trouvée
    } else {
      stateObj.score--;//-1 en cas de lettre non trouvée
      stateObj.step++;
    }

    if (stateObj.step === 11) {
      stateObj.finished = true;
      stateObj.win = false;
      stateObj.usedLetters = [...currentWord];//affichage du mot qui était à trouvé
    }

    this.setState(stateObj);
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

    // console.log("APP this.paramField = ",this.paramField)
    // this.setState({currentWord: word.toUpperCase(), canPlay : true});
    this.setState({currentWord: this.paramField.state.currentWord.toUpperCase(), canPlay : true});
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

    const {step} = this.state;
    //evenement quand le mot a été trouvé
    this.setState({finished : true, win: (step >=11?false:true)});
  }

  render() {
    
    const {canPlay, letters, usedLetters, currentWord, finished, score, step, win} = this.state;

    return(

      <div className="container pt-2 pb-1">

        {!canPlay ?(

          // parmètres du jeu

          <Parameters currentWord={currentWord} onClickPlay={this.onClickPlay} ref={(field) => { this.paramField = field }} />

        ):(
          //canPlay == true

          <div className="playArea">

            <div className="text-center" style={{height : '190px'}}>              
              { win ? (
                    <img src={`/etapes/win.jpg`} className="h-100 rounded img-thumbnail" alt=""/>
                  ):(
                    <img src={`/etapes/${step}.jpg`} className="h-100 rounded img-thumbnail" alt=""/>
                  )
                }      
            </div>
            
            
            {(finished) && (
              <div className="row">
                { win ? (
                    <h1 className="col display-3 text-center">{SUCCESSLIB}</h1>
                  ):(
                    <h1 className="col display-3 text-center">{LOSELIB}</h1>
                  )
                }
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
