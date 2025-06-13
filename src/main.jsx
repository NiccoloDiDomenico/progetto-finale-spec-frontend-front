import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ChampionsProvider } from './contexts/ChampionsContext.jsx';
import { CompareProvider } from './contexts/CompareContext.jsx';
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChampionsProvider>
      <CompareProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FavoritesProvider>
      </CompareProvider>
    </ChampionsProvider>
  </StrictMode>
)
