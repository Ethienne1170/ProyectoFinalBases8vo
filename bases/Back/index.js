const express= require('express');
const app= express();
const plantas= require('./routes/PlantasRoutes')

const cors=require('cors');



app.use(cors());

app.use(express.json());

app.use('/plantas', plantas);
app.use('/invernaderos', plantas);

app.listen(3000,()=>{
    console.log('servidor corriendo en el puerto: 3000')
});
