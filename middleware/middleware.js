const express = require("express");
const server = express();
const bodyParser=require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const config=require("./../config/config.json");
const mongoose = require('mongoose');
require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');




server.use(bodyParser.json());
const cors = require('cors');


server.use(cors());


const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const upload = multer();
  const excelupload = multer({ dest: 'uploads/' });


  const imageSchema = new mongoose.Schema({
    filename: String,
    url: String,
  });

  const Image = mongoose.model('Image', imageSchema);



const authRouter = require('./../router/auth');
const userRouter = require('./../router/user');
const driverRouter = require('./../router/driver');
const itemRouter = require('./../router/item');
const locationRouter = require('./../router/location');
const lorryRouter = require('./../router/lorry');
const receiverLocationRouter = require('./../router/receiver_location');
const senderLocationRouter = require('./../router/sender_location');

 
 let { protocal, host, port, name,username,password } = config.app.db;
 let db= process.env.MONGODB_URL ||`mongodb+srv://admin:1234@cluster0.tognbkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log('connected to the database',db);

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
    },function(error){
        if(error)
        {
        console.log(error);
  }
        else
        {
        console.log('connected to the database',db);
        }
	});

  
server.use("/auth", authRouter);
server.use("/user", userRouter);
server.use("/driver", driverRouter);
server.use("/item", itemRouter);
server.use("/location", locationRouter);
server.use("/lorry", lorryRouter);
server.use("/receiverLocation", receiverLocationRouter);
server.use("/senderLocation", senderLocationRouter);




server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports= server;