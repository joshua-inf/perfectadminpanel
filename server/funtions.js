const { db } = require("./postgresdb/databsepg.js");


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
        res.send(result.rows)
        console.log('deleted!')
    })
}


const GetRecords = (req, res) => {
    let sql = 'SELECT * FROM stockrecord'
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows)
    })
}


const Auth = (req, res) => {
    let tokken = req.body.value
    let sql = `SELECT * FROM tokken WHERE tokken = '${tokken}'`
    db.query(sql, (err, response) => {
        if (response.rows != '') {
            let tokkens = response.rows[0].tokken
            if (err) {
                throw err
            }
            if (tokkens == tokken) {
                res.send('value exists')
            }
        } else {
            res.send('failed')
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
        res.send(results.rows)
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

    if(orderDate && client && approvedID && quantity && orderformID && productId && creatorID && status){
        let query = db.query(`INSERT INTO orders (orderDate, client, approvedID, quantity, orderformID, productId, creatorID, status) values ('${orderDate}', '${client}', '${approvedID}', '${quantity}', '${orderformID}', '${productId}', '${creatorID}', '${status}')`, (err, result) => {
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
                res.send(results.rows)
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
            res.send(results.rowa)
            console.log('info changed')
        }
    })
}


const GetSpecificOrder = () => {
    
}
module.exports = { AddOrder, DeleteProduct, GetRecords, Auth, GetProd, addOrder2, GetOrders, AulterData };