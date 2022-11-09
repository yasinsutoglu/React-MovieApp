import {Outlet, Navigate} from  "react-router-dom"
import { useAuthContext } from "../context/AuthProvider"


const PrivateRouter = () => {
  const {genUser} = useAuthContext()
  

  return (
    <div>
       { genUser?.email  ? <Outlet/> : <Navigate to="/login"/>} 
      {/* { user ? <Outlet/> : <Navigate to="/login"/>} */}
    </div>
  );
}

export default PrivateRouter