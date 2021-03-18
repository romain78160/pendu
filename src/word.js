
import PropTypes from 'prop-types'
import { Component } from 'react'

import {computeDisplay} from "./functions"


class WordArea extends Component {

    static defaultProps={
        value:"WORD",
        usedLetters : [],
        onFinish : () => {console.log("FINISH")}
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        usedLetters: PropTypes.array.isRequired,
        onFinish: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);
        this.mask = computeDisplay(props.value,props.usedLetters);
        this.finished = false;
    }

    componentDidUpdate(prevProps, prevState){
        if (this.mask === this.props.value) {
            this.finished = true;
            this.props.onFinish();
        }
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
        
        return !this.finished;
    }
    
    render(){
        return(
            <div className="row justify-content-center wordSpace display-1 mx-auto">
                {
                    Array.from(this.mask).map((aChar, index) => (
                        <div key={index} className="mx-auto">{aChar}</div>
                    ))
                }
            </div>
        );
    }

}
  
export default WordArea