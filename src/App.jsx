import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import HotelDetailsPage from './pages/HotelDetailsPage.jsx';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels/:id" element={<HotelDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
