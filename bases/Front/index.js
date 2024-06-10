const express= require('express');
const app= express();
const pages=require('./routes/pages')

const cors=require('cors');



app.use(cors());

app.use(express.json());

app.use('/pages', pages);


app.get('/',(req,res)=>{
    res.sendFile('./src/index.html',{
        root:__dirname
    });
})


app.listen(3500,()=>{
    console.log('servidor corriendo en el puerto: 3500')
});
