const express=require("express");
const app= express();
const path = require('path');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const usersRoute= require("./routes/user");
const authRoute = require("./routes/auth");
const ProductRoute = require("./routes/product");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
const CategorieRoute =require("./routes/categorie");

dotenv.config();
mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connection successful !"))
.catch((err)=>{console.log(err)});

app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST','PUT','DELETE'], // Allow only specified HTTP methods
    allowedHeaders: '*', // Allow only specified headers
  }));
  app.get('/api/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'images', imageName);

    res.sendFile(imagePath);
  });
    
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/products",ProductRoute);
app.use("/api/carts",CartRoute);
app.use("/api/orders",OrderRoute);
app.use('/api/categories', CategorieRoute);








app.listen(process.env.PORT || 5000, ()=>{
console.log("Backend server is running!");

});