const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    id:{type:String,required:true},
    name: { type: String, required:true},
    emailId: { type: String, required:true},
    password:{type:String,required:true},
    contact: { type:String,default:"pending"},
    isDeleted: { type: Boolean,default:false},
    isActive:{type:Boolean,default:true}
  },{
    timestamps: true
  });


module.exports = mongoose.model('client',ClientSchema);