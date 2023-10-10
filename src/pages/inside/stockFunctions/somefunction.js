import { useState } from "react"

const Checkcount = props => {
    const total = props.name
    const [value, setValue] = useState('')

    const getStockCount = async () => {
        const resultes = await fetch('http://localhost:4000/getrecords')
        const resultesjson = await resultes.json()
        const thatValue = resultesjson.filter((item) => item.productID == total)
        let thatTotal = 0
        const addThoseValuesById = thatValue.forEach(item => thatTotal = thatTotal + Number(item.Quantity))
        setValue(thatTotal)

    }
    getStockCount()

    return value
}




export const TotalStock = () => {
    const [value, setValue] = useState(0);

    
    const getStockCount = async () => {
    const resultes = await fetch('http://localhost:4000/getrecords')
    
    const resultesjson = await resultes.json()
    let thatTotal = 0
    const addThoseValuesById = resultesjson.forEach(item => thatTotal = thatTotal + Number(item.Quantity))
    setValue(thatTotal)
}

getStockCount()

    return value
}


export default Checkcount