const express = require('express');
const app  = express();
const client  = require('./postgresdb/databsepg.js')




app.listen('3000', () => {
    console.log('listeing on port something')
})


const runfunc = async () => {
   let first = await client.query(`CREATE TABLE IF NOT EXISTS public.users
    (
        id SERIAL PRIMARY KEY,
        firstname text COLLATE pg_catalog."default",
        lastname text COLLATE pg_catalog."default"
    )`, (err, result) => {
        console.log(result);
        if(result){
            client.query(`INSERT INTO users (firstname, lastname, id) values ('joshua', 'sibanda', 1)`, (err, result) => {
                console.log(result);
                if(err){
                    console.log(err)
                }
        })
        }
        if(err){
            console.log(err)
        }
    })

    // let second = await client.query(`INSERT INTO users (firstname, lastname, id) values ('joshua', 'sibanda', 1)`, (err, result) => {
    //         console.log(result);
    //         if(err){
    //             console.log(err)
    //         }
    // })
    
}



client.connect()
runfunc()