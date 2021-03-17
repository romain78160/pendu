export const computeDisplay = (phrase, _usedLetters) => {
    return phrase.replace(/\w/g,    (letter) => (_usedLetters.includes(letter) ? letter : '_')  )
}