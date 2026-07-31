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

            if (c.type == "proxy" || c.type == "reader") {
                c.wheelOff += e.deltaY;
                //console.log(`wheelOff ; ${c.wheelOff} ${c.type}`)
            } else {
                // scale w and h by vertical scroll amount
                c.xW -= e.deltaY;
                c.yH -= e.deltaY;
                c.xP -= e.deltaY;
                c.yP -= e.deltaY;
            }

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
    mouseX = e.x - 10;
    mouseY = e.y - 25;
    mouseDetail = e.detail;
    if (mouseDown) {
        if (!movingMap) {
            // drag windows
            for (let w = 0; w < cast.length; w ++) {
                let c = cast[w];
                if (c.mouseDrag) { // moving this window

                    adjustedWindow = true;
                    c.x1 = mouseX + oldOffX ;
                    c.y1 = mouseY + oldOffY ;

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
        cast[w].mouseDrag = false;
    }
    drawMap();
}

function doKeyDown(e) {
    for (let i = 0; i < cast.length; i++) {
        //console.log(`cast[${i}].acceptInput: ${cast[i].acceptInput}`)
        if (cast[i].acceptInput) {
            cast[i].keyHandler(e);
        }
    }
    if (e.key == " ") {

    }
}