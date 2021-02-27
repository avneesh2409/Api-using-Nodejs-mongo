const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BotSchema = new Schema({
    id:{type:String,required:true},
    path: { type: String, required:true},
    isDeleted: { type: Boolean,default:false},
    isActive:{type:Boolean,default:true}
  },{
    timestamps: true
  });


module.exports = mongoose.model('bot',BotSchema);