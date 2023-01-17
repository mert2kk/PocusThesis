import React from 'react'
import {Link} from 'react-router-dom'
import Login from '../../Scenes/Login/Login'
import Logo from '../Navigation/Logo/vector/default.svg'
import '../Navigation/Navigation.css'

function Navigation() {
  return (
    <div className="nav-bar-container-light">
              <Link to="/"><img src={Logo} className="website-logo"alt="logo" /></Link>
              
              <ul className="middle-items">
                <li className="list-item">
                  <Link to="/Timer" className="link-light">
                    Timer
                  </Link>
                </li>
                <li className="list-item">
                  <Link to="/Stats" className="link-light">
                    Stats
                  </Link>
                </li>
                <li className="list-item">
                  <Link to="/Settings" className="link-light">
                    Settings
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="theme-button"
                testid="theme"
                
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                  className="theme-img"
                  alt="theme"
                  
                />
                
              </button>
            
            <Login className='login'/>
              
              
            </div>
  )
}

export default Navigation