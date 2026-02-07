import SongItem from './SongItem.jsx'

const SongsList = function(props){
    
    return props.songs.length?
    (<>
    <div className='SongsList'>
        <h2>My Favorite Songs</h2>
        {props.songs.map((song)=>{
            return (<SongItem 
                key={song.id} 
                id={song.id} 
                song={song} 
                onClick={props.viewSong} 
                editSong={props.editSong}
                deleteSong={props.deleteSong}/>);
        })}
    </div>
    </>) 
    :
    (<div>
        <h1>No songs yet.</h1>
        <p>C'mon! There must be at least some banger in your head these days...</p>
    </div>)
};

export default SongsList;