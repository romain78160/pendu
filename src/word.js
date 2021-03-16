
import PropTypes from 'prop-types'
import { Component } from 'react'


class WordArea extends Component {

    static defaultProps={
        value:"TEST",
        maskedvalue: "____",
        usedLetters : []
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        maskedvalue: PropTypes.string.isRequired,
        usedLetters: PropTypes.array.isRequired,
    }

    constructor(props){

        console.log("constructor WORD.props = ", props);
        super(props);
        this.mask = this.computeDisplay(props.value,"");
        // this.state = {
        //     maskedvalue: this.computeDisplay(props.value,""),
        // }
    }

    computeDisplay(phrase, usedLetters) {
      return phrase.replace(/\w/g,    (letter) => (usedLetters.includes(letter) ? letter : '_')  )
    }

    // 1er argument : futures props.  2e : futur état local.
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("UPDATE WORD = ");

        let newMask = this.computeDisplay(this.props.value, nextProps.usedLetters);

        //ne faire update si le mask ne change pas
        if((newMask === this.mask) ){return false}
        this.mask = newMask;
        return true;
    }
    
    render(){
        return(
            <div className="row justify-content-center wordSpace display-1">
                {
                    Array.from(this.mask).map((aChar, index) => (
                        <div key={index} className="col-1">{aChar}</div>
                    ))
                }
            </div>
        );
    }
}
  
export default WordArea