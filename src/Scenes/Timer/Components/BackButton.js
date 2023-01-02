import { Link } from "react-router-dom";
import { UilCornerDownLeft } from '@iconscout/react-unicons'

const BackButton =(props)=> {
  return (
    
      <Link  className="back-button" to={props.to} exact={props.exact}>
      <UilCornerDownLeft/>
      Back to  The timer
      </Link>
    
  );
}

export default BackButton;
