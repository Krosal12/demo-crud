const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')


const pedidoModel = require('./models/pedidos')

const app=express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/pedidos");



app.get('/', async(req, res)=>{
    const pedidos = await pedidoModel.find();
    res.json(pedidos);
})


//crear
app.post("/createPedidos", (req, res) => {
    pedidoModel.create(req.body)
        .then(pedidos => res.json(pedidos))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});


//buscar por id
app.get('/getPedido/:id',(req, res)=>{
    const id = req.params.id;
    pedidoModel.findById({_id:id})
    .then(pedidos=>res.json(pedidos))
    .catch(err=>res.json(err))
})

app.put('/updatePedidos/:id', (req, res) => {
    const id = req.params.id;
    pedidoModel.findByIdAndUpdate(id, req.body

    , { new: true }) // Esta opción devuelve el nuevo objeto actualizado
        .then(pedidos => res.json(pedidos))
        .catch(err => res.json(err))
})


app.listen(3001, ()=>{
    console.log("Servidor corriendo en el puerto 3001")
})