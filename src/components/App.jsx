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

const INITSTATE = {
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

class App extends Component {
  state = {...INITSTATE};

  handleLetterClick = (index) =>{
    const {letters, currentWord,  usedLetters, guesses, score, step, finished, win} = this.state;

    //recup de la letre clické selon son index
    let currentLetter = letters[index];  

    //init du nouvel état
    let stateObj = {
      usedLetters: usedLetters,
      guesses: guesses + 1,
      score: score,
      step: step, //etape de l'erreur (index de l'image du pendu)
      finished: finished,
      win: win
    }

    //ne pas reclicker sur la mm lettre
    if(stateObj.usedLetters.includes(currentLetter))
    {
      // TODO: autoriser le reclick
      stateObj.score = stateObj.score - 2;//-2 si reclick sur une lettre deja tentée
      return false;
    }

    //ajout de la nouvelle lettre dans l'etat
    stateObj.usedLetters.push(currentLetter);

    //calcul du score selon la lettre
    if ([...currentWord].includes(currentLetter)) {
      stateObj.score = stateObj.score +2;//+2 en cas de lettre trouvée
    } else {
      stateObj.score--;//-1 en cas de lettre non trouvée
      stateObj.step++;//incrementation du nombre d'erreur
    }

    // verification du nombre de click pour detection de fin de jeu
    if (stateObj.step === 11) {
      stateObj.finished = true;
      stateObj.win = false;
      stateObj.usedLetters = [...currentWord];//affichage du mot qui était à trouvé
    }

    console.log("Replay state = ", {...INITSTATE})

    this.setState(stateObj);
  }

  // getStateBtn(index){
  //   const {letters, usedLetters} = this.state;

  //   if(usedLetters.includes(letters[index])){
  //     return "disabled";
  //   }
  //   else{
  //     return ""
  //   }
  // }
  getUsedBtn(index){
    const {letters, usedLetters} = this.state;

    if(usedLetters.includes(letters[index])){
      return true;
    }
    else{
      return false
    }
  }

  onClickPlay = (word) =>{
    this.setState({currentWord: this.paramField.state.currentWord.toUpperCase(), canPlay : true});
  }

  onClickReplay = (event) => {
    console.log("Replay state = ", {...INITSTATE})
    this.setState({...INITSTATE});
  }

  onClickHelp = (event) =>{
    const {usedLetters, currentWord, score} = this.state;

    let missingLetters = [...currentWord].filter(aLetter => !usedLetters.includes(aLetter));

    let max = missingLetters.length-1;
    let min = 0;
    let randIdx = Math.floor(Math.random() * (max - min + 1)) + min;
    usedLetters.push(missingLetters[randIdx]);

    let newScore = score - 3;//-3 si demande d'aide

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

            {/* Liste des boutons */}
            {(!finished) && (
                <div className="row w-50 mb-5 mx-auto justify-content-center letterList">
                  {
                    letters.map((letter, index) => (
    
                      <Letter
                        letter={letter}
                        // etat={this.getStateBtn(index)}
                        index={index}
                        key={index}
                        onClick={this.handleLetterClick}
                        used={this.getUsedBtn(index)}
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
