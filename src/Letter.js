
import PropTypes from 'prop-types'

const Letter = ({ letter, etat, index, onClick }) => (
    <div className={`col-1 letterDiv`} onClick={() => onClick(index)}>
      <span className={`letterSpan ${etat}`}>
        {letter}
      </span>
    </div>
)

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    etat: PropTypes.oneOf([
      'founded',
      'notFounded',
    ]).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

Letter.defaultProps={
    letter:"&",
    etat: "notFounded",
    index:0,
    onClick:() => {console.log('coucou click')}
}
  
export default Letter

// function computeDisplay(phrase, usedLetters) {
//       return phrase.replace(/\w/g,    (letter) => (usedLetters.has(letter) ? letter : '_')  )
//     }