import { useState,useEffect } from 'react'
import SongsModal from './components/SongsModal.jsx'
import SongForm from './components/NewSong.jsx'
import NewSongButton from './components/NewSongButton.jsx'
import SongDetails from './components/SongDetails.jsx'
import Swal from 'sweetalert2'
import SongsList from './components/SongsList.jsx'
import { Toaster, toast } from 'sonner';
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
    setCurrentSongInForm({id:null,name:'',author:'',lyrics:'',video:''}); 
    setCurrentModal(null);
    toast("Song created successfully.");
  };

  const updateSong = function(newSong){
    const newList = songs.map((v)=>{
      if(v.id===newSong.id){
        return {...v,...newSong};
      }
      return v;
    });
    setSongs(newList);
    setCurrentSongInForm({id:null,name:'',author:'',lyrics:'',video:''}); 
    setCurrentModal(null);
    toast("Song updated successfully.");
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

  const deleteSong =  async function(id){   
    var res = await Swal.fire({
      title: "Do you want to delete the song?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`
    });
    if(!res.isConfirmed)
      return;
    const newList = songs.filter((v)=>{
      return (v.id!=id)
    });
    setSongs(newList);
    toast("Song deleted successfully.");
  };

  return (
    <>
    <SongsList songs={songs} viewSong={viewSong} editSong={editSong} deleteSong={deleteSong}/>
    <NewSongButton text="+" onClick={ () =>{ setCurrentModal("NewSong");} }/>
    <SongsModal 
    visible={currentModal=="NewSong"} 
    closeHandler={ () => {
      setCurrentSongInForm({id:null,name:'',author:'',lyrics:'',video:''}); 
      setCurrentModal(null)
      } }>
     <SongForm addSongFunction={addSong} updateSongFunction={updateSong} songToEdit={currentSongInForm}/>
    </SongsModal>
    <SongsModal visible={currentModal=="SongDetails"} closeHandler={ () => setCurrentModal(null) }>
      <SongDetails song={currentSong}/>
    </SongsModal >
    <Toaster/>
    </>
  )
}

export default App
