import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

export default function AppShell() {
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

