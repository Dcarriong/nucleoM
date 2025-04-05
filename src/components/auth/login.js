
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Correo electronico invalido.');
      return;
    }
  
    
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };
  

 
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #4e73df, #1d2b64)', 
      fontFamily: "'Arial', sans-serif",
    },
    formBox: {
      background: 'rgba(255, 255, 255, 0.9)', 
      padding: '2rem 3rem',
      borderRadius: '15px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '1rem',
      margin: '0.75rem 0',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#1d2b64', 
    },
    button: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#1d2b64',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#16204d', 
    },
    registerLink: {
      marginTop: '1rem',
      fontSize: '0.9rem',
      color: '#333',
    },
    registerAnchor: {
      color: '#1d2b64',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    registerAnchorHover: {
      textDecoration: 'underline', 
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.formBox} onSubmit={handleLogin}>
        <h2 style={styles.title}> Iniciar Sesión</h2>
        <input
          style={styles.input}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">
          Ingresar
        </button>
        <p style={styles.registerLink}>
          ¿No tienes cuenta?{' '}
          <a href="/register" style={styles.registerAnchor}>
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
