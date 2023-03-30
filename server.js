const express = require('express');
const expressHbs = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
    "hbs",
    expressHbs.engine({
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "./views");

const uri = 'mongodb+srv://giang:huNAGXZenvebYdgi@cluster0.r13gxca.mongodb.net/cp17301?retryWrites=true&w=majority';

const NhanvienModel = require('./NhanVienModel');
app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    let arrNv = await NhanvienModel.find().lean();
    console.log(arrNv);
    res.render("index", { list: arrNv });
});

app.get('/add', async (req, res) => {
    await mongoose.connect(uri);
    
    console.log('ket noi db thanh cong');

    let nvMoi = {
        ten: 'ten',
        diachi : 'Ha noi',
        luong : 20,
    }

    let kq = NhanvienModel.insertMany(nvMoi)
    console.log(kq);
    let arrNv = await NhanvienModel.find();
    res.send(arrNv);
});

app.get('/delete', async (req, res) => {
    await mongoose.connect(uri);
    
    console.log('ket noi db thanh cong');

    let kq = await NhanvienModel.deleteOne({ten: 'ten'});
    let arrNv = await NhanvienModel.find();
    res.send(arrNv);
});



app.listen(port);