const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const api = require("./Routes/api");
const auth = require("./Routes/auth");

dotenv.config();

const app = express();

app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
});



app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));


// Routes
app.use('/api/auth', auth);
app.use('/api', api);

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
