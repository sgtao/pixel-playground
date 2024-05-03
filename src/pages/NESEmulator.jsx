// pages/NESEmulator.jsx
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './NESEmulator.css';

const NESEmulator = ({ game = '' }) => {
  useEffect(() => {
    console.log(`Game ${game} selected.`);
  }, [game]);

  return (
    <div className="nes-emulator">
      <div className="emulator-screen">{/* NES emulator game screen */}</div>
      <div className="emulator-controls">{/* NES emulator controls */}</div>
    </div>
  );
};

NESEmulator.propTypes = {
  game: PropTypes.string,
};

export default NESEmulator;
