// index.js
import { Nes } from './Nes.js';
import { Rom } from './Rom.js';
import { Audio } from './Audio.js';
import { Display } from './Display.js';
import { Joypad } from './Joypad.js';

function NesJs() {}

NesJs.Nes = Nes;
NesJs.Rom = Rom;
NesJs.Audio = Audio;
NesJs.Display = Display;
NesJs.Joypad = Joypad;

if (window !== undefined) window.NesJs = NesJs;

export { NesJs };
