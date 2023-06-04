import { useParams } from "react-router-dom"
import { Product } from "../../products"
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvider";
import Checkcount from "./stockFunctions/somefunction";
export const ProDet = () => {
    const role = localStorage.getItem('role')
    const [datas, setData] = useState('')
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/getSpecific/${id}`).then((e) => e.json().then(
            (j) => setData(j)
        ))
    }, [])

    const deleteItem = (e) =>{

        const response = fetch(`http://localhost:4000/delete/${e}`)

        if(response){
            setData('')
        }

    } 

    const checkDatas = () => {
        if (datas == '') {
            return (
                <>
                    <div>
                        <div className="border rounded-3 p-3 text-center bg-danger">
                            <div className="text-white fw-bold text-uppercase">
                                the product you're looking for is either deleted or does not exist
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if(datas) {
            return(
                <>
                 {datas.map((e) => (
                        <>
                            <div className="row">
                                <div className="col-4">
                                    <div>
                                        <div className="" style={{ height: '400px' }}>
                                            <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={`http://localhost:4000/getimg/` + e.productImagename} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="px-4">
                                        <div>
                                            <div className="d-flex justify-content-between">
                                            <div className="fw-bold text-uppercase display-3">
                                                {e.productName}
                                            </div>
                                            <div className="d-flex justify-content-end flex-column">

                                            {role === 'clerk' ?
                                                <button onClick={() => deleteItem(id)} className="btn btn-danger text-uppercase">delete</button> :
                                                <></>
                                            }
                                            </div>
                                            </div>
                                            <hr />
                                            <div>
                                                <h5>Details:</h5>
                                                <div className="mb-3">
                                                    description here
                                                </div>
                                                <div className="d-flex my-2">
                                                    <h5>QTY(instock):</h5>
                                                    <Checkcount name={id}/>
                                                </div>
                                                <div className="d-flex my-2">
                                                    <h5>Size:</h5>
                                                    {e.productSize}
                                                </div>
                                                <div className="d-flex my-2">
                                                    <h5>Last update:</h5>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                   
                </>

            )
        }
    }



    const value = Product.filter(values => values.productId === parseInt(id))
    return (
        <>
            <div className="pt-5">
                <div>
                    <div>
                        {checkDatas()}
                    </div>
                </div>
            </div>
        </>
    )
}