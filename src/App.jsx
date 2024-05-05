import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideMenu from './components/SideMenu.jsx';
import HomePage from './pages/HomePage.jsx';
import NESEmulator from './pages/NESEmulator.jsx';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);
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

  // 次のサイトを参考にReact-Router-v6を実装
  // https://ralacode.com/blog/post/how-to-use-react-router/ 
  return (
    <>
      <BrowserRouter >
        <div className="app-container">
          <SideMenu />
          <main className="pages">
            <Routes>
              <Route path={`/Home`} element={<HomePage />} />
              <Route path={`/Game`} element={<NESEmulator game={currentQuery} />} />
              <Route path={`/`} element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
