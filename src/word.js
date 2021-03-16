
import PropTypes from 'prop-types'
import { Component } from 'react'


class WordArea extends Component {

    static defaultProps={
        value:"TEST",
        usedLetters : []
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        usedLetters: PropTypes.array.isRequired,
    }

    constructor(props){
        super(props);
        this.mask = this.computeDisplay(props.value,props.usedLetters);
    }

    computeDisplay(phrase, _usedLetters) {
      return phrase.replace(/\w/g,    (letter) => (_usedLetters.includes(letter) ? letter : '_')  ) 
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        let newMask = this.computeDisplay(this.props.value, nextProps.usedLetters);

        // console.log("this.mask = ",this.mask);
        // console.log("newMask = ",newMask);

        //ne faire update si le mask ne change pas
        // if( this.mask === newMask){
        //     console.log("update = false ");
        //     return false;
        // }
        // else{
            this.mask = newMask;
        //     console.log("update = true ");
        //     console.log("AFTER this.mask = ",this.mask);
        //     // console.log("AFTER  newMask = ",newMask);
        //     return true;
        // }

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