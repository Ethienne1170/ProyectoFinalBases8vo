const express = require('express');
const router = express.Router();
const db = require('../modules/conexionDB');



router.get('/plantas', (req, res) => {
    try {
        console.log('hola')
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
router.get('/invernaderouser', (req, res) => {
    const { id } = req.query;
    try {
        db.query('SELECT * FROM invernadero WHERE clave=?', [id], (error, result) => {
            if (error) {
                res.json(error);
                return;
            }
            res.status(200).json(result[0]);

        })

    } catch (error) {
        res.status(200).json(error);
    }
})


router.get('/invernaderoplanta', (req, res) => {
    const { id } = req.query;
    try {
        db.query('SELECT p.* FROM plantahongoarbolcatus p, inventario i WHERE i.claveinvernadero=? and i.claveph= p.clave;', [id], (error, result) => {
            if (error) {
                res.json(error);
                return;
            }
            res.status(200).json(result);

        })

    } catch (error) {
        res.status(200).json(error);
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

router.get('/misinvernaderos', (req, res) => {
    const { user } = req.query;
    try {
        db.query('SELECT i.* FROM invernadero i, usuario u WHERE u.usuario=? and u.clave= i.claveusuario', [user], (error, result) => {
            if (error) {
                res.json('eres una verguenza para la ley')
                return;
            }
            res.status(200).json(result);
        })

    } catch (error) {
        res.json(error);
    }
}
)
router.post('/newInvernadero', (req, res) => {
    console.log(req.body);
    const { nombre, numeroExterior, numeroInterior, calle, estado, region, user , latitud, longitud} = req.body;
    //res.json('hola mundo')

    db.query('SELECT MAX(clave) as maxId FROM usuario', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error en la consulta a la base de datos', details: error });
            return;
        }

        const maxId = results[0].maxId || 0; // Si no hay registros, maxId será null
        const newId = maxId + 1;
        db.query('INSERT INTO invernadero(clave, claveusuario, nombre,numeroext,numeroint, calle, estado, region,latitud, longitud) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [newId, user, nombre, numeroExterior, numeroInterior, calle, estado, region,latitud,longitud], (error, result) => {
                if (error) {
                    res.json(error);
                    return;
                }
                res.status(200).json('para cambiarlo todo, hay que dejar todo como esta');
            })
    });
})

router.post('/insertPlantaInv', (req, res) => {
    console.log(req.body);
    //res.json('amanda');
    const { cantidad, invernaderos, clave } = req.body;
    db.query('INSERT INTO inventario(claveinvernadero, claveph, cantidad) VALUES (?,?,?)',
        [invernaderos, clave, cantidad], (err, result) => {
            if (err) {
                res.json(err)
                return;
            }
            res.status(200).json(result)
        })
})

router.post('/agregar_planta', (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        db.query('INSERT INTO plantahongoarbolcatus(nombre, genero, familia, extinta, clima, riego_frecuencia, iluminacion, url_imagen) VALUES (?,?,?,?,?,?,?,?)', [data.nombre, data.genero, data.familia, Number(data.extinta), data.clima, data.riego, data.iluminacion, data.url], (error, result) => {
            if (error) {
                res.json(error);
                return;
            }

            console.log(result.insertId);
            const plantId = result.insertId;

            const insertUsos = () => {
                return new Promise((resolve, reject) => {
                    db.query('SELECT MAX(IdUso) as maxIdUso FROM usos', (error, results) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        const maxIdUso = results[0].maxIdUso || 0; // Si no hay registros, maxId será null
                        let newIdUso = maxIdUso + 1;

                        const usoPromises = data.usos.map((uso) => {
                            return new Promise((resolve, reject) => {
                                db.query('INSERT INTO usos(IdUso, ClavePH, TipoUso, DescripcionUso, CantidadUso) VALUES (?,?,?,?,?)',
                                    [newIdUso++, plantId, uso.TipoUso, uso.DescripcionUso, uso.CantidadUso], (error, result) => {
                                        if (error) {
                                            reject(error);
                                            return;
                                        }
                                        resolve(result);
                                    });
                            });
                        });

                        Promise.all(usoPromises)
                            .then(resolve)
                            .catch(reject);
                    });
                });
            };

            const insertOrigenes = () => {
                return new Promise((resolve, reject) => {
                    const origenPromises = data.origenes.map((origen) => {
                        return new Promise((resolve, reject) => {
                            db.query('INSERT INTO ubicacionorigen(claveph, estado, region) VALUES (?,?,?)',
                                [plantId, origen.Estado, origen.Region], (error, result) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve(result);
                                });
                        });
                    });

                    Promise.all(origenPromises)
                        .then(resolve)
                        .catch(reject);
                });
            };

            Promise.all([insertUsos(), insertOrigenes()])
                .then(() => {
                    res.status(200).json({ message: 'Data inserted successfully' });
                })
                .catch((error) => {
                    res.json(error);
                });

            res.status(200);
        })
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})
router.get('/publicacion', (req, res) => {
    try {
        db.query('SELECT ' +
            'CONCAT(u.nombre, " ", u.appaterno) AS nUsuario, ' +  // Nombre del usuario que hizo la publicación
            'CONCAT(u2.nombre, " ", u2.appaterno) AS nUsuario1, ' +  // Nombre del usuario que hizo el comentario
            'c.contenido AS comentario, ' +  // Contenido del comentario
            'p.clave, ' +  // Clave de la publicación
            'p.fecha, ' +  // Fecha de la publicación
            'p.contenido ' +  // Contenido de la publicación
            'FROM publicacion p ' +
            'JOIN usuario u ON p.claveusuario = u.clave ' +  // Unión para obtener el nombre del usuario que hizo la publicación
            'LEFT JOIN comentario c ON p.clave = c.clavepublicacion ' +  // Unión para obtener los comentarios
            'LEFT JOIN usuario u2 ON c.claveusuario = u2.clave', (error, result) => {
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
    const { usuario, comentario, clave } = req.body;
    console.log(req.body)
    db.query('SELECT MAX(clave) as idxd FROM comentario', (err, resultUsuario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(resultUsuario)
        const idxd = resultUsuario[0].idxd || 0;
        const newId = idxd + 1;


        db.query('INSERT INTO comentario (clave,clavepublicacion, claveusuario, contenido) VALUES (?,?, ?, ?)', [newId, clave, usuario, comentario], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: err.message });
                return;
            } 
            console.log(result)
            res.status(200).json( result);
            
        });
    })
});
router.post('/publicacion', (req, res) => {
    try {
        console.log(req.body); // Log the request body
        const { clave, contenido, } = req.body;

        // Get the maximum clave from the Usuario table
        db.query('SELECT MAX(clave) as idxd FROM publicacion', (err, resultUsuario) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            //res.json(resultUsuario);
            // Check if resultUsuario is defined and has elements
            console.log(resultUsuario)
            if (resultUsuario && resultUsuario.length > 0) {
                const idxd = resultUsuario[0].idxd || 0;
                const newId = idxd + 1;
                const fechaActual = new Date().toISOString();
                //claveusuario=$usuarioCookie; 
                // Insert new publication into the database
                db.query('INSERT INTO publicacion (clave, claveusuario, contenido, fecha) VALUES (?, ?, ?, ?)',
                    [newId, clave, contenido, fechaActual], (err, result) => {
                        if (err) {
                            res.status(500).json({ error: err.message });
                        } else {
                            res.json("holamundo(printf)");
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

router.get("/comentariosPublicacion", (req, res) => {
    console.log(req.query)
    const { clave } = req.query
    console.log(clave)
    try {
        db.query("SELECT c.contenido, u.usuario FROM comentario c, usuario u WHERE clavepublicacion=? and c.claveusuario=u.clave;", [clave], (err, result) => {
            if (err) {
                res.json(err)
                return;
            }
            console.log(result)
            res.status(200).json(result)
        })
    } catch (error) {
        res.json(error)
    }
});

router.get('/usos', (req, res) => {
    const { user } = req.query;
    console.log(req.query)
    try {
        db.query('SELECT * FROM usos u WHERE u.ClavePH=?', [user], (err, result) => {
            if(err){
                res.json(error)
                return
            }
            res.json(result);
    })
    } catch (error) {
        res.json(error)
    }

})

router.get('/posecion', (req, res) => {
    const {clave}=req.query;
    try {
        db.query('SELECT  ph.nombre, p.cantidad FROM posesion p, usuario c, plantahongoarbolcatus ph WHERE p.claveusuario=c.clave and p.claveph=ph.clave and c.clave=? '
            ,[clave],(err,result)=>{
                if (err) {
                    res.json(err)
                }
                res.status(200).json(result);
            }
        )
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})
router.post('/agregarMisPlantas', (req, res) => {
    const {clave,claveph,cnt}=req.query;
    try {
        db.query('INSERT INTO posesion(claveusuario, claveph, cantidad) VALUES (?,?,?)'
            ,[clave,claveph,cnt],(err,result)=>{
                if (err) {
                    res.json(err)
                }
                res.status(200).json("hola Caleb");
            }
        )
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})


module.exports = router;