const path = require('path');
const modelFolder = path.join(__dirname);//,'database','model');
const fs = require('fs');

var db = {};
fs.readdirSync(modelFolder).forEach(file => {
    if(file.split('.')[1] == 'js' && file.split('.')[0] != 'index'){
        let model = require(path.join(__dirname,file));
        db[`${model.modelName}`] = model;
    }
});

module.exports = db;