const express = require("express");
const expressHbs = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

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

const uri =
  "mongodb+srv://giang:huNAGXZenvebYdgi@cluster0.r13gxca.mongodb.net/cp17301?retryWrites=true&w=majority";

const NhanvienModel = require("./NhanVienModel");
app.get("/", async (req, res) => {
  await mongoose.connect(uri);
  let arrNv = await NhanvienModel.find().lean();
  res.render("index", { list: arrNv });
});

app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/add", async (req, res) => {
  await mongoose.connect(uri);
  console.log("ket noi db thanh cong");
  var name = req.body.name;
  var address = req.body.address;
  var wage = req.body.wage;
  let nvMoi = {
    ten: name,
    diachi: address,
    luong: wage,
  };
  await NhanvienModel.insertMany(nvMoi);
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  await mongoose.connect(uri);
  let id = req.params.id;
  await NhanvienModel.deleteOne({ _id: id });
  console.log(id);
  res.redirect("back");
});

app.get("/edit/:id", async (req, res) => {
  await mongoose.connect(uri);
  var id = req.params.id;
  var nv = await NhanvienModel.findOne({ _id: id }).lean();
  res.render("edit", { nv: nv });
});

app.post("/edit/:id", async (req, res) => {
  await mongoose.connect(uri);
  var id = req.params.id;
  var name = req.body.name;
  var address = req.body.address;
  var wage = req.body.wage;
  console.log(id);
  let editNv = {
    ten: name,
    diachi: address,
    luong: wage,
  };
  await NhanvienModel.updateOne({_id: id},editNv);
  res.redirect("/");
});

app.listen(port);
