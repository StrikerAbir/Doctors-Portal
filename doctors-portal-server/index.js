const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 1000;
const app = express();
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
// middleware
app.use(cors());
app.use(express.json());

// variable
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const secret = process.env.ACCESS_TOKEN;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${user}:${password}@cluster0.nvx6pod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send("unauthorized access");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      // console.log(err);
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    const appointmentOptionCollection = client
      .db("doctorsPortal")
      .collection("appointmentOptions");
    const bookingsCollection = client
      .db("doctorsPortal")
      .collection("bookings");
    const usersCollection = client.db("doctorsPortal").collection("users");
    const doctorsCollection = client.db("doctorsPortal").collection("doctors");
    const paymentsCollection = client.db("doctorsPortal").collection("payments");

    // make sure you use verifyAdmin after verifyJWT
    const verifyAdmin = async (req, res, next) => {
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "admin") {
        return res.status(403).send({ message: "forbidden access.." });
      }
      next();
    };

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
              price: 1,
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
              price: 1,
              slots: {
                $setDifference: ["$slots", "$booked"],
              },
            },
          },
        ])
        .toArray();
      res.send(options);
    });

    app.get("/appointmentSpecialty", async (req, res) => {
      const query = {};
      const result = await appointmentOptionCollection
        .find(query)
        .project({ name: 1 })
        .toArray();
      res.send(result);
    });

    //* bookings

    app.get("/bookings", verifyJWT, async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const decodedEmail = req.decoded.email;
      console.log(decodedEmail);
      if (email !== decodedEmail) {
        return res.status(403).send({ message: "forbidden access." });
      }
      const query = { email: email };
      const bookings = await bookingsCollection.find(query).toArray();

      res.send(bookings);
    });

    app.get("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const booking = await bookingsCollection.findOne(query);
      res.send(booking);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const query = {
        appointmentDate: booking.appointmentDate,
        email: booking.email,
        treatment: booking.treatment,
      };
      const alreadyBooked = await bookingsCollection.find(query).toArray();
      if (alreadyBooked.length) {
        const message = `You already have a booking on ${booking.appointmentDate}`;
        return res.send({ acknowledged: false, message });
      }

      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    //* users
    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send({ isAdmin: user?.role === "admin" });
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.put("/users/admin/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: { role: "admin" },
      };
      const result = await usersCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // * payment related
     app.post("/create-payment-intent", async (req, res) => {
       const booking = req.body;
       const price = booking.price;
       const amount = price * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount,
        payment_method_types: ["card"],
      });
       res.send({
         clientSecret: paymentIntent.client_secret,
       });
     });
    
    app.post('/payments', async (req, res) => {
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      const id= payment.bookingId
      const filter = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId
        }
      }
      const updtateResult=await bookingsCollection.updateOne(filter,updatedDoc)
      res.send(result)
    })

    //* JWT
    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      console.log(user);
      if (user) {
        const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
        return res.send({ accessToken: token });
      }
      return res.status(403).send({ accessToken: "" });
    });

    // * doctors
    app.get("/doctors", verifyJWT, verifyAdmin, async (req, res) => {
      const query = {};
      const doctors = await doctorsCollection.find(query).toArray();
      res.send(doctors);
    });
    app.post("/doctors", verifyJWT, verifyAdmin, async (req, res) => {
      const doctor = req.body;
      const result = await doctorsCollection.insertOne(doctor);
      res.send(result);
    });

    //* delete
    app.delete("/doctors/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await doctorsCollection.deleteOne(filter);
      res.send(result);
    });

    // temporary to update price field on appointment
    // app.get('/addPrice', async (req, res) => {
    //   const filter = {};
    //   const options = { upsert: true };
    //   const updatedDoc = {
    //     $set: { price: 99 },
    //   };
    //   const result = await appointmentOptionCollection.updateMany(filter, updatedDoc, options)
    //   res.send(result);
    // })
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
