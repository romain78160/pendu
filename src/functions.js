import Dico from './dico.json'

const ALPHABET = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

export const computeDisplay = (phrase, _usedLetters) => {
    return phrase.replace(/\w/g,    (letter) => (_usedLetters.includes(letter) ? letter : '_')  )
}

export const generateLetters = () => {
    const result = [];
    ALPHABET.forEach(aLetter => {
      result.push(aLetter.toUpperCase())
    });
    return result;
  }

export const getWord = (mode) =>{
    let currentWord = "";

    if (mode === "DICO") {
      let max = Dico.list.length;
      let min = 0;
      let randomIdx = Math.floor(Math.random() * (max - min + 1)) + min;
      currentWord = Dico.list[randomIdx];
    }
    
    console.log("getWord currentWord = ",currentWord);
    return currentWord;
  }