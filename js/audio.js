const audioContext = new (window.AudioContext || window.webkitAudioContext)();
function playTone(digit, dur) {
    const frequencies = {
        '1': [697, 1209],
        '2': [697, 1336],
        '3': [697, 1477],
        '4': [770, 1209],
        '5': [770, 1336],
        '6': [770, 1477],
        '7': [852, 1209],
        '8': [852, 1336],
        '9': [852, 1477],
        '*': [941, 1209],
        '0': [941, 1336],
        '#': [941, 1477],
        'A': [697, 1633],
        'B': [770, 1633],
        'C': [852, 1633],
        'D': [941, 1633]
    };

    const [freq1, freq2] = frequencies[digit];

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();

    osc1.frequency.value = freq1;
    osc2.frequency.value = freq2;

    osc1.connect(audioContext.destination);
    osc2.connect(audioContext.destination);

    osc1.start();
    osc2.start();

    osc1.stop(audioContext.currentTime + dur);
    osc2.stop(audioContext.currentTime + dur);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function setAudioSource(path) {
    // Create a new buffer source
    const source = audioContext.createBufferSource();
    audio.push(source);
    console.log(audio)

    // Load audio data
    fetch(path)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            source.buffer = buffer; // Set the buffer to the source
            source.connect(audioContext.destination); // Connect to the destination
            source.start(0); // Play the audio
        })
        .catch(error => console.error('Error loading audio:', error));
}
 
async function playDTMF(sequence, toneDuration = 0.06, gap = 0.02) {
    await audioContext.resume();

    for (const digit of sequence) {
        if (digit == "h") {
            while (audio.length > 1) {
                //console.log(audio[audio.length - 1])
                audio[audio.length - 1].stop();
                audio.pop();
            }
            setAudioSource(audio[0]);
        } else if (digit == "r") {
            while (audio.length > 1) {
                //console.log(audio[audio.length - 1])
                audio[audio.length - 1].stop();
                audio.pop();
            }
            setAudioSource(`./sfx/phone/ring.mp3`);
            await sleep(getRandInt(3000) + 1500);
        } else {
            playTone(digit, toneDuration);
            await sleep((toneDuration + gap) * 1000);
        }
    }
}