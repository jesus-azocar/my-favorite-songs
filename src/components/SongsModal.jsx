const SongsModal = function(props){
    return props.visible?
    (<div className="SongsModal">
        <div className="modal">
        <span className="closeButton" onClick={props.closeHandler}>&times;</span>
        {props.children}</div>
    </div>) 
    : (<></>)
    
};

export default SongsModal;