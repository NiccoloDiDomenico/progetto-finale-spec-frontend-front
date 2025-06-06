import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayouts from './layouts/AppLayouts';
import HomePage from './pages/HomePage';
import ChampionsDetailPage from './pages/ChampionsDetailPage';
import ComparePage from './pages/ComparePage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayouts />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/champion/:id" element={<ChampionsDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
