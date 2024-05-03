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
      <header>
        <h2>Game: {game}</h2>
      </header>
      <div className="column-line">
        <button id="loadROMButton" onClick="window.loadRom()">
          Power On
        </button>
        <button id="resetNESButton" disabled onClick="window.resetNes()">
          Reset Nes
        </button>
      </div>
      <div className="row-line">
        <div id="dropzone">
          <p>press PowerOn or drop nes file.</p>
          <canvas id="gameCanvas" width="256" height="240"></canvas>
        </div>
        <div className="message-box">
          <p>message console:</p>
          <textarea id="dump" cols="96" rows="16">
            {' '}
          </textarea>
        </div>
      </div>
    </div>
  );
};

NESEmulator.propTypes = {
  game: PropTypes.string,
};

export default NESEmulator;
