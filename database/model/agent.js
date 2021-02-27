const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    id:{type:String,required:true},
    clientId:{type:String,required:true},
    name: { type: String, required:true},
    status: { type:String,default:"pending"},
    isDeleted: { type: Boolean,default:false},
    isActive:{type:Boolean,default:true}
  },{
    timestamps: true
  });


module.exports = mongoose.model('agent',AgentSchema);