
import PropTypes from 'prop-types'

// const Letter = ({ letter, etat, index, onClick, used }) => (
const Letter = ({ letter, index, onClick, used }) => (
    <div className={`col-1 letterDiv`} >
      <button type="button" className={`btn btn-primary btn-sm`} 
            onClick={(event) => onClick(index)} disabled={used}>
        {letter}-{used}
      </button>
    </div>
)

// Letter.onClickBtn = (event)=>{
//   console.log("click btn !!!");
//   // console.log("this.props = ", this.props);
//   // this.props.onClick(this.index);
// }

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    // etat: PropTypes.oneOf([
    //   'disabled',
    //   '',
    // ]).isRequired,
    used: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

Letter.defaultProps={
    letter:"&",
    // etat: '',
    used: false,
    index:0,
    onClick:() => {console.log('click letter')}
}
  
export default Letter