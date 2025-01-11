import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { RandomNamePicker } from './pages/tools/RandomNamePicker';
import { VennDiagram } from './pages/tools/VennDiagram';

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools">
            <Route path="random-name-picker" element={<RandomNamePicker />} />
            <Route path="venn-diagram" element={<VennDiagram />} />
            {/* Add more tool routes here */}
          </Route>
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;