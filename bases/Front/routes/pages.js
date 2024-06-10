const express =require('express');
const router=express.Router();
const path=require('path')


router.get('/plantas',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/plantas/plantas.html'));
})

router.get('/perfil',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/perfil/perfil.html'));
})

router.get('/invernaderos',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/invernaderos/invernaderos.html'));
})

router.get('/perfil',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/perfil/perfil.html'));
})


module.exports=router;