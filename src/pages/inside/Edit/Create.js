import { useRef, useState } from "react"
import { BsFillCloudArrowUpFill } from 'react-icons/bs'
import {MdProductionQuantityLimits} from 'react-icons/md'
import axios from "axios";

export const Create = () => {
    const [productName, setProductName] = useState('')
    const [size, setSize] = useState('')


    //some testing code for the formadata


    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        axios.post('http://localhost:4000/upload-image', formData);
    }
    const [qlable, setQlable] = useState('')
    const [selectimage, setSelectImage] = useState(null)
    const [imageName, setImageName] = useState('so selected file')
   


    return (
        <>
            <div>

                <form onSubmit={onSubmit}>
                    <div className="py-5">
                        <div>
                            <div>
                                <span className="text-uppercase fw-bold me-2">add image:<span className="text-danger">*</span></span>
                                <div
                                    onClick={() => document.querySelector('.input-field').click()} className="text-center p-3 d-flex flex-column justify-content-center border-dark"
                                    style={{ height: '400px', width: '100%', border: '2px dashed', overflow:'hidden' }}
                                    onChange={({ target: { files } }) => {
                                        files[0] && setImageName(files[0].name)
                                        setImageName(files)
                                        if (files) {
                                            setSelectImage(URL.createObjectURL(files[0]))
                                        }
                                    }}
                                >
                                    <div style={{ width: '100%' }} className="d-flex p-3 justify-content-center">
                                        {selectimage ?
                                            <img src={selectimage} style={{ maxHeight: "100%", maxWidth: '100%' }} />
                                            :
                                            <BsFillCloudArrowUpFill size={100} />
                                        }
                                    </div>

                                    <input type="file" className="input-field" name="image" hidden />
                                </div>

                            </div>
                            <div>
                                <span className="text-uppercase fw-bold me-2">Details<span className="text-danger">*</span></span>
                                <hr className="mb-0" />
                                {/* <div className="p-2">
                                    <div>
                                        <div>
                                            <span className="text-uppercase fw-bold me-2">product name:<span className="text-danger">*</span></span>
                                            <input type="text" name="nameofproduct" onChange={e => setProductName(e.target.value)} className="p-2" placeholder="enter name here" />
                                        </div>
                                        <div>
                                            <span className="text-uppercase fw-bold me-2">Select size:<span className="text-danger">*</span></span>
                                            <div className="">
                                                <select name="type" style={{ height: '30px', outline: 'none' }} onChange={(e) => setQlable(e.target.value)} className="px-3 my-2 me-2 p-1">
                                                    <option></option>
                                                    <option value='liquids'>liquids</option>
                                                    <option value='grams'>grams</option>
                                                </select>
                                                <div className="border p-2 w-100">
                                                    <Showsize />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col p-2">
                                    <div>
                                            <div>
                                                please make sure the info entererd in this field is correct and confirmed.
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="basic-addon2"><MdProductionQuantityLimits size={25}/></span>
                                                </div>
                                            <input type="text" class="form-control" placeholder="Product's Name" name="nameofproduct"  onChange={e => setProductName(e.target.value)} aria-label="Product's Name" aria-describedby="basic-addon2"/>
                                        </div>
                                    </div>
                                    <div className="col p-2">
                                        <div>
                                            <div>
                                                please make sure the info entererd in this field is correct and confirmed.
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="number"  name='size' onChange={e => setSize(e.target.value)} class="form-control" placeholder="Enter measurement value" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                <div class="input-group-append">
                                                   <div>
                                                    <select name="type" onChange={(e) => setQlable(e.target.value)} style={{outline:'none'}} className="input-group-text">
                                                        <option>litters</option>
                                                        <option>grams</option>
                                                    </select>
                                                   </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border text-center p-2 border-danger mt-3">
                                <div className="text-danger text-uppercase">
                                    make sure you ckeck info before submition!
                                </div>
                            </div>
                            <div className="text-center py-3">
                                <button type="submit" className="btn rounded-0 btn-outline-secondary px-4 py-2 text-uppercase fw-bold">create</button>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}