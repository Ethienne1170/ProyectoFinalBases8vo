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

router.get('/list_inver', (req, res)=>{
    try {
        db.query('SELECT i.claveusuario, CONCAT(u.nombre, " ", u.appaterno) AS nUsuario, i.clave, i.nombre, i.numeroext, i.numeroint, i.calle, i.estado, i.region ' + 
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

router.get('/usuarios', (req, res)=>{
    try {
        db.query('SELECT * FROM usuario', (error, result)=>{
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

router.get('/login', (req, res)=>{
    try {
        db.query('SELECT usuario, contrasena, privilegios FROM usuario', (error, result)=>{
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

router.post('/usuario_info', (req, res)=>{
    try {
        const data = req.body;
        db.query('SELECT * FROM usuario where usuario=?', [data.usuario], (error, result)=>{
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
router.get('/invernaderouser',(req, res)=>{
    const {id}=req.query;
    try {
        db.query('SELECT * FROM invernadero WHERE clave=?', [id], (error,result)=>{
            if (error) {
                res.json(error);
                return;
            }
            res.status(200).json(result[0]);

        } )        

    } catch (error) {
        res.status(200).json(error);
    }
})


router.get('/invernaderoplanta',(req, res)=>{
    const {id}=req.query;
    try {
        db.query('SELECT p.* FROM plantahongoarbolcatus p, inventario i WHERE i.claveinvernadero=? and i.claveph= p.clave;', [id], (error,result)=>{
            if (error) {
                res.json(error);
                return;
            }
            res.status(200).json(result);

        } )        

    } catch (error) {
        res.status(200).json(error);
    }
})

router.post('/update_usuario', (req, res)=>{
    try {
        const data = req.body;
        db.query('UPDATE usuario SET nombre=?, appaterno=?, apmaterno=?, usuario=? where clave=?', [data.nombre, data.appaterno, data.apmaterno, data.usuario, data.clave], (error, result)=>{
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

router.post('/update_usuario_pass', (req, res)=>{
    try {
        const data = req.body;
        db.query('UPDATE usuario SET nombre=?, appaterno=?, apmaterno=?, usuario=?, contrasena=? where clave=?', [data.nombre, data.appaterno, data.apmaterno, data.usuario, data.contrasena, data.clave], (error, result)=>{
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