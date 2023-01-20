import React, { useState } from "react";
import "./App.css";
import Navigation from "./layout/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Stats from "./Scenes/Stats/Stats";
import Timer from "./Scenes/Timer/Timer";
import Settings from "./Scenes/Settings/Settings";
import Page404 from "./Scenes/Page404/Page404";
import SettingsContext from "./Context/SettingsContext";
import Login from "./Scenes/Login/Login";
import Todos from "./Scenes/Todos/Todos";



 function App() {
      const [showSettings,setShowSettings]=useState(false);
      const [workMinutes,setWorkMinutes]=useState(1);
      const [breakMinutes,setBreakMinutes]=useState(1);
      const [sessions,setSessions]=useState(3)
      

    return (
        
      <React.Fragment>
      <Navigation/>
      <main>
        <SettingsContext.Provider value={{
          showSettings,
          setShowSettings,
          workMinutes,
          setWorkMinutes,
          breakMinutes,
          setBreakMinutes,
          sessions,
          setSessions
         
          
          
          

          


        }}> 
            
              <Routes>
                <Route exact path="/" element={<Timer />} />
                <Route exact path="/Timer" element={<Timer />} />
                <Route exact path="/Stats" element={<Stats/>} />
                <Route exact path="/Settings" element={<Settings />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Todos" element={<Todos/>}/>

                
                <Route element={<Page404 />} />
              </Routes>
        </SettingsContext.Provider>
      </main>
      </React.Fragment>

      
    )
  }

export default App
 