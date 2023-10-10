const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const bodyParser = require('body-parser');
const corse = require('cors');
const multer = require('multer');
const imageModel = require('./models');
const { DeleteProduct, GetRecords, Auth, GetProd } = require('./funtions');
const { db } = require('./database');
const CreateTablesIfNotExits = require('./databaseTabels/CreateTables');

const corseOrigin = 'http://localhost:3000';


//connect
db.connect((err) => {
    if(err){
        throw err
    }
    console.log('mysql has connected')
    CreateTablesIfNotExits();
})




app.use(express.static(__dirname + '../..'));
app.use(corse({
    origin:[corseOrigin],
    methods: ['GET','POST'],
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
    }
})
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'proofof')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
    }
})

const fileUpload = multer({storage: storage2})
const imageUpload = multer({storage: storage})
app.use('/getimg', express.static('images'))

//this section of code recieves info regarding the products in question
//saves the image file on the sever storage
//information regarding the data in question and send it into the database
app.post('/upload-image', imageUpload.single('image'), (req, res) => {
    const nameofproduct = req.body.nameofproduct;
    const size = req.body.size;
    const image = req.file.filename; 
    console.log(req.body)
    let query = db.query('insert into productdetails(productName, productSize, productImagename) values(?,?,?)', [nameofproduct, size, image], (err, result) => {
        if(err){
            console.log(err)
        } else{
            res.send('posted')
            console.log(res.body)
        }
    })
})


//this route is strictly for user authentication and gererating a key
app.post('/user', async (req, res) => {

    //const containing the user input
    const username = req.body.username;
    const password = req.body.password;

    //this statement is created to make sure a 404 is sent back if the user info is blank....
    if(username == '' || password == ''){
     res.send(404)   
    } else {

        //this variable stores info from the client so as to use in the query
        let sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`

        //this is the query made to the database
        let query = db.query(sql, (err, results) => {

            //this stateent checks if the response return an empty object or not
            //if the obeject is empty, it sends back 404
            //if the object is not empty then it proceeds
            if(results != ''){
                //this block code of recieves user info, compares it with the database and generates a token
                
                //this section takes the specific info from the response and stores each in a constant
                const username = results[0].username;
                const password = results[0].password;
                const role = results[0].role;
                
                //this is an array created to store the info stored in the constant(response from database)
                const userCredentials = {username, password}

                //the token being created with a secret
                const token  = jwt.sign(userCredentials, 'twenty')

                //resonse for the client
                let response = {token, username, role}
                res.send(response)
                console.log(req.body)
                
                //this adds the token to the database if all goes well
                 let query = db.query('INSERT INTO tokken (tokken) values(?)', token)
            } else {
                res.send('user info is invalid')
            }
        })
    }
})




//this chunk of code is for the addStock page
//data is sent from the client and is parsed through this to be checked
app.post('/formData', fileUpload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    const date = req.body.date;
    const productID = req.body.productID;
    const Quantity = req.body.Quantity;
    const formID = req.body.formID;
    
    let sql = `SELECT productID FROM productdetails WHERE productID = '${productID}'`
    let query = db.query(sql, (err, resp) => {
        if(err){
            throw err
        }
if(resp != ''){
    let sql = 'INSERT INTO stockrecord (dateClient, productID, Quantity, FormID) values(?,?,?,?)'
    let query = db.query(sql, [date, productID, Quantity, formID])
    res.send('exits')
} else {
    res.send('the productID does not exist')
    console.log('the productID does not exist')
}
    })
    
})




//getting records from the database......all of them?
app.get('/getrecords', GetRecords)


app.get('/deleterecords', (req, res) => {
    let query = db.query('DELETE FROM tokken', (err, result) => {
        res.send('done')
    })
})

//this secton recieves the tokken and then compares it with the one in the database
app.post('/users/auth', Auth)


//delete tokken when a user logs out
app.post("/delete/tokken", (req, res) => {
    let tokken = req.body.tokken;
    let sql = `DELETE FROM tokken WHERE tokken = '${tokken}'`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        if(result.affectedRows > 0){
            res.send('success')
        } else {
            res.send('fail')
        }
    })
})


//sending data to the client........all the data from this specific table containing products
app.get('/getData', GetProd)



//this route gets data from the database by id requested by the client
app.get('/getSpecific/:id', (req, res) => {
let id = req.params.id
    let sql = `SELECT * FROM productdetails WHERE productID = ${id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        res.send(result)
    })
})


//this route is for deleting specifc products by id from client
app.get('/delete/:id', DeleteProduct)



//this is for the addition 

//this is port at 4000
app.listen('4000', () => {
    console.log('listening on port 4000')
})