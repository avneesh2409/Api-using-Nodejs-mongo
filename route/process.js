const router = require('express').Router();

const db = require('../database/model');
const { v4: uuiv,validate:uuidValidate } = require('uuid');

router.post('/',(req,res)=>{
    try{
        let id = uuiv();
        req.body.id = id
        let process =  db.process(req.body);
        process.save();
        let error = process.validateSync();
    if(error){
        res.json({
            status:"failed",
            error
        });
    }
    else{
        res.json({
            status:"success",
            data:process
        });
    }
    }
    catch(e){
        res.json({
            status:"failed",
            error:e
        })
    }
});
router.get('/',async (req,res)=>{
    let processs =  await db.process.find({});
    res.json({
        status:"success",
        data:processs
    });
});
router.get('/:id',async (req,res)=>{
    if(uuidValidate(`${req.params.id}`)){
        let process =  await db.process.findOne({id:req.params.id});
        if(process){
            res.json({
                status:"deleted",
                data:process
            });
        }
        else{
            res.json({
                status:"failed",
                error:"given Id is not found!!"
            })
        }    
        res.json({
            status:"success",
            data:process
        })
    }
    else{
        res.json({
            status:"failed",
            error:"id is not correct"
        })
    }
      
});
router.delete('/:id',async (req,res)=>{
    if(uuidValidate(`${req.params.id}`)){
    let process =  await db.process.deleteOne({id:req.params.id});
    if(process.deletedCount == 1 && process.ok == 1){
        res.json({
            status:"deleted",
            data:process
        });
    }
    else{
        res.json({
            status:"failed",
            error:"Unable to delete"
        })
    }    
}
else{
    res.json({
        status:"failed",
        error:"id is not correct"
    })
}
    

});

router.put('/:id',async (req,res) =>{
    if(uuidValidate(`${req.params.id}`)){
        let process = await db.process.updateOne({ id:req.params.id}, {$set: { name: req.body.name }});
        if(process.nModified == 1 && process.ok == 1){
            res.json({
                status:"success",
                data:process
            })
        }
         else{
            res.json({
                status:"failed",
                error:"unable to update the record"
            })
         }
    }
    else{
        res.json({
            status:"failed",
            error:"id is not correct"
        })
    }
   
});

module.exports = router;