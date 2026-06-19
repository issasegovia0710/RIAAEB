// frontend/src/admin/AdminApp.jsx
import { useState } from 'react';
import { isLogged, clearToken } from '../lib/api.js';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

export default function AdminApp() {
  const [logged, setLogged] = useState(isLogged());
  const salir = () => { clearToken(); setLogged(false); };
  return (
    <div className="admin-shell">
      {logged ? <Dashboard onLogout={salir} /> : <Login onLogin={() => setLogged(true)} />}
    </div>
  );
}
