import React, { Component } from 'react'
import './App.css';
import Letter from './Letter';
import WordArea from './word';

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

class App extends Component {
  state = {
    letters : this.generateLetters(),
    currentWord: this.getWord().toUpperCase(),
    usedLetters : [],
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
    return "Romain";
  }

  handleLetterClick = (index) =>{
    let {letters, usedLetters, guesses} = this.state;

    let currentLetter = letters[index];

    //incrementation des essais
    guesses++;

    if(usedLetters.includes(currentLetter))
    {
      console.log("return false");
      return false;
    }
    usedLetters.push(currentLetter);

    console.log("handleClick continue");

    this.setState({usedLetters: usedLetters, guesses: guesses});

  }
  
  render() {
    
    const {letters, usedLetters, currentWord} = this.state;

    // WordAreaaa = () => <WordArea value={currentWord} />;

    return(

      <div className="container">

        {/* ******BEFORE******  */} 
        {/* <WordArea value={currentWord}  /> */}
        <WordArea value={currentWord} usedLetters={usedLetters} />
        {/* {/* ******BEFORE******  */}

        {/* // {WordAreaaa} */}

        <div className="row w-50 mx-auto justify-content-center letterList">
          {
            letters.map((letter, index) => (

              <Letter
                letter={letter}
                etat="notFounded"
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
