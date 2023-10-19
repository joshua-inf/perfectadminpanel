import { BsFillPersonFill } from 'react-icons/bs'
import image from '../images/www.jpg'
import image1 from '../images/Perfect5-side.png'
import { MdKey } from 'react-icons/md'
import { useState, useContext, useRef, useEffect } from 'react'
import AuthContext from './inside/context/AuthProvider'
import axios from 'axios'

const Login = () => {
    const userRef = useRef();
    const errorRef = useRef();

    //this section is for the section with the drop data that should used throughout the site
    const { setAuth, auth } = useContext(AuthContext);
    const {user, setUser} = useContext(AuthContext);
    const {role, setRole} = useContext(AuthContext);


    //usestate stuff
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const sendData = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/user', JSON.stringify({ username, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        // console.log(JSON.stringify(response?.data))
        // const accessToken = response?.data?.accessToken;
        // const roles = response?.data?.roles;
        if (response) {
            // setAuth(true)

            if (response.data == '' || response.data == 'user info is invalid') {
                setError('please check inputs again')
            } else {
                    setUsername('')
                    setPassword('')
                    let data = response.data
                    console.log(data)
                    localStorage.setItem('tokken', data.token)
                    localStorage.setItem('username', data.resusername)
                    localStorage.setItem('role', data.role)
                    localStorage.setItem('id', data.userid)
    
                    setAuth(true)
            }
        }

    }
    return (
        <>
            <div>
                <div className="bg-secondary" style={{ height: '100vh' }}>
                    <div className="d-flex h-100 justify-content-center">
                        <div className="d-flex flex-column  p-3 justify-content-center">
                            <div className='d-flex  bg-light shadow rounded-2' style={{ overflow: 'hidden' }}>
                                <div className=''>
                                    <img src={image} width='700px' />
                                </div>
                                <div className='p-3 text-center'>
                                    <div>
                                        <div>
                                            <img src={image1} width='200px' />
                                        </div>
                                        <div className='py-4'>
                                            "Please enter the login details to proceed!"
                                        </div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text p-3" id="inputGroup-sizing-default"><BsFillPersonFill /></span>
                                                        </div>
                                                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='enter email or username here' class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text p-3" id="inputGroup-sizing-default"><MdKey /></span>
                                                        </div>
                                                        <input type="password" value={password} name='pwd' onChange={e => setPassword(e.target.value)} placeholder='enter password' class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-danger text-uppercase my-2'>{error}</div>
                                        <div>
                                            <button onClick={sendData} className='btn btn-outline-success px-5'>log in</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login