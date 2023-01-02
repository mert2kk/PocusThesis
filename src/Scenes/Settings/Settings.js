import React, {  useContext } from 'react'
import ReactSlider from 'react-slider'
import SettingsContext from '../../Context/SettingsContext'
import '../Settings/Settings.css'
import BackButton from '../Timer/Components/BackButton'




function Settings() {




   
  
    const settingsInfo = useContext(SettingsContext)


    return (
      <div>
        <label>Work:{settingsInfo.workMinutes} Minutes </label>
        <ReactSlider 
        className='slider-work'
        thumbClassName='thumb-work'
        trackClassName='track'
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
        />
        <label>Break: {settingsInfo.breakMinutes} Minutes</label>
        <ReactSlider 
        className='slider-break'
        thumbClassName='thumb-break'
        trackClassName='track-break'
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
        />
        <div>
          <BackButton className='back-button' to='/Timer' />
        </div>
        



      </div>
    )
  }
  export default Settings


