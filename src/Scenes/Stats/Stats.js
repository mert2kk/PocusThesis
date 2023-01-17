
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
  

  const fetchData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid)); // if the uid in firebase is equal to the uid from auth
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      

      
      console.log(doc)
      setData(data)
      console.log(data)

      
      

      
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate();

    
       fetchData()
      
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading,navigate]);

  return (

     
      <div className="stats">
        <div className="stats-user">
          <div>{user?.displayName }</div>
          <div>{user?.email}</div>
          <div>
            
            {data.name}
            {user 
            ?             <img src={user?.photoURL} alt="pp"></img>
            :
            <div></div>}
          </div>
          <div>{data.time}</div>
          <div>
          <SignOut   onClick={()=> auth.signOut()}/></div>
        </div>
      </div>
  );
}

export default Stats;