import React, { useState } from "react";
import "./App.css";
import Footer from "./layout/Footer/Footer";
import Navigation from "./layout/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Stats from "./Scenes/Stats/Stats";
import Timer from "./Scenes/Timer/Timer";
import Settings from "./Scenes/Settings/Settings";
import Page404 from "./Scenes/Page404/Page404";
import SettingsContext from "./Context/SettingsContext";

 function App() {
      const [showSettings,setShowSettings]=useState(false);
      const [workMinutes,setWorkMinutes]=useState(1);
      const [breakMinutes,setBreakMinutes]=useState(1);

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
          
          
          

          


        }}> 
            
              <Routes>
                <Route exact path="/" element={<Timer />} />
                <Route exact path="/Timer" element={<Timer />} />
                <Route exact path="/Stats" element={<Stats />} />
                <Route exact path="/Settings" element={<Settings />} />
                <Route element={<Page404 />} />
              </Routes>
          {/* {showSettings ? <Settings /> : <Timer />} */}
        </SettingsContext.Provider>
      </main>
      <Footer/>
      </React.Fragment>

      
    )
  }

export default App
 