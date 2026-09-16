function doResize() {
    let w = getBrowserWidth()// - 20;
    let h = getBrowserHeight()// - 40;
    c.width = w;
    c.height = h;
    cMap.width = w;
    cMap.height = h;
    cMarkers.width = w;
    cMarkers.height = h;
    cCards.width = w;
    cCards.height = h;
    
    mapXOff = getWidth()/3 * 2;
    mapYOff = getHeight()/2;
    mapSteps = 0;
    mapInc = 0;
    mapCitiesSteps = 0;
    mapNodeSteps = 0;
    mapNodeStackSteps = 0;
}

function getBrowserWidth() {
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

function getBrowserHeight() {
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

function getWidth() {
    return c.width;
}

function getHeight() {
    return c.height;
}

function getRandInt(i) {
    // non-inclusive i = 100 is 0-99
    return Math.floor(Math.random() * i);
}

function scaleFont(s, f, clamp = 999) {
    const size = Math.min(mapScale * s, clamp);
    return size + "px " + f;
}

function scaledFontSize(s, clamp = 999) {
    return Math.min(mapScale * s, clamp);
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
            //console.log('Speech has finished after ' + event.elapsedTime + ' seconds.');
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

function createJSON(data, filename, mimeType = "application/json") {
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

function drawFSProgress(current, total, num = 0) {

    const width = 400;
    const height = 30;
    const x = 20;
    const y = 10 + (num * 40);

    const progress = current / total;

    // Background
    ctx.fillStyle = "#222";
    ctx.fillRect(x, y, width, height);

    // Progress
    ctx.fillStyle = "#03a903";
    ctx.fillRect(
        x,
        y,
        width * progress,
        height
    );

    ctx.save();
    // Text
    ctx.fillStyle = "#fff";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let str;
    switch (num) {
        case 0:
            str = `Loading game data: ${current}/${total}`
            break;
        case 1:
            str = `Populating email data: ${current}/${total}`
            break;
    }

    ctx.fillText(
        str,
        x + width / 2,
        y + height / 2
    );
    ctx.restore();
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function generateIPs(count = 10_000) {
  const ips = new Set();

  // Ranges that should not be generated for fake WAN addresses.
  const reserved = [
    [0, 0, 0, 255],       // 0.0.0.0/8
    [10, 0, 0, 255],      // 10.0.0.0/8
    [100, 64, 0, 255],    // 100.64.0.0/10
    [127, 0, 0, 255],     // 127.0.0.0/8
    [169, 254, 0, 255],   // 169.254.0.0/16
    [172, 16, 31, 255],   // 172.16.0.0/12
    [192, 0, 0, 255],     // 192.0.0.0/24
    [192, 0, 2, 255],     // TEST-NET-1
    [192, 168, 0, 255],   // 192.168.0.0/16
    [198, 18, 19, 255],   // benchmark networks
    [198, 51, 100, 255],  // TEST-NET-2
    [203, 0, 113, 255],   // TEST-NET-3
    [224, 0, 0, 255],     // multicast+
  ];

  function isReserved(a, b, c) {
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a === 224 ||
      a >= 240 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19 || b === 51)) ||
      (a === 203 && b === 0)
    );
  }

  while (ips.size < count) {
    const a = 1 + Math.floor(Math.random() * 223);
    const b = Math.floor(Math.random() * 256);
    const c = Math.floor(Math.random() * 256);
    const d = Math.floor(Math.random() * 256);

    if (!isReserved(a, b, c)) {
      ips.add(`${a}.${b}.${c}.${d}`);
    }
    if (ips.size % 100 == 0) {
        //console.log(ips.size)
    }
  }

  return [...ips];
}

function bounce(n) {
  const speed = Number(player.cWonSpeed) || 1;
  const width = getWidth();
  const height = getHeight();

  if (!n.bounce) {
    n.x1 = Number(n.x1) || 0;
    n.y1 = Number(n.y1) || 0;

    n.bounce = {
      // Constant horizontal velocity for this card.
      vx: (Math.random() < 0.5 ? -1 : 1) * speed,

      // Initial upward velocity.
      vy: -(7 + Math.random() * 5),

      // Gravity.
      gravity: 0.30
    };
  }

  const b = n.bounce;

  // Vertical physics
  b.vy += b.gravity;
  n.y1 += b.vy;

  // Constant horizontal motion
  n.x1 += b.vx;

  // Card's bottom hits the bottom of the screen.
  const floor = height - n.yH;

  if (n.y1 >= floor) {
    n.y1 = floor;

    // Bounce upward, losing vertical energy.
    b.vy = -Math.abs(b.vy) * 0.68;
  }
}