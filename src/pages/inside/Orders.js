import axios from "axios";
import { useEffect, useState } from "react";
import { HashLoader } from 'react-spinners'
import image from '../../images/wepik-export-20231015023917BSYq.png'

const Orders = () => {
    const [value, setValue] = useState('Pending')
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [alert, setAlert] = useState(false)
    const [filter, setFilter] = useState('all')
    const [popupid, setPopupid] = useState();
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

    const changefiltertype = (e) => {
        setFilter(e)
    }




    //set popup id onclick
    const viewpopup = (values) => {
        setAlert(true)
        setPopupid(values)
    }

    //function to change the status of the order
    const changeStatus = (a) => {
        let values = 'delivered';
        let id = a;
        setLoading2(true)
        axios.post('http://localhost:4000/UpateStatus', { id, values }).then((response) => {
            getOrders()
        }).finally(() => {
            setLoading2(false)
            setAlert(false)
        })
    }




    const ShowDataFromOrders = () => {
        return (
            <>
                {
                    data.filter((v) =>
                        filter == 'all' ?
                            v.status == 'intransit' || v.status == 'delivered'
                            :
                            v.status == filter).length <= 0 ?

                        <>
                        <tr>
                            <td colSpan={6}>
                                <div className="d-flex justify-content-center text-center" style={{alignItems:'center'}}>
                                    <div>
                                        <img src={image} alt="image" width='300px'/>
                                        <h3 className="text-uppercase">there is no data here!!</h3>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </>

                        :

                        data.filter((v) =>
                            filter == 'all' ?
                                v.status == 'intransit' || v.status == 'delivered'
                                :
                                v.status == filter).map((m) => {
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
                                                        <button onClick={() => viewpopup(m.orderid)} className="btn btn-success rounded-0">approve</button>
                                                        :
                                                        <button disabled className="btn btn-success rounded-0">approve</button>
                                                    }
                                                    <button className="btn rounded-0">view </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
            </>
        )
    }
    return (
        <>
            <div>
                {
                    alert ?
                        <div className="d-flex justify-content-center" style={{ position: 'fixed', top: 0, alignItems: 'center', bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                            <div className="bg-light rounded-4 text-center d-flex flex-column justify-content-between p-4" style={{ height: '300px', width: '300px' }}>
                                <div>
                                    <label>Are you sure about aproving before viewing the full info</label>

                                    <div className="d-flex justify-content-center   " style={{ height: '20vh', alignItems: 'center' }}>
                                        {
                                            loading2 ?
                                                <HashLoader />
                                                :
                                                <></>
                                        }
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button onClick={() => changeStatus(popupid)} className="btn rounded-0 btn-danger d-flex">confirm </button>
                                    <button onClick={() => setAlert(false)} className="btn rounded-0">cancel</button>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                }
                <div className="p-3">
                    <h3>Orders</h3>
                    <div className="d-flex justify-content-end">
                        <div className="p-3">
                            <label>filter: </label>
                            <select onChange={(e) => changefiltertype(e.target.value)}>
                                <option value='all'>all</option>
                                <option value='intransit'>pending</option>
                                <option value='delivered'>approved</option>
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
                                            <ShowDataFromOrders />
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