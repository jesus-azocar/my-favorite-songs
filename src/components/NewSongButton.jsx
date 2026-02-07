const NewSongButton = function(props){
    return (<button onClick={props.onClick} className="NewSongButton">
        {props.text}
    </button>)     
};

export default NewSongButton;