// import { useState } from 'react';
import SideMenu from './components/SideMenu.jsx';
import HomePage from './pages/HomePage.jsx';
import NESEmulator from './pages/NESEmulator.jsx';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="app-container">
        <SideMenu />
        <main>
          <HomePage />
          <NESEmulator />
        </main>
      </div>
    </>
  );
}

export default App;
