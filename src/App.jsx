import { useState, useEffect } from 'react';
import SideMenu from './components/SideMenu.jsx';
import HomePage from './pages/HomePage.jsx';
import NESEmulator from './pages/NESEmulator.jsx';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentQuery, setCurrentQuery] = useState(
    new URLSearchParams(window.location.search).get('q'),
  );

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentQuery(new URLSearchParams(window.location.search).get('q'));
    };

    window.addEventListener('popstate', handlePathChange);
    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  return (
    <>
      <div className="app-container">
        <SideMenu />
        <main className="pages">
          {currentPath !== '/Game' && <HomePage />}
          {currentPath === '/Game' && <NESEmulator game={currentQuery} />}
        </main>
      </div>
    </>
  );
}

export default App;
