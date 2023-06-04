const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/photo', express.static(__dirname + '/images'))
app.listen('5000', ()=>{
    console.log('listening on 5000')
})


app.post('/send', (req, res) => {
    res.send('reciexx')
})