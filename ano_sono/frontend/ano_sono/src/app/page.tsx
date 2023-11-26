'use client';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './components/HomePage';
import { NavBar } from './components/NavBar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <HomePage />
      <Footer />
    </Router>
  );
};

export default App;