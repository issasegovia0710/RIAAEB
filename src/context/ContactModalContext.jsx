// frontend/src/context/ContactModalContext.jsx
import { createContext, useContext, useState } from 'react';
import ContactModal from '../components/ContactModal.jsx';

const Ctx = createContext({ open: () => {}, close: () => {} });
export const useContactModal = () => useContext(Ctx);

export function ContactModalProvider({ children }) {
  const [abierto, setAbierto] = useState(false);
  const open = () => setAbierto(true);
  const close = () => setAbierto(false);
  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <ContactModal open={abierto} onClose={close} />
    </Ctx.Provider>
  );
}
