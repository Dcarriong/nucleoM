import { ref, push } from 'firebase/database';
import { database } from '../firebase/config';

export const saveScore = async (userId, game, score, date = null) => {
  if (!userId) throw new Error('userId requerido');
  if (!game || game.length > 100) throw new Error('Nombre del juego inválido');
  if (typeof score !== 'number' || score < 0 || score > 999999) throw new Error('Puntaje fuera de rango');

  const scoreData = {
    game,
    score,
    date: date ?? new Date().toISOString().split('T')[0] 
  };

  const userScoresRef = ref(database, `users/${userId}/scores`);
  await push(userScoresRef, scoreData); 
};
