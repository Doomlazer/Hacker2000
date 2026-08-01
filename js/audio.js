const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();

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

function setAudioSource(path, array = phoneAudio) {
    // Create a new buffer source
    const source = audioContext.createBufferSource();
    array.push(source);

    // Load audio data
    fetch(path)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            source.buffer = buffer; // Set the buffer to the source
            source.connect(audioContext.destination); // Connect to the destination
            source.start(0); // Play the audio
            source.addEventListener("ended", (e) => {
                if (player.musicOn && array == backgroundMusic) {
                    playMusic();
                }
                console.log(`Audio has finished playing. array is ${array}`);
            });
        })
        .catch(error => console.error('Error loading audio:', error));
}

function playMusic(window) {
    //let path = `./sfx/music/stub.mp3`;
    let sources = [];
    sources.push(`https://archive.org/download/raveforce1-jungle-breakcore/Dmachine%20-%20Condiments%20of%20the%20Darkside.%20Jungle%20%26%20Breakcore%20Mix%20Heavy%20Amen%20subwoofer%20excurison-yVLXI-m70lQ.mp3`);
    sources.push("https://archive.org/download/raveforce1-jungle-breakcore/%5B%20JUNGLE_BREAKCORE%20%5D%20_%20JAMIN%20NIMJAH%20_%20ERROR404%20VISUAL%20MIX%20_%20002-kyXx-nGxqpQ.mp3");
    sources.push("https://archive.org/download/raveforce1-jungle-breakcore/%5BMachineKool%5D%202%20Hour%20Dark%20DnB%20to%20Jungle%20%2C%20Breakcore%20Mix%20%5BMachinekool%5D%202014%202hr-Xj9Hvmspej8.mp3");
    sources.push("https://archive.org/download/raveforce1-sextrancemix/%5B2022%5D%20Exodia%20-%20Valkyria-fd6ZF1UJ9oM.mp3");
    sources.push("https://archive.org/download/raveforce1-sextrancemix/%5B2022%5D%20Sextrance%20Worldwide%20Sampler%20CD-OcLYYqKOCxM.mp3");
    sources.push("https://archive.org/download/raveforce1-sextrancemix/%5B2022%5D%20isyti%20-%20bootleg-AURcBIKXRX0.mp3");
    sources.push("https://archive.org/download/raveforce1-sextrancemix/%5B2022%5D%20sienna%20sleep%20-%20live%20dj%20set%20for%20sextrance%20worldwide-zdQgbjgucwI.mp3");
    sources.push("https://archive.org/download/raveforce1-sextrancemix/%5B2022%5D%20sienna%20sleep%20-%20live%20dj%20set%20for%20sextrance%20worldwide-zdQgbjgucwI.mp3");
    sources.push("https://archive.org/download/selected-dnb-1/Inner-Vation%20-%20Movements%20%281999%29-DU3Rezgt-TE.mp3");
    sources.push("https://archive.org/download/selected-dnb-1/Intelligent%20Drum%20%26%20Bass%20-%20Selected%20Works%20%281994-2000%29-1zGaTE2AmsU.mp3");
    sources.push("https://archive.org/download/selected-dnb-1/Jungle%20Mix%20-%20psiX%20-%20Room%2099-lfcehfutGBM.mp3");
    sources.push("https://archive.org/download/selected-dnb-1/Peshay%20Studio%20Set%20%281996%29-JK8ilaPZbKE.mp3");
    sources.push("https://archive.org/download/rf1-jumpstylemix-1/DJ%20GYROTTA%20ZAO%20-%20%E2%96%AF%E2%96%AF%20%5BXLeQxa2JzZw%5D.mp3");
    sources.push("https://archive.org/download/rf1-jumpstylemix-1/DJ%20Gyrotta%20Zao%20%E2%A7%B8%20Yabujin%20Hardstyle%20Mix%20%5BREUPLOAD%5D%20%5BZ75ExkXdK8Y%5D.mp3");
    sources.push("https://archive.org/download/rf1-jumpstylemix-1/Jumpy%20J%20-%20Retro%20Jumpstyle%20Mix%202020%20%5BY-Noo46Nugw%5D.mp3");
    sources.push("https://archive.org/download/rf1-jumpstylemix-1/The%20Ultimate%20Jumpstyle%20Mix%20%EF%BD%9C%201%20Hour%20%5BHD%5D%20%5BhuzxmF_SsNE%5D.mp3");
    sources.push("https://archive.org/download/rf1-jumpstylemix-1/%5B2021%5D%20%F0%9D%94%87%F0%9D%94%8D%206YR%E0%B0%A5%E0%B1%8D%E2%80%8C%D9%A3%D9%A3A%20%D0%97%D0%90%D0%9E%20-%20NATUREPISTOLS2009%20%5BDELETED%5D%20%5B7EWYXiuiA-w%5D.mp3");
    sources.push("https://archive.org/download/rf1-jumpstylemix-1/djocore%20-%20jumpstyle%20classic%20mix%202021%20%5BTfq7WKY3vBA%5D.mp3");
    sources.push("https://archive.org/download/rf1-jumpstylemix-1/patrick%20jumpen%20-%20top%2010%20jumpstyle%20%5Bqg4nFzb0iSU%5D.mp3");
    sources.push("https://archive.org/download/rf1-jumpstylemix-1/%F0%9D%94%87%F0%9D%94%8D%206YR%E0%B0%A5%E0%B1%8D%E2%80%8C%D9%A3%D9%A3A%20%D0%97%D0%90%D0%9E%20%26%20Y%20A%20B%20H%20I%20E%20L%20-%20JUMPSTYLE%20CRAZYMIX%20VOL.01%20%5BKgpuXb6vDvk%5D.mp3");
    let r = getRandInt(sources.length-1);
    window.setText(sources[r]);
    setAudioSource(sources[r], backgroundMusic);
    gainNode.gain.value = 0.1; // setting it to 10%
    //gainNode.connect(backgroundMusic);
    return r;
}
 
async function playDTMF(sequence, toneDuration = 0.06, gap = 0.02) {
    await audioContext.resume();

    for (const digit of sequence) {
        if (digit == "h") {
            while (phoneAudio.length > 1) {
                //console.log(audio[audio.length - 1])
                phoneAudio[phoneAudio.length - 1].stop();
                phoneAudio.pop();
            }
            setAudioSource(phoneAudio[0], phoneAudio);
        } else if (digit == "r") {
            while (phoneAudio.length > 1) {
                //console.log(audio[audio.length - 1])
                phoneAudio[phoneAudio.length - 1].stop();
                phoneAudio.pop();
            }
            setAudioSource(`./sfx/phone/ring.mp3`, phoneAudio);
            await sleep(getRandInt(3000) + 1500);
        } else {
            playTone(digit, toneDuration);
            await sleep((toneDuration + gap) * 1000);
        }
    }
}

