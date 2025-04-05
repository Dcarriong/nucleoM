
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';
import { auth } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';  

const Estadisticas = () => {
  const [user] = useAuthState(auth);
  const [datos, setDatos] = useState({});

  useEffect(() => {
    const puntajesRef = ref(db, `puntajes/${user.uid}`);
    onValue(puntajesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setDatos(data);
    });
  }, [user]);

  const calcularEstadisticas = (puntajes) => {
    const valores = Object.values(puntajes || {}).map(Number);
    const total = valores.reduce((acc, val) => acc + val, 0);
    const promedio = valores.length ? total / valores.length : 0;
    const maximo = valores.length ? Math.max(...valores) : 0;
    return { total, promedio, maximo };
  };

  const handleLogout = () => {
    signOut(auth);  
  };


  const styles = {
    container: {
      padding: '2rem',
      background: 'linear-gradient(135deg, #4e73df, #1d2b64)',
      minHeight: '50vh',
      color: 'white',
      fontFamily: "'Arial', sans-serif",
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    statsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      justifyContent: 'center',
    },
    gameCard: {
      background: 'rgba(255, 255, 255, 0.2)',
      padding: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
      width: '250px',
      textAlign: 'center',
    },
    gameTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#FFD700',
    },
    stats: {
      fontSize: '1.2rem',
      marginBottom: '0.8rem',
    },
    statLabel: {
      fontWeight: 'bold',
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
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Estadísticas</h3>
      <div style={styles.statsWrapper}>
        {Object.entries(datos).map(([juego, puntajes]) => {
          const valores = Object.values(puntajes);
          const { total, promedio, maximo } = calcularEstadisticas(valores);
          return (
            <div key={juego} style={styles.gameCard}>
              <h4 style={styles.gameTitle}>{juego}</h4>
              <p style={styles.stats}>
                <span style={styles.statLabel}>Total:</span> {total}
              </p>
              <p style={styles.stats}>
                <span style={styles.statLabel}>Promedio:</span> {promedio.toFixed(2)}
              </p>
              <p style={styles.stats}>
                <span style={styles.statLabel}>Máximo:</span> {maximo}
              </p>
            </div>
          );
        })}
      </div>
      <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>
    </div>
  );
};

export default Estadisticas;
