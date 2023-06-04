import { FaTachometerAlt, FaUserCircle } from 'react-icons/fa'
import { BsFillFileEarmarkBarGraphFill } from 'react-icons/bs'
import { AiFillPieChart, AiOutlineCaretDown, AiOutlineFolderAdd } from 'react-icons/ai'
import { MdCurrencyExchange } from 'react-icons/md'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './inside/Dashboard';
import { Stock } from './inside/Stock';
import { ProDet } from './inside/StockDetails';
import { Sales } from './inside/Sales';
import { Reports } from './inside/Reports';
import image from '../images/Perfect 5 -side White.png'
import { MainNav } from './inside/Edit/EditMainNav';
import Test from './Test';
import { useContext } from 'react';
import AuthContext from './inside/context/AuthProvider';
import MyProfile from './inside/users/userProfile';
import axios from 'axios';


export const Home = () => {
    const { setAuth, auth } = useContext(AuthContext)
    const navigate = useNavigate()


    let user = localStorage.getItem('username')
    let role = localStorage.getItem('role')
    const logout = async () => {
        const tokken = localStorage.getItem('tokken')
        const response = await axios.post("http://localhost:4000/delete/tokken", { tokken })
        console.log(response.data)
        if (response.data == 'success') {
            localStorage.removeItem('tokken')
            localStorage.removeItem('role')
            localStorage.removeItem('username')
            setAuth(false)
            navigate('/')
        }

    }
    const Navigateerr = () => {
        return (
            <>
                <div>
                    <div className='bg-danger my-4 rounded-4'>
                        <div className='text-white text-uppercase text-center p-3 fw-bold'>
                            you do not have enough autherization to access this page..please see administrator
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className=''>
                <div style={{ height: '80px' }} className="d-flex flex-column justify-content-center bg-dark">
                    <div>
                        <div className='d-flex px-3 justify-content-between'>
                            <div>
                                <img src={image} width='100px' />
                            </div>
                            <div className='d-flex '>
                                <Link to='/Profile' className='btn d-flex text-white' style={{ gap: '10px' }}>
                                    <FaUserCircle className='fs-2' />
                                    <div className='text-uppercase fw-bold'>
                                        {user}
                                    </div>
                                </Link>
                                <button onClick={logout} className='btn btn-danger px-2 py-1'>logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='row' style={{ width: '100%', position: 'relative', minHeight: '100%' }}>
                        <div className='col-2 d-sm-block d-none'>
                            <div className="bg-dark snav ps-3 pt-4" style={{ position: 'sticky', top: '0', height: '100vh' }}>
                                <div className='d-flex flex-column'>
                                    <Link to='/'>
                                        <div className='d-flex'>
                                            <FaTachometerAlt className='' style={{ fontSize: '30px' }} />
                                            <div className='d-flex ps-3 d-none d-md-block flex-column justify-content-center white fw-bold'>
                                                Dashboard
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/Stock'>
                                        <div className='d-flex'>
                                            <BsFillFileEarmarkBarGraphFill className='' style={{ fontSize: '30px' }} />
                                            <div className='d-flex ps-3 d-none d-md-block flex-column justify-content-center white fw-bold'>
                                                Stock
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/Sales'>
                                        <div className='d-flex'>
                                            <MdCurrencyExchange className='' style={{ fontSize: '30px' }} />
                                            <div className='d-flex ps-3 d-none d-md-block flex-column justify-content-center fw-bold'>
                                                Sales
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/Reports'>
                                        <div className='d-flex'>
                                            <AiFillPieChart className='' style={{ fontSize: '30px' }} />
                                            <div className='d-flex ps-3 d-none d-md-block flex-column justify-content-center white fw-bold'>
                                                Reports
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/Edit'>
                                        <div className='d-flex'>
                                            <AiOutlineFolderAdd className='' style={{ fontSize: '30px' }} />
                                            <div className='d-flex ps-3 d-none d-md-block flex-column justify-content-center white fw-bold'>
                                                Edit
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-10'>
                            <div className='w-100'>
                                <Routes>
                                    <Route path='/' element={<Dashboard />} />
                                    <Route path='/Stock' element={<Stock />} />
                                    <Route path='/Stock/:id' element={<ProDet />} />
                                    <Route path='/Sales' element={<Sales />} />
                                    <Route path='/Reports' element={<Reports />} />
                                    <Route path='/Profile' element={<MyProfile />} />


                                    {/* this section contains routes specific to the data entry clerk */}
                                    {role == 'clerk' ?
                                        <>
                                            <Route path='/Edit' element={<MainNav />} />
                                            <Route path='/Edit/:stuff' element={<MainNav />} />
                                            <Route path='/test' element={<Test />} />
                                        </> :
                                        <Route path='/*' element={<Navigateerr />} />
                                    }
                                </Routes>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
