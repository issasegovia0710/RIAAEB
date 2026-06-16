// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { ContactModalProvider } from './context/ContactModalContext.jsx';
import Home from './Home.jsx';
import AdminApp from './admin/AdminApp.jsx';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ContactModalProvider>
            <Home />
          </ContactModalProvider>
        }
      />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}
