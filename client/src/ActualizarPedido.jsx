import React, { useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


function ActualizarPedido() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [fecha_entrega, setFecha] = useState('');
  const [cantidad, setCantidad] =useState('');
  const [producto, setProducto] =useState('');
  const [subtotal, setSubtotal] =useState('');
  const [precio_u, setPrecio_u] =useState('');
  const [contenido, setContenido] = useState([]);
  const [total, setTotal] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/getPedido/${id}`)
      .then(result => {
        const pedidoData = result.data;
        setNombre(pedidoData.nombre);
        const fechaEntrega = pedidoData.fecha_entrega ? new Date(new Date(pedidoData.fecha_entrega).getTime() - (new Date(pedidoData.fecha_entrega).getTimezoneOffset() * 60000)).toISOString().split('T')[0] : '';
        setFecha(fechaEntrega);
  
        const contenidoPedido = pedidoData.contenido.map(item => ({
          cantidad: item.cantidad,
          producto: item.producto,
          precio_u: item.precio_u,
          subtotal: item.subtotal,
        }));
  
        setContenido(contenidoPedido);
        setTotal(pedidoData.total);
        setEstado(pedidoData.estado);
      })
      .catch(err => console.log(err));
  }, [id]);
  

  const updatePedido = (e) => {
    e.preventDefault();

    const contenidoActualizado = contenido.map(item => ({
        cantidad: item.cantidad,
        producto: item.producto,
        precio_u: item.precio_u,
        subtotal: item.subtotal,
    }));

    axios.put(`http://localhost:3001/updatePedidos/${id}`, {
        nombre,
        fecha_entrega,
        contenido: contenidoActualizado, // Aquí se envía el arreglo actualizado
        total,
        estado
    })
    .then(result => {
        console.log(result.data); 
        navigate('/');
    })
    .catch(err => console.log(err));
}

const handleFieldChange = (e, index, field) => {
  const updatedContenido = [...contenido];
  updatedContenido[index] = {
    ...updatedContenido[index],
    [field]: e.target.value,
  };
  setContenido(updatedContenido);
};
const handleProductoChange = (e, index) => {
  const updatedContenido = [...contenido];
  updatedContenido[index].producto = e.target.value;
  setContenido(updatedContenido);
};

const handlePrecioChange = (e, index) => {
  const updatedContenido = [...contenido];
  updatedContenido[index].precio_u = e.target.value;
  setContenido(updatedContenido);
};

const handleSubtotalChange = (e, index) => {
  const updatedContenido = [...contenido];
  updatedContenido[index].subtotal = e.target.value;
  setContenido(updatedContenido);
};



  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={updatePedido}>
          <h2>Actualizar Pedido</h2>
          <div className='mb-2'>
            <input
              type="text"
              name="nombre"
              className="w-full bg-zinc-700 form-control py-2 rounded my-2"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <input
              type="date"
              name="fecha_entrega"
              className="w-full bg-zinc-700 form-control  py-2 rounded my-2"
              placeholder="Fecha de Entrega"
              value={fecha_entrega}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <table className='table table-striped'>
    <thead>
    <tr>
      <th>Cantidad</th>
      <th>Producto</th>
      <th>Precio Unitario</th>
      <th>Subtotal</th>
    </tr>
  </thead>
  <tbody>
  {contenido.map((item, index) => (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={item.cantidad}
            onChange={(e) => handleFieldChange(e, index, 'cantidad')}
          />
        </td>
        <td>
          <input
            type="text"
            value={item.producto}
            onChange={(e) => handleFieldChange(e, index, 'producto')}
          />
        </td>
        <td>
          <input
            type="text"
            value={item.precio_u}
            onChange={(e) => handleFieldChange(e, index, 'precio_u')}
          />
        </td>
        <td>
          <input
            type="text"
            value={item.subtotal}
            onChange={(e) => handleFieldChange(e, index, 'subtotal')}
          />
        </td>
      </tr>
    ))}
  </tbody>
    </table>
  

         
          <div className='mb-2'>
            <input
              type="number"
              name="total"
              className="w-full bg-zinc-700  form-control py-2 rounded my-2"
              placeholder="Total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
          <div>
            <select
                name="estado"
                className="w-full bg-zinc-700 form-control py-2 rounded my-2"
                placeholder="Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                >
                <option value="Seleccione el estado">Seleccione el estado</option>
                <option value="En proceso">En proceso</option>
                <option value="Abonado">Abonado</option>
                <option value="Finalizado">Finalizado</option>
                {/* Agrega más opciones según los estados que necesites */}
            </select>
          </div>
          <button className='btn btn-success my-2'>Actualizar</button>
          <Link to="/" className='btn btn-secondary'>Regresar</Link>
     
        </form>
      </div>
    </div>
  )
}

export default ActualizarPedido