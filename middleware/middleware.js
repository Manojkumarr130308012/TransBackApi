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
const exceljs = require('exceljs');
const Student = require('../model/student');
const Teacher = require('../model/teacher');
const classSchema = require('../model/class');



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



  server.post('/student/upload', excelupload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = new exceljs.Workbook();
  workbook.xlsx.readFile(req.file.path)
    .then(() => {
      const worksheet = workbook.getWorksheet(1);
      worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
        if (rowNumber !== 1) { 
          const rowData = row.values;
          let response = await classSchema.find({name:rowData[2]});
          const student = new Student({
            name: rowData[1],
            class_id: response[0]._id,
            section: rowData[3],
            phone: rowData[4] || "0123456789",
            address: rowData[5]
          });
          student.save()
            .then(() => console.log(`Saved student: ${student.name}`))
            .catch(err => console.error(`Error saving student: ${err}`));
        }
      });

      res.send('File uploaded successfully.');
    })
    .catch(err => {
      console.error(`Error reading Excel file: ${err}`);
      res.status(500).send('Error processing file.');
    });
});



server.post('/teacher/upload', excelupload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = new exceljs.Workbook();
  workbook.xlsx.readFile(req.file.path)
    .then(() => {
      const worksheet = workbook.getWorksheet(1);
      worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
        if (rowNumber !== 1) { 
          const rowData = row.values;
          let response = await classSchema.find({name:rowData[2]});
          const teacher = new Teacher({
            name: rowData[1],
            class_id: response[0]._id,
            phone: rowData[3] || "0123456789",
            address: rowData[4]
          });
          teacher.save()
            .then(() => console.log(`Saved student: ${teacher.name}`))
            .catch(err => console.error(`Error saving student: ${err}`));
        }
      });

      res.send('File uploaded successfully.');
    })
    .catch(err => {
      console.error(`Error reading Excel file: ${err}`);
      res.status(500).send('Error processing file.');
    });
});

  server.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const params = {
        Bucket:  process.env.AWS_BUCKET,
        Key: req.file.originalname,
        Body: req.file.buffer,
      };
      const s3Data = await s3.upload(params).promise();
  
      // Save image metadata to MongoDB
      const image = new Image({
        filename: req.file.originalname,
        url: s3Data.Location,
      });
      await image.save();
  
      res.send({
        status: "success",
        url: image.url
    });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).send('Error uploading image');
    }
  });

//locationdata
const authRouter = require('./../router/auth');
const userRouter = require('./../router/user');
const classRouter = require('./../router/class');
const sectionRouter = require('./../router/section');
const categoryRouter = require('./../router/category');
const productRouter = require('./../router/product');
const studentRouter = require('./../router/student');
const teacherRouter = require('./../router/teacher');
const vendorRouter = require('./../router/vendor');
const inventoryRouter = require('./../router/inventory');
const assignBooksRouter = require('./../router/assign_books');
const paymentRouter = require('./../router/payment');
const comboRouter = require('./../router/combo');
const billingRouter = require('./../router/billing');
 
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
server.use("/class", classRouter);
server.use("/section", sectionRouter);
server.use("/category", categoryRouter);
server.use("/product", productRouter);
server.use("/student", studentRouter);
server.use("/teacher", teacherRouter);
server.use("/assign_books", assignBooksRouter);
server.use("/vendor", vendorRouter);
server.use("/inventory", inventoryRouter);
server.use("/payment", paymentRouter);
server.use("/combo", comboRouter);
server.use("/billing", billingRouter);


server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports= server;