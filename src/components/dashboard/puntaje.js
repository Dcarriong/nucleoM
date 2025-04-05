import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db, auth } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Puntaje = () => {
  const [juego, setJuego] = useState('');
  const [puntaje, setPuntaje] = useState('');
  const [fecha, setFecha] = useState('');
  const [user] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert('Debes iniciar sesión');
    if (juego.length > 100) return alert('El nombre no es valido');
    const puntuacion = parseInt(puntaje);
    if (isNaN(puntuacion) || puntuacion < 0 || puntuacion > 999999) {
      return alert('La puntuación es exagerada');
    }

    const scoreData = {
      game: juego,
      score: puntuacion,
      date: fecha || new Date().toISOString().split('T')[0] 
    };

    const scoreRef = ref(db, `users/${user.uid}/scores`);
    await push(scoreRef, scoreData);

    alert(' Puntaje guardado correctamente');
    setJuego('');
    setPuntaje('');
    setFecha('');
  };

  const styles = {
    formContainer: {
      padding: '2rem',
      background: 'linear-gradient(135deg,rgb(220, 79, 206),rgb(119, 32, 136))',
      borderRadius: '8px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
      color: '#fff',
      maxWidth: '400px',
      margin: 'auto',
    },
    formTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      margin: '0.8rem 0',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      outline: 'none',
      background: 'rgba(255, 255, 255, 0.8)',
    },
    button: {
      width: '100%',
      padding: '1rem',
      background: '#4e73df',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '1.2rem',
      cursor: 'pointer',
      transition: '0.3s',
    },
    buttonHover: {
      background: '#3a5ac0',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h3 style={styles.formTitle}>Registrar Puntaje</h3>
      <input
        type="text"
        placeholder="Nombre del juego"
        value={juego}
        onChange={(e) => setJuego(e.target.value)}
        required
        style={styles.input}
        maxLength={100}
      />
      <input
        type="number"
        placeholder="Puntaje"
        value={puntaje}
        onChange={(e) => setPuntaje(e.target.value)}
        required
        style={styles.input}
        min={0}
        max={999999}
      />
      <input
        type="date"
        placeholder="Fecha (opcional)"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        style={styles.input}
      />
      <button
        type="submit"
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
        onMouseLeave={(e) => (e.target.style.background = '#4e73df')}
      >
        Guardar
      </button>
    </form>
  );
};

export default Puntaje;
