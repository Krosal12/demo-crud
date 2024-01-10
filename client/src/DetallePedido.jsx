import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const DetallePedido = () => {
  const [pedido, setPedido] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPedidoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getPedido/${id}`);
        setPedido(response.data);
      } catch (error) {
        console.error('Error fetching pedido details:', error);
      }
    };

    fetchPedidoDetails();
  }, [id]);

  if (!pedido) {
    return <div>Cargando detalles del pedido...</div>;
  }


  const ListadoCompleto = ({ productos }) => (
    <ul>
      {productos.map((producto, index) => (
        <li key={index}>
          Cantidad: {producto.cantidad}, Producto: {producto.producto}, Precio Unitario: {producto.precio_u}, Subtotal: {producto.subtotal}
        </li>
      ))}
    </ul>
  );



  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className="w-70 bg-white rounded p-3">
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>No. Orden</th>
            <td>{pedido.numero_orden}</td>
          </tr>
          <tr>
            <th>Nombre del Cliente</th>
            <td>{pedido.nombre}</td>
          </tr>
          <tr>
            <th>Fecha de Entrega</th>
            <td>{pedido.fecha_entrega ? new Date(pedido.fecha_entrega).toLocaleDateString() : 'Fecha inválida'}</td>
          </tr>
         
          <tr>
            <th>Listado Completo</th>
            <td>
              {pedido.contenido && pedido.contenido.length > 0 ? (
                <ListadoCompleto productos={pedido.contenido} />
              ) : (
                <p>No hay productos en este pedido.</p>
              )}
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{pedido.total}</td>
          </tr>
        </tbody>
      </table>
      <Link to="/" className='btn btn-secondary'>Regresar</Link>
    </div>
    </div>
  );
};

export default DetallePedido;
