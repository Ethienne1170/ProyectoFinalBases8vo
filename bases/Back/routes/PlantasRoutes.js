const express = require('express');
const router = express.Router();
const db = require('../modules/conexionDB');



router.get('/plantas', (req, res) => {
    try {
        db.query('SELECT * FROM plantahongoarbolcatus', (error, result) => {
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

router.get('/invernaderos', (req, res) => {
    try {
        db.query('SELECT CONCAT(u.nombre, " ", u.appaterno) AS nUsuario, i.clave, i.nombre, i.numeroext, i.numeroint, i.calle, i.estado, i.region ' +
            'FROM invernadero i INNER JOIN usuario u ON i.claveusuario=u.clave', (error, result) => {
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

router.get('/list_inver', (req, res) => {
    try {
        db.query('SELECT i.claveusuario, CONCAT(u.nombre, " ", u.appaterno) AS nUsuario, i.clave, i.nombre, i.numeroext, i.numeroint, i.calle, i.estado, i.region ' +
            'FROM invernadero i INNER JOIN usuario u ON i.claveusuario=u.clave', (error, result) => {
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

router.get('/usuarios', (req, res) => {
    try {
        db.query('SELECT * FROM usuario', (error, result) => {
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

router.get('/login', (req, res) => {
    try {
        db.query('SELECT usuario, contrasena, privilegios FROM usuario', (error, result) => {
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

router.post('/usuario_info', (req, res) => {
    try {
        const data = req.body;
        db.query('SELECT * FROM usuario where usuario=?', [data.usuario], (error, result) => {
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

router.post('/update_usuario', (req, res) => {
    try {
        const data = req.body;
        db.query('UPDATE usuario SET nombre=?, appaterno=?, apmaterno=? where clave=?', [data.nombre, data.appaterno, data.apmaterno, data.clave], (error, result) => {
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

router.post('/update_usuario_pass', (req, res) => {
    try {
        const data = req.body;
        db.query('UPDATE usuario SET nombre=?, appaterno=?, apmaterno=?, contrasena=? where clave=?', [data.nombre, data.appaterno, data.apmaterno, data.contrasena, data.clave], (error, result) => {
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

router.post('/registro', (req, res) => {
    try {
        const data = req.body;
        db.query('SELECT MAX(clave) as maxId FROM usuario', (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Error en la consulta a la base de datos', details: error });
                return;
            }

            const maxId = results[0].maxId || 0; // Si no hay registros, maxId será null
            const newId = maxId + 1;
            db.query('INSERT INTO usuario(clave, nombre, appaterno, apmaterno, usuario, contrasena, estatus, privilegios) VALUES (?,?,?,?,?,?,?,?)', [newId, data.nombre, data.appaterno, data.apmaterno, data.usuario, data.contrasena, data.estatus, data.privilegios], (error, result) => {
                if (error) {
                    res.json(error);
                    return;
                }
                res.status(200).json(result);
            })
        });
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})


module.exports = router;