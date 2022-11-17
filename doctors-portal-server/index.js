const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 1000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// variable
const user = process.env.DB_USER
const password=process.env.DB_PASS

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${user}:${password}@cluster0.nvx6pod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
    try {
        const appointmentOptionCollection = client.db('doctorsPortal').collection("appointmentOptions");
        const bookingsCollection= client.db('doctorsPortal').collection('bookings')
        
        app.get('/appointmentOptions', async (req, res) => {
            const query = {};
            const options = await appointmentOptionCollection.find(query).toArray();
            res.send(options)
        });

        //* bookings
        app.post('/bookings', async (req, res) => {
            const booking = req.body
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking);
            res.send(result)
        })
    }
    finally{}
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('doctors portal running');
})

app.listen(port,()=>{
    console.log('doctors portal running on',port)
})