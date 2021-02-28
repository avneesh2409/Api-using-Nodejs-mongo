var mongoose = require('mongoose');
const config = require('../../config');

const uri = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
mongoose.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true } ,function(err) {
  if (err) throw err;
  console.log("Database Connected Successfully !!");
});