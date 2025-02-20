import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Load from "../component/Load";
import { Authcontext } from "./Authprovider";


const Privateroute = ({children}) => {
    const {user,loading} = useContext(Authcontext);
    const location = useLocation()
    if(loading){
        return <Load></Load>
    }

    if(user && user?.email){
        return children
    }
    return <Navigate state={location.pathname} to='/signin'></Navigate>
};

export default Privateroute;