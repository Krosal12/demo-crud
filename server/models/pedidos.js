const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    numero_orden: {
        type: Number,
        default: 1,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    fecha_entrega: {
        type: Date,
        required: true,
    },
    contenido:[{
        cantidad: {
            type: Number,
            required: true,
        },
        producto: {
            type:String,
            required: true,
            trim: true
        },
        precio_u: {
            type: Number,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
    }],
    total:{
        type: Number,
        required:true,
    },
    estado: {
        type: String,
        required: true,
    }
});

pedidoSchema.pre('save', async function (next) {
    const ultimoPedido = await this.constructor.findOne().sort({ numero_orden: -1 }).limit(1);
    if (ultimoPedido) {
        this.numero_orden = ultimoPedido.numero_orden + 1;
    }
    next();
});

module.exports = mongoose.model('Pedido', pedidoSchema);
