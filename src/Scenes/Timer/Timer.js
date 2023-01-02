import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./Components/PlayButton";
import "../Timer/Timer.css";
import PauseButton from "./Components/PauseButton";
import SettingsButton from "./Components/SettingsButton";
import { useContext, useState, useRef, useEffect} from "react";
import SettingsContext from "../../Context/SettingsContext";




const red ='#f54e4e';
const green ='#4aec8c';




 
function Timer() {

  
  const handlePause =()=> {
    setIsPaused(true); 
    isPausedRef.current = true; 

  }

  

  const settingsInfo=useContext(SettingsContext)
  
  const[isPaused,setIsPaused]=useState(true);
  const[mode,setMode] = useState("work");               //work/break/null
  const [secondsLeft,setSecondsLeft] = useState(0);
  


  const secondsLeftRef = useRef(secondsLeft);             //all functions is gonna used by the other functions
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  



  const totalSeconds = mode === 'work' 
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

  

  

  useEffect(  () => {
  

    function switchMode (){
      const nextMode = modeRef.current === 'work' ?'break' :'work';     // if the mode is work then it will be break otherwise it will be work
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes  : settingsInfo.breakMinutes)*60
  
    
      setMode(nextMode);               //chancing  the circle color
      modeRef.current=nextMode;
  
      setSecondsLeft(nextSeconds)                    //setting the left seconds              
      secondsLeftRef.current=nextSeconds;
    } 

      secondsLeftRef.current = settingsInfo.workMinutes * 60;
      setSecondsLeft(secondsLeftRef.current);


      let interval = Number ; 
      // if (!isPausedRef.current){
        
       interval = setInterval(() => {
        if (isPausedRef.current) {
          return;
        }
        if (secondsLeftRef.current === 0) {
          return switchMode();
        }
  
        tick();
      },1000);
      
      return () => clearInterval(interval);
    }, [settingsInfo]);
    

    
    
    
    
    

    
  
  //   const  interval = setInterval(   () => {  
      
      
  //                                                             // when the component mounts,it will start the interval  
  //   if (isPausedRef.current) {                               // using isPaused 's References because 
  //     return;                   //dont do anything
  //   }
  //   if  (secondsLeftRef.current === 0) {
  //      return switchMode();             

  //   }
  //     tick()
      

  //   },100 );                                              

  //   return () => clearInterval(interval);                                               // when it is unmounted it will clear interval 
  // },[settingsInfo]);  
  

  

 
  

  return (
    <div className="timer-all">
      <div className="timer-wrapper">
        <CircularProgressbar 
        value={percentage} 
        text={minutes + ':' + seconds} 
        styles={buildStyles({
        textColor:'#fff',
        pathColor:mode === 'work' ? red:green,
        tailColor:'rgba(255,255,255,.2)',

        })}/> 
      </div>

      <div className="buttonsofsettings">
        
        {isPaused
          ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }}/> 

          : <PauseButton onClick={handlePause} />}
          <SettingsButton  to='/Settings'/>

      </div>
     
      
        
        
    
    </div>
  );
}

export default Timer;


