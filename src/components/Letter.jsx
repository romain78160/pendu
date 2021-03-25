
import PropTypes from 'prop-types'

const Letter = ({ letter, etat, index, onClick }) => (
    <div className={`col-1 letterDiv`} >
      <button type="button" className={`btn btn-primary btn-sm`}  onClick={(event) => onClick(index)} disabled={etat}>
        {letter}
      </button>
    </div>
)

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    etat: PropTypes.oneOf([
      'disabled',
      '',
    ]).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

Letter.defaultProps={
    letter:"&",
    etat: '',
    index:0,
    onClick:() => {console.log('click letter')}
}
  
export default Letter