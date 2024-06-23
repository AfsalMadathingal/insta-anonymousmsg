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


app.use(cors({
    origin: ['http://localhost:5173',"https://insta-anonymousmsg-1.onrender.com",'https://urchin-app-5u7kr.ondigitalocean.app',"https://anonymousmsg.netlify.app"], 
    credentials: true, 
}));



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
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
  


// Routes
app.use('/api/auth', auth);
app.use('/api', api);

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port - 3000");
});
