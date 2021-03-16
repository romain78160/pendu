import React, { Component } from 'react'
import './App.css';
import Letter from './Letter';
import WordArea from './word';
// import dico from './dico.json'

const ALPHABET = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];



class App extends Component {
  state = {
    letters : this.generateLetters(),
    currentWord: this.getWord().toUpperCase(),
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

  getWord(){

    // console.log("dico[0] = ",dico[0]);
    //TODO lire fichier words.txt
    return "Romain";
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
  
  render() {
    
    const {letters, usedLetters, currentWord} = this.state;

    return(

      <div className="container">

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
    )
  }
}

export default App;
