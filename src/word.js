
import PropTypes from 'prop-types'
import { Component } from 'react'

import {computeDisplay} from "./functions"


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
        this.mask = computeDisplay(props.value,props.usedLetters);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        let newMask = computeDisplay(this.props.value, nextProps.usedLetters);

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