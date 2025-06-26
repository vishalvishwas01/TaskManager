const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const {MongoClient} = require('mongodb')

dotenv.config()

const url = process.env.MONGO_URI
const client = new MongoClient(url)
client.connect()

const dbName = process.env.DB_NAME
const app = express()
const port = 3002

app.use(bodyParser.json())
app.use(cors())

app.get('/',async(req, res)=>{
    const db = client.db(dbName)
    const collection = db.collection('TaskList')
    const findResult = await collection.find({}).toArray()
    res.json(findResult)
})

app.post('/', async(req, res)=>{
    const text = {...req.body, completed:false}
    const db = client.db(dbName)
    const collection = db.collection('TaskList')
    const findResult = await collection.insertOne(text)
    res.send({success:true, result: findResult })
})

app.patch('/toggle',async(req, res)=>{
    const {id, completed} = req.body
    const db = client.db(dbName)
    const collection = db.collection('TaskList')
    const findResult = await collection.updateOne({id},{$set:{completed}})
    res.json(findResult)
})

app.delete('/', async(req, res)=>{
    const text = req.body
    const db = client.db(dbName)
    const collection = db.collection('TaskList')
    const findResult = await collection.deleteOne(text)
    res.send({success:true, result: findResult })
})

app.delete('/Delete', async(req, res)=>{
    const text = req.body.id ? { id: req.body.id } : {};
    const db = client.db(dbName)
    const collection = db.collection('TaskList')
    const findResult = await collection.deleteMany(text)
    res.send({success:true, result: findResult })
})

app.put('/',async(req, res)=>{
    const {id, text} = req.body
    const db = client.db(dbName)
    const collection = db.collection('TaskList')
    const findResult = await collection.updateOne({id:id}, {$set:{text}})
    res.json(findResult)

})

app.listen(port, ()=>{
    console.log(`listening to http://localhost:${port}`)
})