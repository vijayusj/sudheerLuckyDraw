import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Head from '../pages/Head';
import Spin from '../pages/Spin';
import LuckyDraw from '../pages/LuckyDraw';
import Circket from '../pages/Circket';
import Auth from '../pages/Auth';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Head />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/spin" element={<Spin />} />
      <Route path="/luckyDraw" element={<LuckyDraw />} />
      <Route path="/circket" element={<Circket />} />
      <Route path="/login" element={<Auth />} />
    </Routes>
  );
};

export default Routers;
