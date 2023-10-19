import { useEffect, useState } from "react"
import axios from "axios";
import { BsArrowRight } from 'react-icons/bs'
import { MdOutlineNumbers } from 'react-icons/md'
import { BiUserPin } from 'react-icons/bi'
import { renderHook } from "@testing-library/react";
import { HashLoader } from "react-spinners";


const CreateOrder = () => {
    const [data, setData] = useState()
    const [error, setError] = useState('none')
    const [success, setSuccess] = useState('')
    const [fullscreenLoader, setFullscreenLoader] = useState(false)


    async function setingData() {
        const resultes = await fetch('http://localhost:4000/getrecords')
        const resultesjson = await resultes.json()
        const datasort = await resultesjson.reverse();
        const datafilter = await datasort.slice(0, 3)
        setData(datafilter)
    }
    useEffect(() => {
        setingData()
    }, [])



    const SendData = (e) => {
        setFullscreenLoader(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        axios.post('http://localhost:4000/addOrder', formData).then((response) => {
            if (response.data == 'exits') {
                setError(response.data)
                setingData()
            } else if (response) {
                setError(response.data)
            } else {
                setError('eh')
            }
        }).finally(() => setFullscreenLoader(false))

    }

    const renderError = () => {
        if (error == 'the productID does not exist') {
            return (
                <div className="py-2">
                    <div className="bg-danger p-2 text-uppercase fw-bold text-center text-white">
                        this record could not be submited (please check inputs)
                    </div>
                </div>
            )
        }
        if (error == 'done') {
            return (<div className="py-2">
                <div className="bg-success p-2 text-uppercase fw-bold text-center text-white">
                    record added successfully
                </div>
            </div>)
        } 
    }
    const checkdata = () => {
        if (data) {
            return (
                <>
                    {data.map((e) => (
                        <>
                            <tr>
                                <td>{e.recordid}</td>
                                <td>{e.quantity}</td>
                                <td>{e.dateclient}</td>
                                <td>{e.productid}</td>
                                <td>
                                    <button className="btn btn-info">view</button>
                                </td>
                            </tr>
                        </>
                    ))
                    }
                </>
            )
        }
        else {
            return <>nothing here</>
        }

    }

    return (
        <>
            <div>
            {fullscreenLoader ? 
            <div style={{position:'fixed', top:0, bottom:0, left:0, right: 0, backgroundColor:'rgba(0,0,0,0.5)', zIndex:3}}>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
                    <HashLoader color="#36d7b7" />
                </div>
            </div>
            :
            <></>
            }
                <form onSubmit={SendData}>
                    {renderError()}
                    <input required type="text" name='userID' value={1} class="form-control d-none" placeholder="DDX105" aria-label="Amount" aria-describedby="basic-addon1" />
                    <div className="py-5 text-white fw-bold shadow bg-secondary" >
                        <div className="row">
                            <div className="col-8">
                                <div className="p-3 row">
                                    <div className="col-6">
                                        <div class="input-group date">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text rounded-0" id="basic-addon1">Select Date</span>
                                            </div>
                                            <input required name="date" type="date" class="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text rounded-0" id="basic-addon1">Client Name or ID</span>
                                            </div>
                                            <input required type="text" name='ClientName' class="form-control" placeholder="add name or id here" aria-label="Amount" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="row p-3">
                                        <div className=" col-6 text-center">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text rounded-0" id="basic-addon1">Product ID</span>
                                                </div>
                                                <input required name="productID" type="number" class="form-control" placeholder="enter id here" aria-label="Amount" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                        <div className="col-6 text-center">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text rounded-0" id="basic-addon1">Quantity</span>
                                                </div>
                                                <input required type="number" name="Quantity" class="form-control" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon1" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row p-3">
                                        <div className=" col-6 text-center">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text rounded-0" id="basic-addon1">Order Form ID</span>
                                                </div>
                                                <input required type="text" name='orderformID' class="form-control" placeholder="DDX105" aria-label="Amount" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row p-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <hr />
                            <div className="text-center">
                                <div>
                                    click here to create an order
                                </div>
                                <button type='submit' className="btn btn-outline-info rounded-0 px-4">Create Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export default CreateOrder;