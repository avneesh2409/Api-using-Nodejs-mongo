const router = require('express').Router();

const db = require('../database/model');
const { v4: uuiv,validate:uuidValidate } = require('uuid');

router.post('/',(req,res)=>{
    let id = uuiv();
    req.body.id = id
    let client =  db.client(req.body);
    client.save();
    let error = client.validateSync();
    if(error){
        res.json({
            status:"failed",
            error
        });
    }
    else{
        res.json({
            status:"success",
            data:client
        });
    }
});
router.get('/',async (req,res)=>{
    let clients =  await db.client.find({});
    res.json({
        status:"success",
        data:clients
    });
});
router.get('/:id',async (req,res)=>{
    if(uuidValidate(`${req.params.id}`)){
        let client =  await db.client.findOne({id:req.params.id});
        if(client){
            res.json({
                status:"deleted",
                data:client
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
            data:client
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
    let client =  await db.client.deleteOne({id:req.params.id});
    if(client.deletedCount == 1 && client.ok == 1){
        res.json({
            status:"deleted",
            data:client
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
        let client = await db.client.updateOne({ id:req.params.id}, {$set: { name: req.body.name }});
        if(client.nModified == 1 && client.ok == 1){
            res.json({
                status:"success",
                data:client
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