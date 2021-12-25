require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const path = require("path");

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/stream-app',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => { console.log('connected to mongodb'); })
    .catch((e) => { console.log("Something went wrong", e) })

app.use("/api/auth", authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

app.listen(process.env.PORT || 8080, () => {
    console.log('server is Up!!')
})