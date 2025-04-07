
// script.js
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const notes = [
    { note: 'C', freq: 261.63 }, { note: 'C#', freq: 277.18, black: true },
    { note: 'D', freq: 293.66 }, { note: 'D#', freq: 311.13, black: true },
    { note: 'E', freq: 329.63 }, { note: 'F', freq: 349.23 },
    { note: 'F#', freq: 369.99, black: true }, { note: 'G', freq: 392.00 },
    { note: 'G#', freq: 415.30, black: true }, { note: 'A', freq: 440.00 },
    { note: 'A#', freq: 466.16, black: true }, { note: 'B', freq: 493.88 },
    { note: 'C2', freq: 523.25 }
];
const piano = document.getElementById('piano');
function createKey(noteObj) {
    const key = document.createElement('div');
    key.classList.add('key');
    if (noteObj.black) key.classList.add('black');
    key.textContent = noteObj.note;
    key.addEventListener('mousedown', () => playSound(noteObj.freq));
    key.addEventListener('mouseup', stopSound);
    piano.appendChild(key);
}
notes.forEach(note => createKey(note));
let oscillator, gainNode;
function playSound(freq) {
    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    oscillator.type = document.getElementById('waveform').value;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(parseFloat(document.getElementById('sustain').value), audioCtx.currentTime + parseFloat(document.getElementById('attack').value));
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + parseFloat(document.getElementById('attack').value) + parseFloat(document.getElementById('decay').value));
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
}
function stopSound() {
    if (oscillator) {
        oscillator.stop(audioCtx.currentTime + 0.1);
    }
}
