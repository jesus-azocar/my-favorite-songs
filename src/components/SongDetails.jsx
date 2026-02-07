import {getYoutubeThumbnail,getYoutubeEmbedUrl} from '../utilities/youtube.js';

const SongDetails = function(props){
    const song = props.song;

    return (<div className="songDetails">
        <div className="left">
            <div className="songHeader">
                <div className="headerLeft">
                    <img src={getYoutubeThumbnail(song.video)} alt="Song" />
                </div>
                <div className="headerRight">
                    <h3>{song.name}</h3>
                    <span>{song.author||'Not Specified'}</span>
                </div>
            </div>
            
            <div class="lyricsContainer">{song.lyrics}</div>
        </div>
        <div className="right">
            <iframe 
  width="560" 
  height="315" 
  src={getYoutubeEmbedUrl(song.video)} 
  title="YouTube video player" 
  frameBorder="0" 
  allowFullScreen
></iframe>
        </div>
    </div>);
};

export default SongDetails;