import axios from "axios";


const Test = () => {
 const sendRequest = async () => {
    const response = await axios.post('http://localhost:4000/users')
    console.log(response.data)
 }

   

    return (
        <>
            <div>
                <button onClick={sendRequest}>send request</button>
            </div>
        </>
    )
}


export default Test