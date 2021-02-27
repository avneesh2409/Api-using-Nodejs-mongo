const router = require('express').Router();

const db = require('../database/model');
const { v4: uuiv,validate:uuidValidate } = require('uuid');

router.post('/',(req,res)=>{
    let id = uuiv();
    req.body.id = id
    let bot =  db.bot(req.body);
    bot.save();
    let error = bot.validateSync();
    if(error){
        res.json({
            status:"failed",
            error
        });
    }
    else{
        res.json({
            status:"success",
            data:bot
        });
    }
});
router.get('/',async (req,res)=>{
    let bots =  await db.bot.find({});
    res.json({
        status:"success",
        data:bots
    });
});
router.get('/:id',async (req,res)=>{
    if(uuidValidate(`${req.params.id}`)){
        let bot =  await db.bot.findOne({id:req.params.id});
        if(bot){
            res.json({
                status:"deleted",
                data:bot
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
            data:bot
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
    let bot =  await db.bot.deleteOne({id:req.params.id});
    if(bot.deletedCount == 1 && bot.ok == 1){
        res.json({
            status:"deleted",
            data:bot
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
        let bot = await db.bot.updateOne({ id:req.params.id}, {$set: { name: req.body.name }});
        if(bot.nModified == 1 && bot.ok == 1){
            res.json({
                status:"success",
                data:bot
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