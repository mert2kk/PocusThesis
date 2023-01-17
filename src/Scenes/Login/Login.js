import { signInWithGoogle } from "../../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../FirebaseConfig";
import  SignOut  from "../Stats/components/SignOut";
import "./Login.css";
import { linkWithPopup } from "firebase/auth";




const Login = () => {
  const [user] = useAuthState(auth);




    return (
      <div className="login">
      <div className="login__container">
      
        {user
        
        ?<div>
          <div ><img  className="pp" src={user?.photoURL} onClick={linkWithPopup} alt="pp"></img></div>
          <SignOut  onClick={()=> auth.signOut()}/>

        </div>
        
        
        
        
        :<button className="login__btn" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
        
    }
        </div>
    
      </div>
    
    )
}

export default Login;