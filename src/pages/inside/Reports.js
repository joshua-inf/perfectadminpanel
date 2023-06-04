export const Reports = () => {
    return (
        <>
            <div className="">
                <div>
                    <div className="mt-3 py-2">
                        <div>
                            <div className="fw-bold">Please specify the category to filter out the data</div>
                        </div>
                        <div>
                            <select className="p-1" style={{width:'200px'}}>
                                <option>selection</option>
                                <option>selection</option>
                                <option>selection</option>
                            </select>
                        </div>
                    </div>
                    <div className="py-4">
                        <div>
                            <div className="fw-bold">Please select period</div>
                        </div>
                        <div className="d-flex">
                            <div className=" py-4 px-3 d-flex" style={{gap:'30px'}}>
                                <div>
                                    <div>Start date</div>
                                    <input type="date"/>
                                </div>
                                <div>
                                    <div>End date</div>
                                    <input type="date"/>
                                </div>
                            </div>
                        </div>
                            <div><button className="btn w-100 text-uppercase fw-bold  btn-outline-info rounded-0">show results</button></div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="d-flex justify-content-between">
                            <div className="text-uppercase d-flex flex-column justify-content-center">
                                Results
                            </div>
                            <div>
                                <button className="btn btn-secondary text-uppercase">print results</button>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <div className="bg-secondary" style={{height:'100vh'}}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}