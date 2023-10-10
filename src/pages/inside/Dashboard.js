import { BsFillBoxFill } from 'react-icons/bs'
import { ImBoxAdd, ImBoxRemove } from 'react-icons/im'
import { BsGraphUpArrow } from 'react-icons/bs'
import { VscGraphLine } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { TotalStock } from './stockFunctions/somefunction'
const Dashboard = () => {
    return (
        <>
            <div className="py-4">
                <div className="fs-1 fw-bold mb-4">Dashboard</div>
                <div>
                    <div>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className='d-flex w-100 p-0 flex-column justify-content-center'>
                                    <div className='d-flex border shadow w-100 p-3 rounded-4 justify-content-center'>
                                        <div>
                                            <div className="text-center">
                                                <div className='text-center fs-1'><BsFillBoxFill /></div>
                                                <div className='h4 d-flex flex-column justify-content-center fw-bold'><TotalStock/></div>
                                                <div className='d-flex flex-column justify-content-center fw-bold h5'>Total Stock</div>
                                            </div>
                                            <div className='text-end'>
                                                <Link to='/Stock'>more insight</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className='d-flex w-100 border shadow rounded-4 p-3 flex-column justify-content-center'>
                                    <div className='d-flex w-100 p-0 justify-content-center'>
                                        <div>
                                        <div className="text-center">
                                            <div className='text-center fs-1' ><ImBoxAdd /></div>
                                            <div className='h4 d-flex flex-column justify-content-center fw-bold'>1000</div>
                                            <div className='d-flex flex-column justify-content-center fw-bold h5'>Stock coming in</div>
                                        </div>
                                        <div className='text-end'>
                                            <Link to=''>more insight</Link>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className='d-flex w-100 border shadow rounded-4 p-3 flex-column justify-content-center'>
                                    <div className='d-flex w-100 p-0 justify-content-center'>
                                        <div>
                                            <div className="text-center">
                                                <div className='text-center fs-1'><ImBoxRemove /></div>
                                                <div className='h4 d-flex flex-column justify-content-center fw-bold'>1000</div>
                                                <div className='d-flex flex-column justify-content-center fw-bold h5'>Stock going out</div>
                                            </div>
                                            <div className='text-end'>
                                                <Link to=''>more insight</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className='d-flex w-100 border shadow rounded-4 p-3  flex-column justify-content-center'>
                                    <div className='d-flex w-100 p-0 justify-content-center'>
                                        <div>
                                            <div className="text-center">
                                                <div className='text-center fs-1' ><VscGraphLine /></div>
                                                <div className='h4 d-flex text-danger'><BsGraphUpArrow className='bg-danger text-white  fs-3 p-1' />67.76%</div>
                                                <div className='d-flex flex-column justify-content-center fw-bold h5'>Sales</div>
                                            </div>
                                            <div className='text-end'>
                                                <Link to=''>more insight</Link>
                                            </div>
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

export default Dashboard