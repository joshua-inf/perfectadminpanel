import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)




    useEffect(() => {
        let tokken = localStorage.getItem('tokken')
        const tokkenReq = { value: tokken }
        const checkAuth = () => {
            setLoading(true)
            axios.post('http://localhost:4000/users/auth', tokkenReq
            ).then((request) => {
                let data = request.data
                console.log(data)
                if (data == 'value exists') {
                    setAuth(true)
                } else {
                    setAuth(false)
                    localStorage.removeItem('tokken')
                    localStorage.removeItem('role')
                    localStorage.removeItem('username')
                }

            }).finally(() => setLoading(false))
        }

        checkAuth()

    }, [])
    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
            {loading ?
                <div>
                    <h1>Loading..</h1>
                </div>
                :
                children

            }
        </AuthContext.Provider>
    )
}



export default AuthContext;
