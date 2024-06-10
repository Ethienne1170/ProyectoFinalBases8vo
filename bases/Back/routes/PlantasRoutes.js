const express =require('express');
const router=express.Router();
const db =require('../modules/conexionDB');



router.get('/plantas', (req, res)=>{
    try {
        db.query('SELECT * FROM plantahongoarbolcatus', (error, result)=>{
            if (error) {
                res.json(error);
                return;
            }
            res.status(200).json(result);
        })
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})

router.get('/invernaderos', (req, res)=>{
    try {
        db.query('SELECT CONCAT(u.nombre, " ", u.appaterno) AS nUsuario, i.clave, i.nombre, i.numeroext, i.numeroint, i.calle, i.estado, i.region ' + 
                    'FROM invernadero i INNER JOIN usuario u ON i.claveusuario=u.clave', (error, result)=>{
            if (error) {
                res.json(error);
                return;
            }
            res.status(200).json(result);
        })
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})


module.exports=router;