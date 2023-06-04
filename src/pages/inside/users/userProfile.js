import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

const MyProfile = () => {
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')
    return (
        <>
            <div className="p-3">
                <div style={{position:'relative'}}>
                    <div className="bg-dark" style={{height:'200px', width:'100%'}}>
                    </div>
                    <div style={{position:'absolute',top:'100px', left:'20px'}}>
                        <div className="bg-secondary" style={{height:'200px',borderRadius:'100%', width:'200px'}}>
                        </div>
                    </div>
                    <div style={{marginLeft:'250px'}}>
                        <div>
                            <div className="text-uppercase fw-bold fs-3">{username}</div>
                            <div className="text-uppercase fs-4">{role}</div>
                        </div>
                        <div>
                            <div className="d-flex" style={{gap:'60px'}}>
                                <div>email: someemail@gmail.com</div>
                                <div>contact: 09999999999</div>
                                <div>employee id: 10001001</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-light w-100" style={{height:'300px', marginTop:'100px'}}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile