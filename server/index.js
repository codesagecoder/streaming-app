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


mongoose.connect(process.env.MONGO_URL).then((res) => {
    console.log(`DATABASE: connected to "${res.connection.host}:${res.connection.port}/${res.connection.name}"`);
}).catch(console.log);

app.use("/api/auth", authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

/* PRODUCTION */
const adminDir = path.join(__dirname, "apps/admin/");
app.use('/admin', express.static(adminDir), (_, res) => res.sendFile(adminDir + 'index.html'));

const clientDir = path.join(__dirname, "apps/client/");
app.use('/client', express.static(clientDir), (_, res) => res.sendFile(clientDir + 'index.html'));

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log(`SERVER: running on port ${port}`));