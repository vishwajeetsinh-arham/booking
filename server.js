const express = require('express')
const app = express()
const  mongoose = require('mongoose')
const port = 3000
const Slot = require('./models/slot')

app.use(express.urlencoded({extended: true}))
app.set('view engine' , 'ejs')


// mongo db 

// const uri = "mongodb+srv://vishwajeet:vishwajeet@quizzapp.8cryywh.mongodb.net/test"
const uri = "mongodb://0.0.0.0/slot"
async function connect(){
    try{
        await mongoose.connect(uri)
        console.log('connected to online MDB')
    }catch(error){
        console.log(error)
    }
}
connect()

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open',() =>{
    console.log('dababase connected :)')
})

app.get('/', async(req,res) => {
    const slot = await Slot.find({})
    let sevenday = Date.now() + 1000 * 60 * 60 * 24 * 7
    let filterSlot = []
    for(let s of slot){
        if (s.timestamp < sevenday){
            filterSlot.push(s)
        }
    }
    console.log('filterslot', filterSlot)
    // console.log(slot)
    res.render('index', {slot:filterSlot})

})

app.post('/createslot', async(req,res) => {
    const strdate = req.body.slot
    const date = new Date(strdate)
    const timeStamp = date.getTime()
    
    const time = await new Slot({slot: req.body.slot, timestamp: timeStamp})
    time.save()
    res.send(time)
    
})


app.listen(port,() => {
    console.log(`your app is running on http://localhost:${port}`)
})