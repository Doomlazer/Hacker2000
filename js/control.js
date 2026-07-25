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
    for (let w = 0; w < cast.length; w ++) {
        let c = cast[w];
        if (mouseX > c.x1 &&
            mouseX < c.x1 + c.xW &&
            mouseY > c.y1 &&
            mouseY < c.y1 + c.yH) {

            adjustedWindow = true;
            // scale w and h by vertical scroll amount
            c.xW -= e.deltaY;
            c.yH -= e.deltaY;
            c.xP -= e.deltaY;
            c.yP -= e.deltaY;
            // clear
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, c.width, c.height);
            // clear
            ctxMap.fillStyle = '#000000';
            ctxMap.fillRect(0, 0, c.width, c.height);
            // clear
            ctxMarkers.fillStyle = '#000000';
            ctxMarkers.fillRect(0, 0, c.width, c.height);
            //c.updateMap = true;
            c.setText(c.text);
            mapSteps = 1;
            mapInc = 1;
            mapCitiesSteps = 0;
            mapNodeSteps = 0;
            mapNodeStackSteps = 0;
            drawMap();
        }
    }
    // or scale the map
    if (!adjustedWindow) {
        mapScale -= e.deltaY/100;
        if (mapScale < 1) {
            mapScale = 1;
        }
        if (mapXOff < 0) {
            mapXOff = 0;
        }
        if (mapYOff < 0) {
            mapYOff = 0;
        }
        if (mapXOff > c.width) {
            mapXOff = c.width;
        }
        if (mapYOff > c.height) {
            mapYOff = c.heigth;
        }
        mapSteps = 1;
        mapInc = 1;
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
                if (mouseX > c.x1 &&
                    mouseX < c.x1 + c.xW &&
                    mouseY > c.y1 &&
                    mouseY < c.y1 + c.yH) {
                        
                    adjustedWindow = true;
                    // scale w and h by vertical scroll amount
                    //c.x1 = oldOffX - ((mouseDownX - mouseX));
                    //c.y1 = oldOffY - ((mouseDownY - mouseY));
                    //c.x1 = (mouseDownX - mouseX) - (c.xW/2);
                    //c.y1 = (mouseDownY - mouseY) - (c.yH/2);
                    c.x1 = oldOffX - ((mouseDownX - mouseX));
                    c.y1 = oldOffY - ((mouseDownY - mouseY));
                    // clear
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, c.width, c.height);
                    // clear
                    ctxMap.fillStyle = '#000000';
                    ctxMap.fillRect(0, 0, c.width, c.height);
                    // clear
                    ctxMarkers.fillStyle = '#000000';
                    ctxMarkers.fillRect(0, 0, c.width, c.height);
                    //c.updateMap = true;
                    //c.setText(c.text);
                    mapSteps = 1;
                    mapInc = 1;
                    mapCitiesSteps = 0;
                    mapNodeSteps = 0;
                    mapNodeStackSteps = 0;
                    drawMap();
                }
            }
        }

        // drag map
        if (!adjustedWindow) {
            mapXOff = oldOffX - ((mouseDownX - mouseX));
            mapYOff = oldOffY - ((mouseDownY - mouseY));
            mapSteps = 1;
            mapInc = 1;
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
    //mapScale = 7;
    mouseDetail = e.detail;

    for (let w = 0; w < cast.length; w ++) {
        let c = cast[w];
        if (mouseX > c.x1 &&
            mouseX < c.x1 + c.xW &&
            mouseY > c.y1 &&
            mouseY < c.y1 + c.yH) {
                oldOffX = -(c.xW/2);
                oldOffY = -(c.yH/2);
                //mouseDownX = mouseX;
                //mouseDownY = mouseY;
                //mouseDownX = mouseX - c.x1;
                //mouseDownY = mouseY + c.y1;
                drawMap();
        } else {
            movingMap = true;
            oldOffX = mapXOff;
            oldOffY = mapYOff;
            mouseDownX = mouseX;
            mouseDownY = mouseY;
            drawMap();
        }
    }
}

function doMouseUp(e) {
    mouseDown = false;
    movingMouse = false;
    mouseDetail = e.detail;
    //mapScale = 4
    mouseDownX = 0;
    mouseDownY = 0;
    drawMap();
}

function doKeyDown(e) {
    for (let i = 0; i < cast.length; i++) {
        console.log(`cast[${i}].acceptInput: ${cast[i].acceptInput}`)
        if (cast[i].acceptInput) {
            cast[i].keyHandler(e);
        }
    }
    if (e.key == " ") {

    }
}