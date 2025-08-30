import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Inicio from './pages/inicio.jsx';
import Encabezado from './pages/encabezado.jsx';
import Repartos from './pages/repartos.jsx';

function AppContent() {

    return (
        <>
        <Encabezado />
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/inicio" replace />} />
                <Route path="/inicio" element={<Inicio />} /> 
                <Route path="/repartos" element={<Repartos />} />
                <Route path="*" element={<Navigate to="/inicio" replace/> } />
            </Routes>
        </div> 
        </>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
    );
}

export default App;
