import {useState} from 'react'

const SongForm = function(props){
    const isEditing = props.songToEdit? true : false;
    console.log("isEditing",isEditing);

    const [songProps,setSongProps] = useState({
        id:props.songToEdit?.id || null,
        name:props.songToEdit?.name ||'',
        author:props.songToEdit?.author ||'',
        lyrics:props.songToEdit?.lyrics ||'',
        video: props.songToEdit?.video || ''
    });

    const [currentMessage,setCurrentMessage] = useState("");

    const handleChange = function(e){
        const {name, value} = e.target;
        setSongProps({
            ...songProps,
            [name]:value
        });
    };

    const handleSubmission = function(e){
        e.preventDefault();
        if(songProps.id==null || songProps.id==undefined){
            const newSong = {...songProps,id:(new Date()).getTime()}
            props.addSongFunction(newSong);
         }else{
            props.updateSongFunction({...songProps});
         }
        setSongProps({name:'',lyrics:'',video:''}); 
    };

    return (<form onSubmit={handleSubmission} className="NewSongForm">
        <h3>{!isEditing?'New Song':'Edit Song'}</h3>
        {currentMessage.trim()!='' && 
        <span className="message">
            {currentMessage}
            <span className="dismissMessage" onClick={()=>setCurrentMessage("")}>&times;</span>
        </span>}
       <div className="row">
            <label>Name</label>
            <input 
                name="name"
                onChange={handleChange} 
                value={songProps.name} 
                type="text" 
                required/>
        </div>
        <div className="row">
            <label>Author</label>
            <input 
                name="author"
                onChange={handleChange} 
                value={songProps.author} 
                type="text" 
                required/>
        </div>
        <div className="row">
            <label>YouTube Link</label>
            <input 
                onChange={handleChange} 
                value={songProps.video} 
                type="url" 
                name="video"
                required/>
        </div> 
        <div className="row">
            <label>Lyrics</label>
            <textarea 
                onChange={handleChange} 
                value={songProps.lyrics} 
                name="lyrics"
                required></textarea>
        </div>
        <button type="submit">Save</button>
    </form>)     
};

export default SongForm;