import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { query,where,addDoc,collection,getDocs} from "firebase/firestore";
import {
      GoogleAuthProvider,
      getAuth,
      signInWithPopup,
      // signInWithEmailAndPassword,
      // createUserWithEmailAndPassword,
      // sendPasswordResetEmail,
    
      signOut,
      } from "firebase/auth";

      import {
        getFirestore,
        
    } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAyuXxOSdiUxnVjWJPQ0_2fc712fsy1y84",
  authDomain: "pocus-b206d.firebaseapp.com",
  projectId: "pocus-b206d",
  storageBucket: "pocus-b206d.appspot.com",
  messagingSenderId: "678955695192",
  appId: "1:678955695192:web:2ff3b17ff04e09c1479e2d",
  measurementId: "G-7Y52BDTSTJ"
}; 



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// const analytics = getAnalytics(app);


const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        time:user.time
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const  logout = () => {
  signOut(auth);
  
};
export {
  auth,
  db,
  signInWithGoogle,
  // logInWithEmailAndPassword,
  // registerWithEmailAndPassword,
  // sendPasswordReset,
  logout,
};

