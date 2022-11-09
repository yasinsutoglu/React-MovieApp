import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
// import {useNavigate} from "react-router-dom"

//creating context
export const AuthContext = createContext();

//Providing
const AuthProvider = ({children}) => {

  //  const navigate = useNavigate();
    const [genUser, setGenUser] = useState({ email: "", password: "", displayName:"", photoURL:"" });

    useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setGenUser({ ...genUser,
          email: email,
          displayName: displayName,
          photoURL: photoURL
        })
        
      } else {
        // User is signed out
        setGenUser({...genUser, email: "", password: "", displayName: "", photoURL: "" });
        //  navigate("/");
      }
    })     
    }, [])
    
   

    const values = {genUser,setGenUser}

  return (
    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


//Consuming Custom Hook
export const useAuthContext = ()=>{
    return useContext(AuthContext)
}