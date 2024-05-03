// pages/NESEmulator.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NesJs } from '@/libs/nes-js/index.js';
import './NESEmulator.css';

const NESEmulator = ({ game = '' }) => {
  // nes : NesJs Object
  var nes = new NesJs.Nes();
  const [dumpMessage, setDumpMessage] = useState('');
  const [gameName, setGameName] = useState('');
  /**
   *
   */
  function putMessage(str) {
    console.log(`msg:${str}`);
    const prevMessage = dumpMessage;
    setDumpMessage(prevMessage + str + '\n');
    const area = document.getElementById('dump');
    // area.firstChild.appendData(str + '\n');
    area.scrollTop = area.scrollHeight;
  }
  /**
   *
   */
  const powerOn = () => {
    const url = `/roms/${gameName}.nes`;

    putMessage('Loading rom image...');
    document.getElementById('powerOnButton').disabled = true;
    document.getElementById('resetNesButton').disabled = false;

    fetch(url, { method: 'GET', responseType: 'arraybuffer' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        putMessage('Loading done.');
        run(buffer);
      })
      .catch((error) => {
        putMessage('failed to load.');
        console.error('Error:', error);
      });
  };
  /**
   *
   */
  const resetNes = () => {
    nes.reset();
  };
  /**
   * init: Initialize the NES emulator
   */
  const run = (buffer) => {
    var rom;
    try {
      rom = new NesJs.Rom(buffer);
    } catch (e) {
      putMessage('');
      putMessage(e.toString());
      return;
    }
    putMessage('');
    putMessage('Rom Header info');
    putMessage(rom.header.dump());

    nes.setRom(rom);

    nes.setDisplay(new NesJs.Display(document.getElementById('gameCanvas')));

    try {
      nes.setAudio(new NesJs.Audio());
    } catch (e) {
      putMessage('');
      putMessage(
        'Disables audio because this browser does not seems to support WebAudio.',
      );
    }

    window.onkeydown = function (e) {
      nes.handleKeyDown(e);
    };
    window.onkeyup = function (e) {
      nes.handleKeyUp(e);
    };

    putMessage('');

    putMessage('bootup.');
    nes.bootup();

    putMessage('runs.');
    // NESran();
    nes.run();
  };

  useEffect(() => {
    console.log(`Game ${game} selected.`);
    setGameName(game);
    function droppedFile(file) {
      // 拡張子のチェック
      if (!file.name.endsWith('.nes')) {
        setGameName('dropped file is not .nes extension');
        return;
      }

      // ファイルをロードする処理を記述する
      putMessage(`load "${file.name}" file.`);
      setGameName(file.name.replace('.nes', ''));
      document.getElementById('powerOnButton').disabled = true;
      document.getElementById('resetNesButton').disabled = false;

      // ファイルをArrayBufferとして読み込む
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result;
        console.log(
          `ファイル "${file.name}" をArrayBufferとしてロードしました。`,
        );
        // ArrayBufferを使って何かの処理を行う
        run(arrayBuffer);
      };
      fileReader.onerror = () => {
        console.error(`ファイル "${file.name}" のロードに失敗しました。`);
      };
      fileReader.readAsArrayBuffer(file);
    }
    /**
     *  FileDropでNES Romを読み込む
     */
    const dropzone = document.getElementById('dropzone');
    dropzone.addEventListener('dragover', (event) => {
      event.preventDefault(); // ブラウザのデフォルトの動作をキャンセル
      event.dataTransfer.dropEffect = 'copy'; // ドロップ時の動作を指定
      // ドロップゾーンにdropoverクラスを追加
      dropzone.classList.add('dropover');
    });
    dropzone.addEventListener('dragleave', (event) => {
      event.preventDefault(); // ブラウザのデフォルトの動作をキャンセル
      // ドロップゾーンからドラッグアイテムが離れたら、dropoverクラスを削除
      dropzone.classList.remove('dropover');
    });
    dropzone.addEventListener('drop', (event) => {
      event.preventDefault(); // ブラウザのデフォルトの動作をキャンセル
      dropzone.classList.remove('dropover');

      const files = event.dataTransfer.files;
      for (const file of files) {
        console.log(`ドロップされたファイル: ${file.name}`);
        // ファイルの処理を行う
        droppedFile(file);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  return (
    <div className="nes-emulator">
      <header>
        <h2>Game: {gameName}</h2>
      </header>
      <div className="column-line">
        <button id="powerOnButton" onClick={powerOn}>
          Power On
        </button>
        <button id="resetNesButton" onClick={resetNes}>
          Reset Nes
        </button>
      </div>
      <div className="row-line">
        <div id="dropzone">
          <p>press PowerOn or drop nes file.</p>
          <canvas id="gameCanvas" width="256" height="240"></canvas>
        </div>
        <div className="message-box">
          <p>1P Control: cursor + B=z, A=x, Select=space, Start=enter</p>
          <p>message console:</p>
          <textarea
            id="dump"
            cols="96"
            rows="16"
            readOnly
            value={dumpMessage}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

NESEmulator.propTypes = {
  game: PropTypes.string,
};

export default NESEmulator;
