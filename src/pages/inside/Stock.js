import { Link } from "react-router-dom"
import { BsFillFileBarGraphFill } from 'react-icons/bs'
import { useEffect, useState } from "react"
import axios from "axios";
import Checkcount from "./stockFunctions/somefunction";


export const Stock = () => {
    const [datas, setDataa] = useState('');
    
    
    useEffect(() => {
        async function getData() {
            const response = await fetch('http://localhost:4000/getData')
            const responsedta = await response.json();
            setDataa(responsedta)
            console.log(responsedta)
        }

        getData()
    }, [])
    const checkDatas = () => {
        if (datas) {
            return (
                <>
                {datas.map((e) => 
                
                ( 
                    <>
                        <div className="col-md-4 col-xlg-1 col-lg-3 col-6">
                            <div className="border">
                                <div className="bg-secondary text-center">
                                    <img style={{maxHeight:'200px', maxWidth:'100%'}} src={`http://localhost:4000/getimg/` + e.productimagename} />
                                </div>
                                <div className="p-2">
                                    <div className="text-uppercase">
                                        {e.productname}
                                    </div>
                                    <div className="d-flex mt-3 justify-content-between">
                                        <div className="d-flex fw-bold">
                                            <BsFillFileBarGraphFill className="fs-4 text-dark " />
                                            <div className=""><Checkcount name={e.productid}/></div>
                                        </div>
                                        <div className="">
                                            <Link to={'/Stock/' + e.productid} className="btn btn-outline-dark rounded-0 p-1 text-decoration-none">view</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                ))}
            </>
        )
        } else (
            console.log('false')
        )

    }


    return (
        <>
            <div className="bg-light" style={{ minHeight: '100vh' }}>
                <div>
                    <div className="p-3 bg-white row">
                        <div className="col-12 col-sm-6">
                            <div className="d-flex" style={{ gap: '20px' }}>
                                <div>Total Stock:</div>
                                <div className="fw-bold">1000</div>
                            </div>
                            <div className="d-flex" style={{ gap: '20px' }}>
                                <div>Total Stock (since genesis):</div>
                                <div className="fw-bold"></div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="d-flex" style={{ gap: '20px' }}>
                                <div>Total products:</div>
                                <div className="fw-bold">1000</div>
                            </div>
                            <div className="d-flex" style={{ gap: '20px' }}>
                                <div>Total labeld products:</div>
                                <div className="fw-bold">1000</div>
                            </div>
                            <div className="d-flex" style={{ gap: '20px' }}>
                                <div>Total damages:</div>
                                <div className="fw-bold">1000</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5 px-3">
                    <div>
                        <div className="d-flex justify-content-between">

                            <div className="h4 fw-light">Products List</div>
                            <div>
                                filter:{' '}
                                <select>
                                    <option></option>
                                    <option></option>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <hr className="mt-0 p-3" />
                        <div>
                            <div>
                                <div className="row">
                                    {checkDatas()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}