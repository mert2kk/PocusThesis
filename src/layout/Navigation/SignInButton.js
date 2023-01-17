import { Link } from "react-router-dom";
const SignInButton = (props) => {
    return (
        <Link className="settings-button" to={props.to}       exact={props.exact} onClick={props.onClick}   >
          
        
         Login
         {props.children}
       </Link>
    );
  }
  export default SignInButton
  