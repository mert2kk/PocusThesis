import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./Components/PlayButton";
import "../Timer/Timer.css";
import PauseButton from "./Components/PauseButton";
import SettingsButton from "./Components/SettingsButton";
import { useContext, useState, useRef, useEffect} from "react";
import SettingsContext from "../../Context/SettingsContext";
import { db,auth } from '../../FirebaseConfig';
import { query,collection,where,getDocs,updateDoc,doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';





const red ='#f54e4e';
const green ='#4aec8c';




 
function Timer() {

  
  const handlePause =()=> {
    setIsPaused(true); 
    isPausedRef.current = true; 
    
  }
  const handlePlay= () =>{
    setIsPaused(false); 
    isPausedRef.current = false;
  }

  

  const settingsInfo=useContext(SettingsContext)
  
  const[isPaused,setIsPaused]=useState(true);
  const[mode,setMode] = useState("Work");               //work/break/null
  const [secondsLeft,setSecondsLeft] = useState(0);
  const [session,setSession]=useState(0)
  const [time,setTime]= useState(0)
  


  const secondsLeftRef = useRef(secondsLeft);             //all functions is gonna used by the other functions
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const sessionRef =useRef(session)
  const sessionsRef = useRef(settingsInfo.sessions)
  



  const totalSeconds = mode === 'Work' 
  ? settingsInfo.workMinutes * 60 
  : settingsInfo.breakMinutes * 60
  const percentage = Math.round(secondsLeft/totalSeconds *100) ;
  
  const minutes = Math.floor(secondsLeft/60);
  let seconds = secondsLeft %60
  if (seconds < 10)  seconds = '0'+ seconds;



  function tick(){
                                            //removing one second from secondsleft 
    secondsLeftRef.current--               //or secondsLeftRef.current = setSecondsLeft.current - 1 
    setSecondsLeft(secondsLeftRef.current)  


  }
  function round(){
     sessionRef.current++
     setSession(sessionRef.current)
     
  }
 
  const [user, loading] = useAuthState(auth);
  const [data,setData] = useState("")


 

  // const getStats = async () => {
  //   const q = query(collection(db, "users"), where("uid", "==", user?.uid)); // if the uid in firebase is equal to the uid from auth
  //   const doc = await getDocs(q);
  //   const data = doc.docs[0].data();
  //   setData(data.time)
  //   updateDoc(q, data)
  //  .then(q => {
  //   console.log("A New Document Field has been added to an existing document");
  //  })
  // .catch(error => {
  //    console.log(error);
  //  })
  // }

 
  





  useEffect(  () => {

    const getStats = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid)); // if the uid in firebase is equal to the uid from auth
        const doc = await getDocs(q);
        const data = doc.docs[0].data();    
        const calculatedTime={time}
        updateDoc(q, calculatedTime)
     .then(data => {
      console.log(data)
      console.log("A New Document Field has been added to an existing document");
     })
    .catch(error => {
       console.log(error);
     })
    }
    
   
      
      secondsLeftRef.current = settingsInfo.workMinutes * 60;
      setSecondsLeft(secondsLeftRef.current);

      function switchMode (){
      const nextMode = modeRef.current === 'Work' ?'Break' :'Work';     // if the mode is work then it will be break otherwise it will be work
      const nextSeconds = (nextMode === 'Work' ? settingsInfo.workMinutes  : settingsInfo.breakMinutes)*60
      

      setMode(nextMode);               //chancing  the circle color
      modeRef.current=nextMode;
  
      setSecondsLeft(nextSeconds)                    //setting the left seconds              
      secondsLeftRef.current=nextSeconds;
    }

      let interval = Number ; 
       interval = setInterval(() => {
        
        if (isPausedRef.current ) {
          return;
        }
        if(sessionsRef.current === sessionRef.current){
          
          return ;
        }
        
        if (secondsLeftRef.current === 0) {
          
          if(modeRef.current ==='Work'){
            round()
            setTime(settingsInfo.workMinutes*sessionRef.current)
            if(!user){
              getStats()
              // setStats()
              }
          }
          return switchMode(); 
        }
  
        tick();
      },10);
      
      
      
      return () => clearInterval(interval);
    },[settingsInfo,user,time])
  

  return (
    
    <div className="timer-all">
      
      <div className="timer-wrapper">
        <div className='mode'>
        {mode}
        </div>
        
        <CircularProgressbar 
        value={percentage} 
        text={minutes + ':' + seconds} 
        styles={buildStyles({
        textColor:'#fff',
        pathColor:mode === 'Work' ? red:green,
        tailColor:'rgba(255,255,255,.2)',

        })}
        /> 
      </div>

      <div className="buttonsofsettings">
        
        {isPaused
          ? <PlayButton onClick={handlePlay}/> 

          : <PauseButton onClick={handlePause} />}
          <SettingsButton  to='/Settings'/>

      </div>
     
      <div className='session'>
          <div>{session} of {settingsInfo.sessions}</div>
          Sessions
      </div>
      <div>
        {time}
      </div>
        
        
    
    </div>
  );
}

export default Timer;


// const setStats = async () => {
//   try {
    
//     const q = query(collection(db, "users"), where("uid", "==", user?.uid)); // if the uid in firebase is equal to the uid from auth
//     const doc = await getDocs(q);
    
//     function setStats(e){
      
//       const data = doc(db,'users', user?.uid)
//       updateDoc(data,{
//         time:10,
        
//       } ).then(response => {
//         alert("updated")
//       }).catch(error =>{
//         console.log(error.message)
//       })}
    
    

    
//     setStats()

    
//   } catch (err) {
//     console.error(err);
//     alert("An error occured while fetching user data");
//   }
// };