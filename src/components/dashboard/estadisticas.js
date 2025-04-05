import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Estadisticas = () => {
  const [user] = useAuthState(auth);
  const [estadisticas, setEstadisticas] = useState(null);
  const [historialPorJuego, setHistorialPorJuego] = useState({});

  useEffect(() => {
    if (!user) return;

    const scoresRef = ref(db, `users/${user.uid}/scores`);
    onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      let puntajeTotal = 0;
      let puntajeAlto = 0;
      const juegoMap = {};
      const historialTemp = {};

      Object.values(data).forEach((registro) => {
        const { game, score, date } = registro;
        const puntaje = Number(score);

        
        puntajeTotal += puntaje;
        if (puntaje > puntajeAlto) puntajeAlto = puntaje;

        if (!juegoMap[game]) juegoMap[game] = [];
        juegoMap[game].push(puntaje);

        
        if (!historialTemp[game]) historialTemp[game] = [];
        historialTemp[game].push({ puntaje, date });
      });

      const totalPuntajes = Object.values(juegoMap).flat().length;
      const puntajePromedio = totalPuntajes ? puntajeTotal / totalPuntajes : 0;

      let totalAcumulado = 0;
      for (const puntajes of Object.values(juegoMap)) {
        totalAcumulado += puntajes.reduce((acc, p) => acc + p, 0);
      }

      let juegoFrecuente = '';
      let maxFrecuencia = 0;
      for (const [juego, puntajes] of Object.entries(juegoMap)) {
        if (puntajes.length > maxFrecuencia) {
          maxFrecuencia = puntajes.length;
          juegoFrecuente = juego;
        }
      }

      setEstadisticas({
        puntajeTotal,
        puntajeAlto,
        puntajePromedio: parseFloat(puntajePromedio.toFixed(2)),
        totalAcumulado,
        cantidadJuegos: Object.keys(juegoMap).length,
        juegoFrecuente,
      });

      setHistorialPorJuego(historialTemp);
    });
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
  };

  const styles = {
    container: {
      padding: '2rem',
      background: 'linear-gradient(135deg, #4e73df, #1d2b64)',
      color: 'white',
      fontFamily: "'Arial', sans-serif",
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    statItem: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
    },
    statLabel: {
      fontWeight: 'bold',
      marginRight: '8px',
    },
    logoutButton: {
      marginTop: '2rem',
      padding: '10px 20px',
      backgroundColor: '#FF5733',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    historySection: {
      marginTop: '3rem',
    },
    gameHeader: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginTop: '2rem',
      color: '#FFD700',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    th: {
      border: '1px solid white',
      padding: '8px',
      textAlign: 'left',
    },
    td: {
      border: '1px solid white',
      padding: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Estadísticas Generales</h3>
      {estadisticas ? (
        <div>
          <p style={styles.statItem}><span style={styles.statLabel}>Puntaje Total:</span> {estadisticas.puntajeTotal}</p>
          <p style={styles.statItem}><span style={styles.statLabel}>Puntaje Alto:</span> {estadisticas.puntajeAlto}</p>
          <p style={styles.statItem}><span style={styles.statLabel}>Puntaje Promedio:</span> {estadisticas.puntajePromedio}</p>
          <p style={styles.statItem}><span style={styles.statLabel}>Total Acumulado:</span> {estadisticas.totalAcumulado}</p>
          <p style={styles.statItem}><span style={styles.statLabel}>Cantidad de Juegos:</span> {estadisticas.cantidadJuegos}</p>
          <p style={styles.statItem}><span style={styles.statLabel}>Juego Frecuente:</span> {estadisticas.juegoFrecuente}</p>
        </div>
      ) : (
        <p>Cargando estadísticas...</p>
      )}

      
      <div style={styles.historySection}>
        <h3 className="text-xl font-bold mb-4">Historial por juego</h3>
        {Object.entries(historialPorJuego).map(([juego, registros]) => (
          <div key={juego}>
            <h4 style={styles.gameHeader}>{juego}</h4>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Puntaje</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro, idx) => (
                  <tr key={idx}>
                    <td style={styles.td}>{registro.date}</td>
                    <td style={styles.td}>{registro.puntaje}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>
    </div>
  );
};

export default Estadisticas;
