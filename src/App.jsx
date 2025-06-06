import { Routes, Route } from 'react-router-dom';
import AppLayouts from './layout/AppLayouts';
import HomePage from './pages/HomePage';
import ChampionDetailPage from './pages/ChampionDetailPage';
import ComparePage from './pages/ComparePage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route element={<AppLayouts />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/champion/:id" element={<ChampionDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
