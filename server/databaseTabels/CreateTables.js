const { db } = require("../database")

const CreateTablesIfNotExits = () => {
    
    db.query('CREATE TABLE IF NOT EXISTS productdetails (productName varchar(255), productSize varchar(255), productImagename varchar(255), productID int AUTO_INCREMENT PRIMARY KEY)', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('products TABLE CEATED')
        }
    })
    db.query('CREATE TABLE IF NOT EXISTS tokken (tokken varchar(255), tokkenid int AUTO_INCREMENT PRIMARY KEY)', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('tokken TABLE CEATED')
        }
    })
    
    db.query('CREATE TABLE IF NOT EXISTS users (username varchar(255), password varchar(255), userid int AUTO_INCREMENT PRIMARY KEY)', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('users TABLE CEATED')
        }
    })
    
    db.query('CREATE TABLE IF NOT EXISTS stockrecord (dateClient varchar(255), productID varchar(255), Quantity varchar(255), FormID varchar(255))', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('users TABLE CEATED')
        }
    })

    db.query('CREATE TABLE IF NOT EXISTS orders (orderDate varchar(255),client varchar(255), approvedID varchar(255), quantity varchar(255), orderformID varchar(255), orderid int AUTO_INCREMENT PRIMARY KEY, productId varchar(255), approvedDate varchar(255), creatorID varchar(255), status varchar(255) )', [], (err, result) => {
        if(err){
            console.log(err)
        } else{
            console.log('order table created TABLE CEATED')
        }
    })
}


module.exports = CreateTablesIfNotExits;