import { getYoutubeThumbnail } from "../utilities/youtube"
import {Pencil,Trash2} from "lucide-react"

const SongItem = function(props){
    return (<div id={props.id} onClick={()=> { props.onClick(props.id)}}  className="SongItem">
        <div className="SongData">
            <img src={getYoutubeThumbnail(props.song.video)} alt="Thumbnail" />
            <div className="NameAndAuthor">
                <div className="SongName">{props.song.name}</div>
                <div className="SongAuthor">{props.song.author||'Not Specified'}</div>
            </div>
        </div>
        <div className="buttons">
        <button className="editSong" 
        onClick={(e)=> { e.stopPropagation(); props.editSong(props.id)}}>
            <Pencil />
        </button>
        <button className="deleteSong" 
        onClick={(e)=> { e.stopPropagation(); props.deleteSong(props.id)}}>
            <Trash2 />
        </button>
        </div>
    </div>)     
};

export default SongItem;