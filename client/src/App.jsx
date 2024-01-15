import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ActualizarPedido from './ActualizarPedido';
import CrearPedido from './CrearPedido';
import Pedidos from './Pedidos.jsx';
// Importa el componente DetallePedido con PascalCase
import DetallePedido from './DetallePedido.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pedidos />} />
        <Route path="/create" element={<CrearPedido />} />
        <Route path="/update/:id" element={<ActualizarPedido />} />
        {/* Utiliza PascalCase para el componente DetallePedido */}
        <Route path="/detalle/:id" element={<DetallePedido />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
