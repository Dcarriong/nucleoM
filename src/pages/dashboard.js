
import React from 'react';
import PuntajeForm from '../components/dashboard/puntaje';
import Estadisticas from '../components/dashboard/estadisticas';
import GameInfo from '../components/Game/GameInfo';

const Dashboard = () => {
  return (
    <div>
      <h1>JUEGOS</h1>
      <PuntajeForm />
      <Estadisticas />
      <GameInfo />
    </div>
  );
};

export default Dashboard;
