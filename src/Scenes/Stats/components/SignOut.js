import { Link } from "react-router-dom";
import React from "react";
import "../../Login/Login.css";


const signOut = props => {


  return (
    <Link className="sign-out-buttton"  onClick={props.onClick}  >
     
      Sign out
      {props.children}
    </Link>
  );
}

export default signOut;
