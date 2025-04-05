
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameInfo = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://jritsqmet.github.io/web-api/videojuegos.json')
      .then((response) => {
        const data = response.data.videojuegos || [];
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los juegos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando juegos...</p>;

  
  const styles = {
    container: {
      padding: '2rem',
      background: '#f4f6f9',
      minHeight: '100vh',
    },
    title: {
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '2rem',
    },
    gameCard: {
      border: '1px solid #ddd',
      padding: '1rem',
      width: '300px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      background: '#fff',
      transition: 'transform 0.3s',
    },
    gameCardHover: {
      transform: 'scale(1.05)',
    },
    gameImage: {
      width: '100%',
      borderRadius: '5px',
    },
    gameDetails: {
      marginTop: '1rem',
      color: '#555',
    },
    gameTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
    },
    gameText: {
      fontSize: '1rem',
      marginBottom: '0.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> Información de Juegos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {games.map((game) => (
          <div
            key={game.id}
            style={styles.gameCard}
            className="game-card"
            onMouseEnter={(e) => e.target.style.transform = styles.gameCardHover.transform}
            onMouseLeave={(e) => e.target.style.transform = ''}
          >
            <h3 style={styles.gameTitle}>{game.titulo}</h3>
            <img
              src={game.imagen}
              alt={game.titulo}
              style={styles.gameImage}
            />
            <div style={styles.gameDetails}>
              <p style={styles.gameText}><strong>Género:</strong> {game.genero.join(', ')}</p>
              <p style={styles.gameText}><strong>Plataforma:</strong> {game.plataforma.join(', ')}</p>
              <p style={styles.gameText}><strong>Lanzamiento:</strong> {game.lanzamiento}</p>
              <p style={styles.gameText}><strong>Desarrollador:</strong> {game.desarrollador}</p>
              <p style={styles.gameText}><strong>Precio:</strong> ${game.precio}</p>
              <p style={styles.gameText}>{game.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameInfo;
