import PropTypes from 'prop-types'
import { Component } from 'react'
import { getWord } from "../utils/functions"

// password avec show/hide
// import BootPwd from 'bootstrap-show-password'

const MODELIST = [{id :"INPUT", lib: "Manuel"},{id: "DICO", lib:"Automatique"}];
const DEFAULTMODE = MODELIST[1];


class Parameter extends Component {
    static propTypes = {
        // currentWord:        PropTypes.string.isRequired,
        onClickPlay:        PropTypes.func.isRequired,       
    }

    constructor(props){
        super(props);
        this.state={
            mode : DEFAULTMODE.id,
            currentWord: getWord(DEFAULTMODE.id).toUpperCase(),
            showWord : false //
        }
    }

    onChangeMode = (event) =>{
        let choosedMode = event.target.value;
        let currentWord = '';
        
        let idList = MODELIST.map(mode => mode.id);

        //aucun changement si le mode n'est pas reconnu
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

    onTogglePwd = (event) =>{
        this.setState({showWord: !this.state.showWord});
    }

    onClickPlay = () =>{
        const {currentWord} = this.state;
        this.props.onClickPlay(currentWord.trim());
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

        const {mode, currentWord, showWord} = this.state;

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
                    
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="aWord">Mot à trouvé: </label>
                            <div className="input-group mb-3">
                                
                                <input type={(showWord)?"text":"password"} className="form-control"
                                     id="aWord" value={currentWord} 
                                    onChange={this.checkWordFmrt} required={true}
                                    readOnly={(mode === "DICO")}
                                />
                                
                                <div className="input-group-append ml-1">
                                    <button type="button" className="btn btn-outline-primary" 
                                        title="Cacher/monter le mot"onClick={this.onTogglePwd}>
                                        {(showWord)?
                                            (<i className="fas fa-eye-slash"></i>)
                                        :
                                            (<i className="fas fa-eye"></i>)
                                        }
                                    </button>
                                    
                                    {mode !== "INPUT" && (
                                        <button type="button" className="btn btn-outline-primary" onClick={this.onClickReloadWord}>
                                            <i className="fas fa-sync"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary " onClick={this.onClickPlay}>
                        <i className="fas fa-gamepad"></i> Play
                    </button>

                </div>
          </div>
        )        

    }
}

export default Parameter