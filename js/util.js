function doResize() {
    c.width = getWidth() - 20;
    c.height = getHeight() - 40;
    cMap.width = getWidth() - 20;
    cMap.height = getHeight() - 40;
}

function getWidth() {
    // multi-browser support
    if (self.innerWidth) {
    return self.innerWidth;
    }
    if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
    }
    if (document.body) {
    return document.body.clientWidth;
    }
}

function getHeight() {
    if (self.innerHeight) {
    return self.innerHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
    }
    if (document.body) {
    return document.body.clientHeight;
    }
}

function getRandInt(i) {
    return Math.floor(Math.random() * i);
}

function scaleFont(s, f) {
    return (c.width * s) + "px " + f;                     
}

function shuffle(array) {
    let t,r,l;
    l = array.length-1;
    while (l) {
        r = Math.floor(Math.random() * l)
        t = array[r]
        array[r] = array[l];
        array[l] = t;
        l--;
    }
}

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
        if (digit == "h") {``
            setAudioSource(audio[0]);
        } else if (digit == "r") {
            setAudioSource(`./sfx/phone/ring.mp3`);
            await sleep(getRandInt(3000) + 1500);
        } else {
            playTone(digit, toneDuration);
            await sleep((toneDuration + gap) * 1000);
        }
    }
}