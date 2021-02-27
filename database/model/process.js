const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProcessSchema = new Schema({
    id:{type:String,required:true},
    botId:{type:String,required:true},
    agentId:{type:String,required:true},
    status: { type:String,default:"pending"},
    isDeleted: { type: Boolean,default:false},
    isActive:{type:Boolean,default:true}
  },{
    timestamps: true
  });


module.exports = mongoose.model('process',ProcessSchema);