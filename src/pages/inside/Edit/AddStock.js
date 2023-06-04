import { useEffect, useState } from "react"
import axios from "axios";
import { BsArrowRight } from 'react-icons/bs'
import { MdOutlineNumbers } from 'react-icons/md'
import { BiUserPin } from 'react-icons/bi'
import { renderHook } from "@testing-library/react";

export const AddStock = () => {
    const [data, setData] = useState()
    const [error, setError] = useState('none')
    const [success, setSuccess] = useState('')


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



    const SendData = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const response = await axios.post('http://localhost:4000/formData', formData);
        if (response.data == 'exits') {
            setError(response.data)
            setingData()
        } else if (response) {
            setError(response.data)
        }
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
        if (error == 'exits') {
           return ( <div className="py-2">
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
                                <td>{e.recordID}</td>
                                <td>{e.Quantity}</td>
                                <td>{e.dateClient}</td>
                                <td>{e.productID}</td>
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
                <form onSubmit={SendData}>
                    {renderError()}
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
                                                    <span class="input-group-text rounded-0" id="basic-addon1">Form ID</span>
                                                </div>
                                                <input required type="text" name='formID' class="form-control" placeholder="DDX105" aria-label="Amount" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                        <div className="col-6 text-center">
                                            <div class="input-group date">
                                                <div class="input-group-prepend">
                                                </div>
                                                <input type="file" name='file' class="form-control bg-secondary text-white fw-bold" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row p-3">
                                        <div className="col-6 text-center">
                                            <div className="text-uppercase">
                                                enter reference id
                                            </div>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text  rounded-0" id="basic-addon1"><BiUserPin className='fs-4' /></span>
                                                </div>
                                                <input required type="employeeID" class="form-control" placeholder="Employee ID" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <hr />
                            <div className="text-center">
                                <div>
                                    click here to add record
                                </div>
                                <button type='submit' className="btn btn-outline-info rounded-0 px-4">add</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    <div>
                        <hr className="text-white" />
                        <div className="bg-light" style={{ height: '100vh' }}>
                            <table className="table">
                                <thead>
                                    <tr className="text-uppercase">
                                        <th scope="col">reacord id</th>
                                        <th>QTY</th>
                                        <th>date</th>
                                        <th>product id</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checkdata()}
                                </tbody>
                            </table>
                            <div className="text-center mt-5">
                                <button className="btn text-uppercase py-3 btn-outline-secondary px-4 rounded-0">see more <BsArrowRight /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
