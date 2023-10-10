const { db } = require("./database");


const AddOrder = (req, res) => {
    console.log(req.body)
}



const DeleteProduct = (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM productdetails WHERE productID = ${id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        res.send(result)
        console.log('deleted!')
    })
}


const GetRecords = (req, res) => {
    let sql = 'SELECT * FROM stockrecord'
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.send(result)
    })
}


const Auth = (req, res) => {
    
    
    let tokken = req.body.value
    let sql = `SELECT * FROM tokken WHERE tokken = '${tokken}'`
    let query = db.query(sql, (err, response) => {
        if(response != ''){
            let tokkens = response[0].tokken
            if(err){
                throw err
            }
            if(tokkens == tokken){
                res.send('true')
            }
         } else {
            console.log('nothomh')
            res.send('ok')
         }

    })
// } else {
//     console.log('false')
//     res.send('error')
// }

}


const GetProd = (req, res) => {
    let sql  = 'SELECT * FROM productdetails';
    let query = db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        res.send(results)
    })
}

module.exports = {AddOrder, DeleteProduct, GetRecords, Auth, GetProd};