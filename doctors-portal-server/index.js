const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 1000;
const app = express();
const jwt = require('jsonwebtoken');

// middleware
app.use(cors());
app.use(express.json());

// variable
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const secret = process.env.ACCESS_TOKEN;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${user}:${password}@cluster0.nvx6pod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).send('unauthorized access')
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return res.status(403).send({message:'forbidden access'})
    }
    req.decoded = decoded;
    next();
  })
}

async function run() {
  try {
    const appointmentOptionCollection = client
      .db("doctorsPortal")
      .collection("appointmentOptions");
    const bookingsCollection = client
      .db("doctorsPortal")
      .collection("bookings");
    const usersCollection = client
      .db("doctorsPortal")
      .collection("users");

    // Use aggregate to query multiple collection and then merge data
    app.get("/appointmentOptions", async (req, res) => {
      const date = req.query.date;
      console.log(date);
      const query = {};
      // all appointment get
      const options = await appointmentOptionCollection.find(query).toArray();
      // all appointment for a single date.
      const bookingQuery = { appointmentDate: date };
      const alreadyBooked = await bookingsCollection
        .find(bookingQuery)
        .toArray();
      // all appointment k loop korsi
      options.forEach((option) => {
        //all appointment for a single date theke filter kore nicchi akta single appointment option k.
        const optionBooked = alreadyBooked.filter(
          (book) => book.treatment === option.name
        );
        // single appointment theke kon kon time slot select kora ase seta ber korlam
        const bookedSlots = optionBooked.map((book) => book.slot);
        // booked slot base baki slot gulo ber korbo.
        const remainingSlots = option.slots.filter(
            (slot) => !bookedSlots.includes(slot)
            );
            // set remaining slots
          option.slots = remainingSlots;
        //   console.log(option.name, remainingSlots.length);
      });
      res.send(options);
    });

    // version
      app.get("/v2/appointmentOptions", async (req, res) => {
        const date = req.query.date;
        const options = await appointmentOptionCollection
          .aggregate([
            {
              $lookup: {
                from: "bookings",
                localField: "name",
                foreignField: "treatment",
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$appointmentDate", date],
                      },
                    },
                  },
                ],
                as: "booked",
              },
            },
            {
              $project: {
                name: 1,
                slots: 1,
                booked: {
                  $map: {
                    input: "$booked",
                    as: "book",
                    in: "$$book.slot",
                  },
                },
              },
            },
            {
              $project: {
                name: 1,
                slots: {
                  $setDifference: ["$slots", "$booked"],
                },
              },
            },
          ])
          .toArray();
        res.send(options);
      });

      
    //* bookings

    app.get('/bookings',verifyJWT, async (req, res) => {
      const email = req.query.email;
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({message:'forbidden access.'})
      }
      const query = { email: email };
      const bookings = await bookingsCollection.find(query).toArray();
      
      res.send(bookings);
    })

    app.post("/bookings", async (req, res) => {
        const booking = req.body;
        console.log(booking);
        const query = {
          appointmentDate: booking.appointmentDate,
          email: booking.email,
            treatment: booking.treatment
        };
        const alreadyBooked = await bookingsCollection.find(query).toArray();
        if (alreadyBooked.length) {
            const message = `You already have a booking on ${booking.appointmentDate}`;
            return res.send({acknowledged: false, message})
        }
        
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    //* users
    app.get('/users', async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users)
    })
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user); 
      res.send(result);
    })

    //* JWT
    app.get('/jwt', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      console.log(user);
      if (user) {
        const token=jwt.sign({email},secret,{expiresIn:'1h'})
        return res.send({accessToken:token});
      }
      return res.status(403).send({ accessToken:''});
    })
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("doctors portal running");
});

app.listen(port, () => {
  console.log("doctors portal running on", port);
});
