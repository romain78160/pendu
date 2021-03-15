
import PropTypes from 'prop-types'

const WordArea = ({ value }) => (
    <div className="row justify-content-center wordSpace">
        {
            Array.from(value).map((aLetter, index) => (                
                <div className="col-1">{aLetter}</div>
            ))
        }
    </div>
)

WordArea.propTypes = {
    value: PropTypes.string.isRequired,
    maskedOutput: PropTypes.string.isRequired    
}

WordArea.defaultProps={
    value:"____",
    maskedOutput: "____"
}
  
export default WordArea

// function computeDisplay(phrase, usedLetters) {
//       return phrase.replace(/\w/g,    (letter) => (usedLetters.has(letter) ? letter : '_')  )
//     }