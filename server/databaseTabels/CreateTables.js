const { db } = require("../postgresdb/databsepg.js");

const CreateTablesIfNotExits = () => {
    
    db.query('CREATE TABLE IF NOT EXISTS productdetails (productName TEXT, productSize TEXT, productImagename TEXT, productID SERIAL PRIMARY KEY)', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('products TABLE CEATED')
        }
    })
    db.query('CREATE TABLE IF NOT EXISTS tokken (tokken TEXT, tokkenid  SERIAL PRIMARY KEY)', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('tokken TABLE CEATED')
        }
    })
    
    db.query('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT,role TEXT, userid  SERIAL PRIMARY KEY)', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('users TABLE CEATED')
            // db.query(`INSERT INTO users(username, password, role ) VALUES('jsibanda707@gmail.com','123456789', 'clerk')`, [], (err, result) => {
            //     if(err){
            //         console.log(err)
            //     } else{
            //         console.log('users added') 
                    
            //     }
            // })
        }
    })
    
    db.query('CREATE TABLE IF NOT EXISTS stockrecord (dateClient TEXT, productID TEXT, Quantity TEXT, FormID TEXT)', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('users TABLE CEATED')
        }
    })

    db.query('CREATE TABLE IF NOT EXISTS orders (orderDate TEXT,client TEXT, approvedID TEXT, quantity TEXT, orderformID TEXT, orderid  SERIAL PRIMARY KEY, productId TEXT, approvedDate TEXT, creatorID TEXT, status TEXT )', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('order table created TABLE CEATED')
        }
    })
    
}


module.exports = CreateTablesIfNotExits;