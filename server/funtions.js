const { db } = require("./database");


const AddOrder = (req, res) => {
    console.log(req.body)
}



const DeleteProduct = (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM productdetails WHERE productID = ${id}`
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
        console.log('deleted!')
    })
}


const GetRecords = (req, res) => {
    let sql = 'SELECT * FROM stockrecord'
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result)
    })
}


const Auth = (req, res) => {


    let tokken = req.body.value
    let sql = `SELECT * FROM tokken WHERE tokken = '${tokken}'`
    let query = db.query(sql, (err, response) => {
        if (response != '') {
            let tokkens = response[0].tokken
            if (err) {
                throw err
            }
            if (tokkens == tokken) {
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
    let sql = 'SELECT * FROM productdetails';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results)
    })
}


const addOrder2 = (req, res) => {

    let orderDate = req.body.date
    let client = req.body.ClientName
    let approvedID = 'none'
    let quantity = req.body.Quantity
    let orderformID = req.body.orderformID
    let productId = req.body.productID
    let creatorID = req.body.userID
    let status = 'intransit'

    let values = [orderDate, client, approvedID, quantity, orderformID, productId, creatorID, status]
    if(orderDate && client && approvedID && quantity && orderformID && productId && creatorID && status){
        let sql = 'INSERT INTO orders (orderDate, client, approvedID, quantity, orderformID, productId, creatorID, status) values (?,?,?,?,?,?,?,?)'
        let query = db.query(sql, values, (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.send('done')
                console.log('done')
            }
        })
    }
}


const GetOrders = (req, res) => {

    let sql = 'SELECT * FROM orders'
        let query = db.query(sql, (err, results) => {
            if(err){
                console.log(err)
            } else {
                res.send(results)
                console.log('done')
            }
        })
}

const AulterData = (req, res) => {
    let id = req.body.id
    let value1 = req.body.values
    let sql = `UPDATE orders SET status = '${value1}' WHERE orderid = ${id}`
    let query = db.query(sql, (err, results) => {
        if(err){
            console.log(err)
        } else {
            res.send(results)
            console.log('info changed')
        }
    })
}

module.exports = { AddOrder, DeleteProduct, GetRecords, Auth, GetProd, addOrder2, GetOrders, AulterData };