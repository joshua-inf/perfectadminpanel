import axios from "axios";
import { useEffect, useState } from "react";
import { HashLoader } from 'react-spinners'

const Orders = () => {
    const [value, setValue] = useState('Pending')
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    //request function   
    const getOrders = () => {
        //set loading to true
        setLoading(true)
        //send requestS
        axios.get('http://localhost:4000/getOrders')
            //handle response
            .then((response) => {
                setData(response.data);
            })
            //log data and set loading to false
            .finally(() => {
                console.log(data)
                setLoading(false)
            })
    }
    //run function on load screen
    useEffect(() => {
        getOrders();
    }, [])

    const runfunction = (value) => {
        setValue(value)
    }


    return (
        <>
            <div>
                <div className="p-3">
                <h3>Orders</h3>
                    <div className="d-flex justify-content-end">
                        <div className="p-3">
                            <label>filter: </label>
                            <select onChange={(e) => getOrders()}>
                                <option ></option>
                                <option value='Pending'>pending</option>
                                <option value='approved'>approved</option>
                                <option value='denied'>denied</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="ordertable">
                            <table>
                                <tbody>

                                    {loading ?
                                        <div className="d-flex justify-content-center   " style={{ height: '20vh', alignItems: 'center' }}>
                                            <HashLoader />
                                        </div>
                                        :
                                        <><tr>
                                            <th>Date</th>
                                            <th>Client</th>
                                            <th>ProductID</th>
                                            <th>Quantity</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                            {data.map((m) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                {m.orderDate}
                                                            </td>
                                                            <td>{m.client}</td>
                                                            <td>{m.productId}</td>
                                                            <td>{m.quantity}</td>
                                                            <td>{m.status}</td>
                                                            <td>
                                                            {m.status == 'intransit' ?
                                                            <button disabled className="btn btn-success rounded-0">approve</button>
                                                            :
                                                            <button className="btn btn-success rounded-0">approve</button>
                                                            }
                                                                <button className="btn rounded-0">view</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Orders;