import PropTypes from 'prop-types'
import { Component } from 'react'
import { getWord } from "./functions"
import $ from "jquery";
import Notify from 'bootstrap4-notify'

const MODELIST = [{id :"INPUT", lib: "Manuel"},{id: "DICO", lib:"Automatique"}];
const DEFAULTMODE = MODELIST[0];


class Parameter extends Component {
    static propTypes = {
        currentWord:        PropTypes.string.isRequired,
        onClickPlay:        PropTypes.func.isRequired,       
    }

    constructor(props){
        super(props);
        this.state={
            mode : DEFAULTMODE.id,
            currentWord: getWord(DEFAULTMODE.id).toUpperCase(),
        }
    }

    onChangeMode = (event) =>{
        let choosedMode = event.target.value;
        let currentWord = '';
        
        let idList = MODELIST.map(mode => mode.id);

        if (idList.includes(choosedMode)) {
            currentWord = getWord(choosedMode);
            
            this.setState({mode: choosedMode, currentWord: currentWord});
        }
    }

    onClickReloadWord = (event) =>{

        const {mode} = this.state;
        let currentWord = getWord(mode);
    
        this.setState({currentWord: currentWord});
      }

    onClickPlay = () =>{

        this.setState({currentWord: $("#aWord").val().trim()},() =>{
            //callback setState
            const {currentWord} = this.state;

            if(!currentWord.match(/^[a-zA-Z]+( [a-zA-Z]+)*$/)){
                //TOD: revoir la lib
                $.notify({
                    // options
                    icon: 'fas fa-exclamation',
                    title: 'Saisie du mot',
                    message: 'Le mot ne doit pas contenir de caratère spéciaux ni de ponctuation',
                },{
                    // settings
                    type: "danger",
                    allow_dismiss: true,
                    newest_on_top: true,
                    placement: {
                    from: "top",//top, bottom
                    align: "center"//left, center, right
                    },
                    offset: 20,
                    animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                    }
                });
            }
            else{
                this.props.onClickPlay(currentWord);
            }
        });        
    }

    checkWordFmrt = ({ target: { value } }) => {
        value = value
            //suppression de tous les digits // .replace(/\d+/g, '')
            //conserve UNIQUEMENT les lettres
            .replace(/[^a-zA-Z ]/g, '')
            //suppression des multiples espaces
            .replace( /\s\s+/g, ' ')
            
        this.setState({currentWord: value })
    }

    render(){

        const {mode, currentWord} = this.state;

        return(
            <div className="card">
                <div className="card-header">Paramètres</div>

                <div className="card-body">
                
                    <div className="input-group mb-3 w-25">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selectMode">Mode</label>
                        </div>
                        <select className="custom-select" id="selectMode" defaultValue={mode}
                                onChange={this.onChangeMode} >
                            {
                                MODELIST.map((mode, index) => (
                                <option key={index} value={mode.id}>{mode.lib}</option>    
                                ))
                            }
                        </select>
                    </div>

                    {mode === "INPUT"?
                        (
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="aWord">Mot à trouvé: </label>
                                    <input type="text" className="form-control" id="aWord"
                                        value={currentWord}
                                        onChange={this.checkWordFmrt} required={true}
                                    />
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="row">
                                <div className="form-group">

                                    <label htmlFor="aWord">Mot à trouvé: </label>

                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" id="aWord" 
                                            value={currentWord} 
                                            onChange={this.checkWordFmrt} required={true}
                                         readOnly/>
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-outline-primary" onClick={this.onClickReloadWord}>
                                                <i className="fas fa-sync"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <button type="button" className="btn btn-primary " onClick={this.onClickPlay}>
                        <i className="fas fa-gamepad"></i> Play
                    </button>

                </div>
          </div>
        )        

    }
}

export default Parameter