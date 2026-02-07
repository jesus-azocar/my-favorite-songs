import { useState,useEffect } from 'react'
import SongsModal from './components/SongsModal.jsx'
import SongForm from './components/NewSong.jsx'
import NewSongButton from './components/NewSongButton.jsx'
import SongDetails from './components/SongDetails.jsx'
import SongsList from './components/SongsList.jsx'
import './App.css'

function App() {
  const [songs,setSongs] = useState(()=>{
    console.log("Intentando leer");
    var json = localStorage.getItem("favorite_songs");
    return (json)? JSON.parse(json) : [];
  });
  
  const [currentModal, setCurrentModal] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongInForm, setCurrentSongInForm] = useState(null);

  useEffect(function(){
    console.log("Deberiamos guardar");
    localStorage.setItem('favorite_songs',
      JSON.stringify(songs));
  },[songs]);

  const addSong = function(newSong){
    setSongs([...songs,newSong]);
  };

  const updateSong = function(newSong){
    const newList = songs.map((v)=>{
      if(v.id===newSong.id){
        return {...v,...newSong};
      }
      return v;
    });
    setSongs(newList);
  }

  const viewSong = function(id){
     
    const songObject = songs.find(function(v){ return v.id==id});
    if(songObject==undefined){
      alert("Uknown error");
    } 
    setCurrentSong(songObject);
    setCurrentModal("SongDetails");
  }

  const editSong = function(id){ 
    const songObject = songs.find(function(v){ return v.id==id});
    if(songObject==undefined){
      alert("Uknown error");
    } 
    setCurrentSongInForm(songObject); 
    console.log("Editando",songObject);
    setCurrentModal("NewSong");
  };

  const deleteSong = function(id){   
    if(!confirm("Do you really wish to delete this song?"))
      return;
    const newList = songs.filter((v)=>{
      return (v.id!=id)
    });
    setSongs(newList);
  };

  return (
    <>
    <SongsList songs={songs} viewSong={viewSong} editSong={editSong} deleteSong={deleteSong}/>
    <NewSongButton text="+" onClick={ () =>{ setCurrentModal("NewSong");} }/>
    <SongsModal visible={currentModal=="NewSong"} closeHandler={ () => setCurrentModal(null) }>
     <SongForm addSongFunction={addSong} updateSongFunction={updateSong} songToEdit={currentSongInForm}/>
    </SongsModal>
    <SongsModal visible={currentModal=="SongDetails"} closeHandler={ () => setCurrentModal(null) }>
      <SongDetails song={currentSong}/>
    </SongsModal >
    </>
  )
}

export default App
