const express =require('express');
const router=express.Router();
const path=require('path')


router.get('/plantas',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/plantas/plantas.html'));
})

router.get('/perfil',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/perfil/perfil.html'));
})

router.get('/publicacion',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/publicacion/publicacion.html'));
})

module.exports=router;