import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('En proceso');

    useEffect(()=>{
        const fetchData = async() =>{
            const result = await axios.get('https://demo-crud-back.onrender.com/api');
            setPedidos(result.data);
        };
        /*
                axios.get('http://localhost:3001');
        .then(result=>setPedidos(result.data))
        .catch(err=>console.log(err))*/
        fetchData();
    }, []);



    const handleCancel = async (id) => {
      try {
          const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar este pedido?');
  
          if (confirmCancel) {
            const result = await axios.put(`https://demo-crud-back.onrender.com/api/updatePedidos/${id}`, { estado: 'Cancelado' });

            const updatedPedidos = pedidos.map(pedido => (pedido._id === id) ? { ...pedido, estado: 'Cancelado' } : pedido);
            setPedidos(updatedPedidos);
  
              // Mostrar alerta de cancelación exitosa
              window.alert('Pedido cancelado exitosamente.');
          }
      } catch (error) {
          console.error(error);
          // Mostrar alerta en caso de error
          window.alert('Error al cancelar el pedido. Por favor, inténtalo de nuevo.');
      }
  };

    //////////////////////////////////
// ...

// ...

// ...
// ...

const imprimir = (indicePedido) => {
    const doc = new jsPDF();
  
    // Lógica para generar el comprobante
    if (pedidos.length > indicePedido) {
      const compra = pedidos[indicePedido]; // Obtén el pedido específico utilizando el índice
  
      if (compra && compra.contenido && Array.isArray(compra.contenido)) { // Verifica que compra y contenido estén definidos y sea un arreglo
        const numOrdenData = [
          { numero_orden: compra.numero_orden },
        ];
        const tableDataP = numOrdenData.map(({ numero_orden }) => [numero_orden]);
        const headDataP = [['Orden No.']];
        const columnStyles = {
          0: { cellWidth: 30 },
        };
        // Configurar la tabla utilizando jspdf-autotable
        doc.autoTable({
          head: headDataP,
          body: tableDataP,
          theme: 'striped',
          startY: 10,
          tableWidth: 'wrap',
          margin: 166,
          columnStyles: columnStyles,
        });
  
        // Formatear la fecha
        const fechaFormateada = new Date(compra.fecha_entrega).toLocaleDateString();
        doc.text(15, 35, `Nombre del cliente: ${compra.nombre}`);
        // Texto con fecha
        const textoFecha = `Fecha de entrega: ${fechaFormateada}`;
        doc.text(15, 45, textoFecha);
        doc.setFont('helvetica');
        doc.setTextColor(255, 215, 0);
        doc.setFontSize(25);
        doc.text('LA PUNTADA DORADA', 35, 20);
  
        // Utiliza tu propio arreglo con los datos de la compra
        const tableData = compra.contenido.map(({ cantidad, producto, precio_u, subtotal }) => [
          cantidad,
          producto,
          `Q.${precio_u}`,
          `Q.${subtotal}`,
          `Q.${cantidad * precio_u}`,
        ]);
  
        // Cabeceras de la tabla
        const headData = [['Cantidad', 'Producto', 'Precio Unitario', 'Subtotal', 'Total']];
  
        // Configurar la tabla utilizando jspdf-autotable
        doc.autoTable({
          head: headData,
          body: tableData,
          theme: 'striped',
          startY: 55,
        });
  
        doc.save('comprobante.pdf');
      } else {
        console.error('Error: La propiedad contenido no está definida o no es un arreglo en el objeto compra.');
      }
    }
  };
  
  // ...
  
  
  // ...
  
    
    
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-70 bg-white rounded p-3">
                <Link to="/create" className='btn btn-success mr-8' style={{ marginRight: '80px' }}>Nuevo</Link>

                <div className='form-check form-check-inline'>
    <label className="form-check-label" htmlFor="inlineRadioTodos">Todos</label>
    <input
        className="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadioTodos"
        value="Todos"
        checked={filtroEstado === 'Todos'}
        onChange={() => setFiltroEstado('Todos')}
    />
</div>
<div className="form-check form-check-inline">
    <label className="form-check-label" htmlFor="inlineRadioEnProceso">En proceso</label>
    <input
        className="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadioEnProceso"
        value="En proceso"
        checked={filtroEstado === 'En proceso'}
        onChange={() => setFiltroEstado('En proceso')}
    />
</div>
<div className="form-check form-check-inline">
    <label className="form-check-label" htmlFor="inlineRadioAbonado">Abonado</label>
    <input
        className="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadioAbonado"
        value="Abonado"
        checked={filtroEstado === 'Abonado'}
        onChange={() => setFiltroEstado('Abonado')}
    />
</div>
<div className="form-check form-check-inline">
    <label className="form-check-label" htmlFor="inlineRadioFinalizado">Finalizado</label>
    <input
        className="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadioFinalizado"
        value="Finalizado"
        checked={filtroEstado === 'Finalizado'}
        onChange={() => setFiltroEstado('Finalizado')}
    />
</div>
<div className="form-check form-check-inline">
    <label className="form-check-label" htmlFor="inlineRadioCancelado">Cancelado</label>
    <input
        className="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadioCancelado"
        value="Cancelado"
        checked={filtroEstado === 'Cancelado'}
        onChange={() => setFiltroEstado('Cancelado')}
    />
</div>


                

       
                
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>No. orden</th>
                            <th>Nombre</th>
                            <th>Fecha de Entrega</th>
                           
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos
                        .filter(pedido => filtroEstado === 'Todos' || pedido.estado === filtroEstado) // Filtra por pedidos en proceso
                        .map((pedido, index) => (
                            <tr key={index}>
                                <td>{pedido.numero_orden}</td>
                                <td>{pedido.nombre}</td>
                                <td>{pedido.fecha_entrega ? new Date(pedido.fecha_entrega).toLocaleDateString() : 'Fecha inválida'}</td>                               
                                <td>{pedido.total}</td>
                                <td>{pedido.estado}</td>
                                <td>
                                <Link to={`/detalle/${pedido._id}`} className='btn btn-info' style={{ marginRight: '10px' }}>Ver</Link>
<Link to={`/update/${pedido._id}`} className='btn btn-primary' style={{ marginRight: '10px' }}>Editar</Link>
<button className='btn btn-danger' onClick={() => handleCancel(pedido._id)} style={{ marginRight: '10px' }}>Cancelar</button>
<button className='btn btn-secondary' onClick={() => imprimir(index)}>Imprimir Comprobante</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pedidos;
