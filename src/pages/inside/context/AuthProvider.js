import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth , setAuth] = useState(false);
    const [user, setUser] = useState('')
    const [role, setRole] = useState('')




useEffect(()=>{
        let tokken = localStorage.getItem('tokken')
        const tokkenReq = {value: tokken}
        const checkAuth = async () => {
            let request = await axios.post('http://localhost:4000/users/auth', tokkenReq
         )
            let data = request.data
         if(data =='true'){
            setAuth(true)
         } else {
            setAuth(false)
         }
        }

        checkAuth()

},[])
    return (
        <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContext;
