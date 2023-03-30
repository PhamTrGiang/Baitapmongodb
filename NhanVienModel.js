const mongoose = require("mongoose");

const NhanvienSchema = new mongoose.Schema({
    ten:{
        type: String,
        require: true,
    },
    diachi:{
        type: String,
        require: true,
    },
    luong:{
        type: Number,
        default:0,
    }
});

const NhanvienModel = mongoose.model('nhanvien',NhanvienSchema);
module.exports = NhanvienModel;