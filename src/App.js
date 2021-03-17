import React, { Component } from 'react'
import $ from "jquery";
import Notify from 'bootstrap4-notify'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import './App.css';
import Letter from './Letter';
import WordArea from './word';
import Dico from './dico.json'
import {computeDisplay} from "./functions"

//TODO: chercher icon pour espace
const ALPHABET = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const MODELIST = ["INPUT", "DICO"];



class App extends Component {
  state = {
    canPlay : false,
    mode : MODELIST[0],
    letters : this.generateLetters(),
    currentWord: this.getWord(MODELIST[0]).toUpperCase(),
    usedLetters : [],
    guesses: 0
  }

  generateLetters() {
    const result = [];
    ALPHABET.forEach(aLetter => {
      result.push(aLetter.toUpperCase())
    });
    return result;
  }

  getWord(mode){
    // const {mode} = this.state;
    let currentWord = "";

    if (mode === "DICO") {
      let max = Dico.list.length;
      let min = 0;
      let randomIdx = Math.floor(Math.random() * (max - min + 1)) + min;
      currentWord = Dico.list[randomIdx];
    }

    console.log("currentWord = ",currentWord);
    return currentWord;
  }

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

    console.log("onSubmitParam");

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
      //TODO: setState CanPlay = true
      this.setState({canPlay : true});
    }
  }
  
  onChangeMode = (event) =>{
    let choosedMode = event.target.value;
    let currentWord = '';

    if (MODELIST.includes(choosedMode)) {
      currentWord = this.getWord(choosedMode);
      
      this.setState({mode: choosedMode, currentWord: currentWord});
    }
  }

  onClickReload = (event) =>{

    const {mode} = this.state;
    let currentWord = this.getWord(mode);

    this.setState({currentWord: currentWord});
  }

  render() {
    
    const {canPlay, mode, letters, usedLetters, currentWord} = this.state;

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
                <select className="custom-select" id="selectMode" onChange={this.onChangeMode} >
                  <option defaultValue value="INPUT">Saisie</option>
                  <option value="DICO">Dico</option>
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

                        <div className="input-group mb-3">
                          <input type="password" className="form-control" id="aWord" value={currentWord} readOnly/>
                          <div className="input-group-append">
                            <button type="button" className="btn btn-outline-primary" onClick={this.onClickReload}>
                              <i className="fas fa-sync"></i>
                              </button>
                          </div>
                        </div>
                        
                        
                        
                      </div>

                    </div>
                  </div>
                )
              }

              <button type="button" className="btn btn-primary" onClick={this.onClickPlay}>Play</button>

            </div>
          </div>

        ):(

          <div className="playArea">

            <WordArea value={currentWord} usedLetters={usedLetters} />

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
          </div>

        ) }

      </div>
    )
  }
}

export default App;
