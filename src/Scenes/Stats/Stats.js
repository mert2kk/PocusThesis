
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../Stats/Stats.css";
import { auth, db } from "../../FirebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore";
import SignOut from "../Stats/components/SignOut";

function Stats() {
  const [user, loading] = useAuthState(auth);
  const [data,setData] = useState('')
  const navigate = useNavigate();
  

  const[stats,setStats]=useState([])

  
  useEffect(() => {
    const getStats = async () => {
      try {
        const q = query(collection(db, "stats"), where("uid", "==", user?.uid)); // if the uid in firebase is equal to the uid from auth
        const docs = await getDocs(q);
        const data = docs.docs[0];
        
  
        
        setStats(data)
        console.log(data)
  
        
        
  
        
      } catch (err) {
        console.error(err);
        alert("An error occured while getting user data");
      }
    };
    if (loading) return;
    if (!user) return navigate();

    
       getStats()

    
    
  }, [user, loading,navigate]);

  return (

     
      
     
      <div className="stats">
        <div className="stats-user">
          <div>{user?.displayName }</div>
          <div>{user?.email}</div>
          <div>
            
            
            {user 
            ?<div>             
                <div>
                    <img src={user?.photoURL} alt="pp"></img>
                </div>
                <div>
                    <SignOut   onClick={()=> auth.signOut()}/>
                </div>
                {/* <div>{stats?.worktime}</div> */}
                  

              </div>
            :
            <div></div>}
          </div>
          
          
        </div>
      </div>
  );
}

export default Stats;