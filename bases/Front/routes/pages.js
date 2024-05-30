const express =require('express');
const router=express.Router();
const path=require('path')


router.get('/plantas',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/plantas/plantas.html'));
})

module.exports=router;