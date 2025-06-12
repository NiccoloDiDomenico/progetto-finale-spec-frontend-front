import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ChampionsProvider } from './contexts/ChampionsContext.jsx';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChampionsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChampionsProvider>
  </StrictMode>
)
