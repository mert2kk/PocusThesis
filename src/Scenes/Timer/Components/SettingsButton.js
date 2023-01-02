import { Link } from "react-router-dom";
import React from "react";
import { UilSetting } from '@iconscout/react-unicons'

const SettingsButton = props => {


  return (
    <Link className="settings-button" to={props.to}       exact={props.exact}    >
     
     <UilSetting/>
      Settings
      {props.children}
    </Link>
  );
}

export default SettingsButton;
