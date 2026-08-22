let mouseX = 0,
mouseY = 0,
mouseDownX = 0.
mouseDownY = 0,
oldOffX = 0;
oldOffY = 0;
mouseUnclaimed = false;
mouseDown = false;
mouseDetail = 0;


function doWheel(e) {
    let adjustedWindow = false;
    // scale the cast member if mouse hover
    // but if windows overlap at mouse X/Y, only do the top most (pri 0)
    let s = cast.toSorted((a, b) => a.pri - a.pri);
    for (let w = 0; w < s.length; w ++) {
        let c = s[w];
        if (mouseX > c.x1 &&
            mouseX < c.x1 + c.xW &&
            mouseY > c.y1 &&
            mouseY < c.y1 + c.yH &&
            !adjustedWindow) {

            adjustedWindow = true;

            /*if (c.type == "proxy" || c.type == "reader" || c.type == "browser") {
                c.wheelOff += e.deltaY;
                //console.log(`wheelOff ; ${c.wheelOff} ${c.type}`)
            } else {
                // scale w and h by vertical scroll amount
                c.xW -= e.deltaY;
                c.yH -= e.deltaY;
                c.xP -= e.deltaY;
                c.yP -= e.deltaY;
            }*/

            // to do: I've disabled window resizing with 
            // the mouse wheel, need do corner drag resizing
            c.wheelOff += e.deltaY;

            // set max
            c.textMaxLines = Math.floor(c.yH / (c.fontSize * 1.25));
    
            // clear
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, c.width, c.height);
            // clear
            ctxMap.fillStyle = '#000000';
            ctxMap.fillRect(0, 0, c.width, c.height);
            // clear
            ctxMarkers.fillStyle = '#000000';
            ctxMarkers.fillRect(0, 0, c.width, c.height);
        }
    }
    // otherwise scale the map
    if (!adjustedWindow) {
        // zoom map at mouse position
        const oldScale = mapScale;
        mapScale -= e.deltaY / 100;
        mapScale = Math.max(0.1, mapScale);
        const ratio = mapScale / oldScale;
        mapXOff = mouseX - (mouseX - mapXOff) * ratio;
        mapYOff = mouseY - (mouseY - mapYOff) * ratio;
        // limit map reduction
        if (mapScale < 1) {
            mapScale = 1;
        }

        mapSteps = 0;
        mapInc = 0;
        mapCitiesSteps = 0;
        mapNodeSteps = 0;
        mapNodeStackSteps = 0;
        drawMap();
    }
}

function doMouseMove(e) {
    let adjustedWindow = false;
    mouseX = e.x - 10; // - 2
    mouseY = e.y - 25;// -17
    mouseDetail = e.detail;
    if (mouseDown) {
        if (!movingMap) {
            // drag windows
            for (let w = 0; w < cast.length; w ++) {
                let c = cast[w];
                if (c.mouseDrag) { // moving this window
                    adjustedWindow = true;
                    if (c.resizing) {
                            c.xW = c.resizeStartW + (mouseX - c.resizeStartX);
                            c.yH = c.resizeStartH + (mouseY - c.resizeStartY);
                            c.xP = c.xW;
                            c.yP = c.yH;

                            c.xW = Math.max(c.xW, 100);
                            c.yH = Math.max(c.yH, 100);

                            if (c.type == "proxy") {
                                cast[0].pXW = c.xW;
                                cast[0].pYH = c.yH;
                            }
                            if (c.type == "reader") {
                                cast[0].rXW = c.xW;
                                cast[0].rYH = c.yH;
                            }

                            //re wrap text
                            // Set font and text color
                            ctx.fillStyle = c.textColor;
                            ctx.font = c.fontSize + "px " + c.textFont;
                            c.text = c.displayLines.join("\n");
                            c.displayLines = [];
                            if (c.type == "reader") {
                                c.setText(c.originalText, false);
                            } else {
                                c.setText(c.text, false);
                            }
                    } else {
                        c.x1 = mouseX + oldOffX;
                        c.y1 = mouseY + oldOffY;

                        // save the updated proxy and reader windows loc so
                        // they respawn where the user closed them
                        if (c.type == "proxy") {
                            cast[0].pX1 = c.x1;
                            cast[0].pY1 = c.y1;
                        }
                        if (c.type == "reader") {
                            cast[0].rX1 = c.x1;
                            cast[0].rY1 = c.y1;
                        }
                    }

                    // clear
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, c.width, c.height);
                    // clear
                    ctxMap.fillStyle = '#000000';
                    ctxMap.fillRect(0, 0, c.width, c.height);
                    // clear
                    ctxMarkers.fillStyle = '#000000';
                    ctxMarkers.fillRect(0, 0, c.width, c.height);
                }
            }
        }

        // drag map
        if (!adjustedWindow) {
            mapXOff = oldOffX - ((mouseDownX - mouseX));
            mapYOff = oldOffY - ((mouseDownY - mouseY));
            mapSteps = 0;
            mapInc = 0;
            mapCitiesSteps = 0;
            mapNodeSteps = 0;
            mapNodeStackSteps = 0;
            drawMap();
        }
    }
}

function doClick(e) {
    mouseUnclaimed = true;
    for (let i = 0; i < cast.length; i++) {
        if (cast[i].contains(mouseX, mouseY) && mouseUnclaimed) {
            //console.log(`contains ${this}`);
            cast[i].clickHandler(e);
        }
    }
}

function doMouseDown(e) {
    e.preventDefault();
    movingMap = false;
    mouseDown = true;
    mouseDetail = e.detail;
    let notFound = true;

    let s = cast.toSorted((a, b) => a.pri - b.pri);
    for (let w = 0; w < s.length; w++) {
        let c = s[w];
        if (mouseX > c.x1 &&
            mouseX < c.x1 + c.xW &&
            mouseY > c.y1 &&
            mouseY < c.y1 + c.yH) {

            notFound = false;
            oldOffX = c.x1 - mouseX;
            oldOffY = c.y1 - mouseY;

            c.mouseDrag = true;
            // draw this window on top now
            if (c.pri != 0) {
                c.pri = cast.length; // set max pri
                // downgrade the others
                for (let i = 0; i < cast.length; i++) {
                    if (cast.indexOf(c) != i) {
                        cast[i].pri --;
                        cast[i].mouseDrag = false;
                    }
                }
            }

            // check if resizing instead of dragging
            if (mouseX > c.x1 + c.xW - 20 &&
                    mouseX < c.x1 + c.xW &&
                    mouseY > c.y1 + c.yH - 20 &&
                    mouseY < c.y1 + c.yH) { 
                        c.resizing = true;
                        c.resizeStartX = mouseX;
                        c.resizeStartY = mouseY;
                        c.resizeStartW = c.xW;
                        c.resizeStartH = c.yH;
            } else {
                c.resizing = false;
            }

            // audio player buttons
            if (c.type == "audio") {
                const bar = c.progressBar;

                if (
                    mouseX >= bar.x &&
                    mouseX <= bar.x + bar.w &&
                    mouseY >= bar.y &&
                    mouseY <= bar.y + bar.h
                ) {
                    const audio = backgroundMusic[0].audio;

                    if (audio.duration && !isNaN(audio.duration)) {
                        const percent = (mouseX - bar.x) / bar.w;

                        audio.currentTime =
                            percent * audio.duration;
                    }
                }
                // audio controls    
                for (const button of c.audioButtons) {

                    if (
                        mouseX >= button.x &&
                        mouseX <= button.x + button.w &&
                        mouseY >= button.y &&
                        mouseY <= button.y + button.h
                    ) {
                        handleAudioButton(button.action);
                        break;
                    }
                }
            }

            drawMap();
        }
    }
    if (notFound) {
        movingMap = true;
        oldOffX = mapXOff;
        oldOffY = mapYOff;
        mouseDownX = mouseX;
        mouseDownY = mouseY;
        drawMap();
    }
}

function doMouseUp(e) {
    mouseDown = false;
    movingMouse = false;
    movingMap = false;
    mouseDetail = e.detail;
    //mapScale = 4
    mouseDownX = 0;
    mouseDownY = 0;
    for (let w = 0; w < cast.length; w++) {
        let s = cast[w];
        s.mouseDrag = false;
        s.resizing = false;
    }
    drawMap();
}

function doKeyDown(e) {
    for (let i = 0; i < cast.length; i++) {
        // dont add v when pasting data
        if ((e.metaKey || e.ctrlKey) && e.code === "KeyV") {
            return;
        }
        if (cast[i].acceptInput) {
            cast[i].keyHandler(e);
        }
    }
}

function handleAudioButton(button) {
    const audio = backgroundMusic[0].audio;

    switch (button) {

        case 0: // previous
            player.audioTrack --;
            if (player.audioTrack < 0) {
                player.audioTrack = player.audioPlaylist.length - 1;
            }
            setAudioSource(player.audioPlaylist[player.audioTrack], backgroundMusic);
            break;

        case 1: // play/pause
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            break;

        case 2: // stop
            audio.pause();
            audio.currentTime = 0;
            break;

        case 3: // next
            player.audioTrack ++;
            if (player.audioTrack > player.audioPlaylist.length-1) {
                player.audioTrack = 0;
            }
            setAudioSource(player.audioPlaylist[player.audioTrack], backgroundMusic);
            break;
    }
}