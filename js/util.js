function doResize() {
    c.width = getWidth() - 20;
    c.height = getHeight() - 40;
    cMap.width = getWidth() - 20;
    cMap.height = getHeight() - 40;
    mapXOff = getWidth()/3 * 2;
    mapYOff = getHeight()/2;
    mapSteps = 0;
    mapInc = 0;
    mapCitiesSteps = 0;
    mapNodeSteps = 0;
    mapNodeStackSteps = 0;
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

function speak(text, queue = 0, voice = 0) {
    if (!queue) {
        window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    utterance.onend = function(event) {
        if (debug) {
            console.log('Speech has finished after ' + event.elapsedTime + ' seconds.');
        }
    };
    
    // Set voice
    if (voices.length > voice) {
        utterance.voice = voices[voice];
    } else {
        console.log('selected voice not available');
    }
    window.speechSynthesis.speak(utterance);
}

function createJSON(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}