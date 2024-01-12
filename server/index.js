const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app =express();

const pedidoModel = require('./models/pedidos');
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    const PORT =process.env.PORT || 8000
    app.listen(PORT,()=>{
        console.log(`Servidor corriendo en ${PORT}`);
    })
}).catch(err=>{
    console.log(err);
});

app.get('/', async (req, res) => {
    try {
        const pedidos = await pedidoModel.find();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await pedidoModel.find();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});













/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const pedidoModel = require('./models/pedidos');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/pedidos";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); 
    });

    app.get('/pedidos', async (req, res) => {
        try {
            const pedidos = await pedidoModel.find();
            res.json(pedidos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
 
    app.get('/', async (req, res) => {
        try {
            const pedidos = await pedidoModel.find();
            res.json(pedidos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    

app.post("/createPedidos", async (req, res) => {
    try {
        const pedidos = await pedidoModel.create(req.body);
        res.json(pedidos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/getPedido/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pedidos = await pedidoModel.findById(id);
        res.json(pedidos);
    } catch (err) {
        res.json(err);
    }
});

app.put('/updatePedidos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pedidos = await pedidoModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(pedidos);
    } catch (err) {
        res.json(err);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Conexión a la base de datos cerrada');
        process.exit(0);
    });
});


app.use((req, res) => {
    res.status(404).json({ error: 'Página no encontrada' });
});
*/