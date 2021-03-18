import React, { Component } from 'react'
import $ from "jquery";
import Notify from 'bootstrap4-notify'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import './App.css';
import Letter from './Letter';
import WordArea from './word';
import {generateLetters, getWord} from "./functions"

const MODELIST = [{id :"INPUT", lib: "Manuel"},{id: "DICO", lib:"Automatique"}];
const DEFAULTMODE = MODELIST[0];

function INITSTATE(){
  return {
    canPlay : false,
    finished : false,
    mode : DEFAULTMODE.id,
    letters : generateLetters(),
    currentWord: getWord(DEFAULTMODE.id).toUpperCase(),
    usedLetters : [],
    guesses: 0
  }
}


class App extends Component {
  state = INITSTATE();

  handleLetterClick = (index) =>{
    let {letters, usedLetters, guesses} = this.state;

    let currentLetter = letters[index];

    //incrementation des essais
    guesses++;

    //ne pas reclicquer sur la mm lettre
    if(usedLetters.includes(currentLetter))
    {
      return false;
    }
    usedLetters.push(currentLetter);

    this.setState({usedLetters: usedLetters, guesses: guesses});
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

  onClickPlay = (e) =>{

    if(!$("#aWord").val().match(/^[A-Za-z]+$/)){
      $.notify({
        // options
        icon: 'fas fa-exclamation',
        title: 'Saisie du mot',
        message: 'Le mot ne doit pas contenir de caratère spéciaux ni de ponctuation',
      },{
        // settings
        type: "danger",
        allow_dismiss: true,//TODO : a tester autorise la croix de fermeture
        newest_on_top: true,
        placement: {
          from: "top",//top, bottom
          align: "center"//left, center, right
        },
        offset: 20,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        }
      });
    }
    else{
      let currentWord = $("#aWord").val().toUpperCase();
      console.log(currentWord);
      this.setState({currentWord: currentWord ,canPlay : true});
    }
  }
  
  onChangeMode = (event) =>{
    let choosedMode = event.target.value;
    let currentWord = '';

    console.log("Change =",choosedMode);
    
    let idList = MODELIST.map(mode => mode.id);

    if (idList.includes(choosedMode)) {
      currentWord = getWord(choosedMode);
      
      this.setState({mode: choosedMode, currentWord: currentWord});
    }
  }

  onClickReloadWord = (event) =>{

    const {mode} = this.state;
    let currentWord = getWord(mode);

    this.setState({currentWord: currentWord});
  }

  onClickReplay = (event) => {
    this.setState(INITSTATE());
  }

  onClickHelp = (event) =>{
    const {usedLetters, currentWord} = this.state;

    let missingLetters = [...currentWord].filter(aLetter => !usedLetters.includes(aLetter));
    let max = missingLetters.length;
    let min = 0;
    let randIdx = Math.floor(Math.random() * (max - min + 1)) + min;
    usedLetters.push(missingLetters[randIdx]);
    this.setState({usedLetters: usedLetters});
  }

  onFinishWord = () =>{
    this.setState({finished : true});
  }

  render() {
    
    const {canPlay, mode, letters, usedLetters, currentWord, finished} = this.state;

    return(

      <div className="container pt-2 pb-1">

        {!canPlay ?(

          // parmètres du jeu
          <div className="card">
            <div className="card-header">
              Paramètres
            </div>
            <div className="card-body">
              
              <div className="input-group mb-3 w-25">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="selectMode">Mode</label>
                </div>
                <select className="custom-select" id="selectMode" defaultValue={mode}
                 onChange={this.onChangeMode} >
                   {
                     MODELIST.map((mode, index) => (                      
                      <option key={index} value={mode.id}>{mode.lib}</option>    
                    ))
                   }
                </select>
              </div>

              {
                mode === "INPUT"?
                (
                  <div>
                    <div className="row">

                      <div className="form-group">
                        <label htmlFor="aWord">Mot à trouvé: </label>
                        <input type="text" className="form-control" id="aWord"/>
                      </div>
                    </div>

                    
                  </div>                  
                  
                )
                :
                (
                  <div>
                    <div className="row">
                      <div className="form-group">

                      <label htmlFor="aWord">Mot à trouvé: </label>

                        <div className="input-group mb-3">
                            <input type="password" className="form-control" id="aWord" value={currentWord} readOnly/>
                          <div className="input-group-append">
                            <button type="button" className="btn btn-outline-primary" onClick={this.onClickReloadWord}>
                              <i className="fas fa-sync"></i>
                              </button>
                          </div>
                        </div>
                        
                        
                        
                      </div>

                    </div>
                  </div>
                )
              }

              <button type="button" className="btn btn-primary " onClick={this.onClickPlay}>
                <i className="fas fa-gamepad"></i> Play
              </button>

            </div>
          </div>

        ):(
          //canPlay == true

          <div className="playArea">

            <WordArea value={currentWord} usedLetters={usedLetters} onFinish={this.onFinishWord} />

            <div className="row w-50 mx-auto justify-content-center letterList">
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

            <div className="row justify-content-around">

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
