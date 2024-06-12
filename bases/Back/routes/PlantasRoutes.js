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
        db.query('SELECT usuario, contrasena FROM usuario', (error, result)=>{
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
router.get('/publicacion', (req, res)=>{
    try {
        db.query('SELECT ' +
    'CONCAT(u.nombre, " ", u.appaterno) AS nUsuario, ' +  // Nombre del usuario que hizo la publicación
    'CONCAT(u2.nombre, " ", u2.appaterno) AS nUsuario1, ' +  // Nombre del usuario que hizo el comentario
    'c.contenido AS comentario, ' +  // Contenido del comentario
    'p.clave, ' +  // Clave de la publicación
    'p.imagen, ' +  // Imagen de la publicación
    'p.fecha, ' +  // Fecha de la publicación
    'p.contenido ' +  // Contenido de la publicación
    'FROM publicacion p ' +
    'JOIN usuario u ON p.claveusuario = u.clave ' +  // Unión para obtener el nombre del usuario que hizo la publicación
    'LEFT JOIN comentario c ON p.clave = c.clavepublicacion ' +  // Unión para obtener los comentarios
    'LEFT JOIN usuario u2 ON c.claveusuario = u2.clave', (error, result)=>{
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

router.post('/newcoment', (req, res) => {
    const clavepublicacion = req.params.clave;
    const { usuario, comentario } = req.body;
    console.log(req.body)

    const query = 'INSERT INTO comentario (clavepublicacion, claveusuario, contenido) VALUES (?, ?, ?)';
    db.query(query, [clavepublicacion, usuario, comentario], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ usuario, comentario });
        }
    });
});
router.post('/publicacion', (req, res) => {
    try {
        console.log(req.body); // Log the request body
        const { clave, claveusuario, contenido, imagen, fecha } = req.body;

        // Get the maximum clave from the Usuario table
        db.query('SELECT MAX(clave) as idxd FROM publicacion', (err, resultUsuario) => {
            if (err) { 
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(resultUsuario);
            return
            // Check if resultUsuario is defined and has elements
            if (resultUsuario && resultUsuario.length > 0) {
                const idxd = resultUsuario[0].idxd || 0;
                const newId = idxd + 1;
                const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

                // Insert new publication into the database
                db.query('INSERT INTO publicacion (clave, claveusuario, contenido, imagen, fecha) VALUES (?, ?, ?, ?, ?)',
                    [newId, claveusuario, contenido, imagen, fechaActual], (err, result) => {
                        if (err) {
                            res.status(500).json({ error: err.message });
                        } else {
                            res.json({ claveusuario, contenido, imagen });
                        }
                    }
                );
            } else {
                res.status(500).json({ error: 'No se pudo obtener la clave máxima de la tabla Usuario' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports=router;