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

router.get('/home', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'../src/home/home.html'))
})

router.get('/header', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'../src/header.html'))
})
router.get('/invernadero',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../src/invernadero.html'));
})
router.get('/lista_usuarios', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'../src/lista_usuarios.html'))
})

router.get('/lista_plantas', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'../src/lista_plantas.html'))
})

router.get('/lista_invernaderos', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'../src/lista_invernaderos.html'))
})


module.exports=router;