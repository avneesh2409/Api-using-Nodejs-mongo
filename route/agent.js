const router = require('express').Router();

const db = require('../database/model');
const { v4: uuiv,validate:uuidValidate } = require('uuid');

router.post('/',(req,res)=>{
    let id = uuiv();
    req.body.id = id
    let agent =  db.agent(req.body);
    agent.save();
    let error = agent.validateSync();
    if(error){
        res.json({
            status:"failed",
            error
        });
    }
    else{
        res.json({
            status:"success",
            data:agent
        });
    }
    
});
router.get('/',async (req,res)=>{
    var server = global._io.getServer();
    server.emit("message","Notification sent!!")
    let agents =  await db.agent.find({});
    res.json({
        status:"success",
        data:agents
    });
});
router.get('/:id',async (req,res)=>{
    if(uuidValidate(`${req.params.id}`)){
        let agent =  await db.agent.findOne({id:req.params.id});
        if(agent){
            res.json({
                status:"deleted",
                data:agent
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
            data:agent
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
    let agent =  await db.agent.deleteOne({id:req.params.id});
    if(agent.deletedCount == 1 && agent.ok == 1){
        res.json({
            status:"deleted",
            data:agent
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
        let agent = await db.agent.updateOne({ id:req.params.id}, {$set: { name: req.body.name }});
        if(agent.nModified == 1 && agent.ok == 1){
            res.json({
                status:"success",
                data:agent
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