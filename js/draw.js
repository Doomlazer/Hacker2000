function draw() {
    // clear
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, c.width, c.height);

    drawMap();

    // draw windows based on priority, highest is top most window
    let s = cast.toSorted((a, b) => a.pri - b.pri);
    for (let i = 0; i < s.length; i++) {
       winDraw(s[i]);
    }

    drawCursor();
}

function drawCoords(coords) {

    function drawLine(points) {
        if (points.length < 3) return;

        mapStepsMax = Math.max(mapStepsMax, points.length - 1);

        const max = Math.min(mapSteps, points.length - 1);

        for (let i = 0; i < max; i++) {
            if (mapSteps < 2) {
                // some countrys have a short first line, other are very long. 
                // Keep them all the same while moving the map
                drawLineMap([
                    points[i][0] * mapScale + mapXOff,
                    -points[i][1] * mapScale + mapYOff,
                    points[i][0] * mapScale + mapXOff+1,
                    -points[i][1] * mapScale + mapYOff+1
                ]);
            } else {
                drawLineMap([
                    points[i][0] * mapScale + mapXOff,
                    -points[i][1] * mapScale + mapYOff,
                    points[i + 1][0] * mapScale + mapXOff,
                    -points[i + 1][1] * mapScale + mapYOff
                ]);
            }
        }
    }

    function walk(node) {

        if (!Array.isArray(node) || node.length === 0)
            return;

        // Are we looking at an array of [lon, lat] pairs?
        if (
            Array.isArray(node[0]) &&
            node[0].length >= 2 &&
            typeof node[0][0] === "number"
        ) {
            drawLine(node);
            return;
        }

        // Otherwise recurse into the next level.
        for (const child of node) {
            walk(child);
        }
    }

    walk(coords);
}

function drawMap() {
    let mouseLabel = "";
    if (updateMap || mapSteps < mapStepsMax) {
        // draw map a bit at a time
        mapSteps += mapInc;
        mapInc ++;
        //mapInc = mapInc + (mapInc/8);
        if (mapSteps > mapStepsMax) {mapSteps = mapStepsMax}
        updateMap = false;

        ctxMap.fillStyle = '#000000';
        ctxMap.fillRect(0, 0, c.width, c.height);
        ctxMap.lineWidth = 1;
        ctxMap.strokeStyle = mapColor;
        for (let i = 0; i < map.length; i++) {
            const f = map[i];
            if (f.properties.name != "") {
                //console.log("Drawling country: " + f.properties.name);
                const cords = f.geometry.coordinates;
                //let cl = cords.length;
                if (f.properties.name == player.selcountry) {
                    mapSel = cords;
                }
                drawCoords(cords);
            }
        }
        // highlight the selected country
        ctxMap.strokeStyle = '#c04202';
        drawCoords(mapSel);
        //console.log("mapSel (" + player.selcountry + "):");
        //console.log(mapSel);
        //console.log("mapInc: " + mapInc + ", mapSteps: " + mapSteps + ", mapStepsMax: " + mapStepsMax);

        // outer map rect
        ctxMap.strokeStyle = '#3bd607';
        ctxMap.strokeRect(-180 * mapScale + mapXOff,
                        (-90 * mapScale) + mapYOff,
                        360 * mapScale,
                        (180 * mapScale));
        ctxMap.lineWidth = 1;
    }

    ctx.drawImage(cMap, 0, 0);

    // clear mapMarkers ctx if map reset
    if (mapSteps <= 1) {
        ctxMarkers.fillStyle = '#000000';
        ctxMarkers.fillRect(0, 0, c.width, c.height);
    }
    // Draw Cities
    if (mapSteps >= mapStepsMax && player.drawCities) {
        mapCitiesSteps += 1 + mapCitiesSteps/4;
        for (let i = 0; i < cities.length; i++) {
            if (i < mapCitiesSteps) {
                // loc
                ctxMarkers.strokeStyle = '#0048ff';
                ctxMarkers.lineWidth = 1;
                ctxMarkers.strokeRect(((cities[i].lon) * mapScale) + mapXOff,
                                (-(cities[i].lat) * mapScale) + mapYOff,
                                1 * mapScale, 1 * mapScale);
                //console.log(locations[player.uid].address.country);

                if (mouseX > (cities[i].lon * mapScale) + mapXOff &&
                    mouseX < (cities[i].lon * mapScale) + mapXOff + (1 * mapScale) &&
                    mouseY > (-(cities[i].lat) * mapScale) + mapYOff &&
                    mouseY < (-(cities[i].lat) * mapScale) + mapYOff + (1 * mapScale)) {
                    // move map to named location
                    // //mouseDeatil is number of clicks, we wait for two or more
                    if (mouseDetail > 1) {
                        mapScale = 30;
                        mapXOff = (getWidth()/3*2) - ((cities[i].lon) * mapScale);
                        mapYOff = (getHeight()/2) - (-(cities[i].lat) * mapScale);
                        mapSteps = 1;
                        mapNodeSteps = 1;
                        mapInc = 2;
                        player.selcountry = cities[i].country;
                        cast[0].text = `Selected ${cities[i].name}, ${cities[i].country}`;
                        cast[0].setText(cast[0].text);
                        cast[0].textDisplayChar = 0;
                        player.selectedCity = cities[i];
                        updateMap = true;
                        drawMap();
                    }
                    mouseLabel = cities[i].name + ", " + cities[i].country +
                                ", population: " + (cities[i].population);
                }
            }           
        }
    }

    // draw network nodes
    if (mapSteps >= mapStepsMax && player.drawNodes) {
        mapNodeSteps += 1 + mapNodeSteps/4;
        for (let i = 0; i < nodes.length; i++) {
            if (i < mapNodeSteps && nodes[i].discovered) {
                if (mouseX > (nodes[i].longitude * mapScale) + mapXOff &&
                    mouseX < (nodes[i].longitude * mapScale) + mapXOff + (1 * mapScale) &&
                    mouseY > (-(nodes[i].latitude) * mapScale) + mapYOff &&
                    mouseY < (-(nodes[i].latitude) * mapScale) + mapYOff + (1 * mapScale)) {
                    // draw highlighted loc marker
                    ctxMarkers.strokeStyle = '#35e60e';
                    ctxMarkers.lineWidth = 3;
                    ctxMarkers.strokeRect(((nodes[i].longitude) * mapScale) + mapXOff,
                                    (-(nodes[i].latitude) * mapScale) + mapYOff,
                                    1 * mapScale, 1 * mapScale); 
                    // move map to named loc
                    if (mouseDetail > 1) {
                        mapScale = 50;
                        mapXOff = (getWidth()/3*2) - ((nodes[i].longitude) * mapScale);
                        mapYOff = (getHeight()/2) - (-(nodes[i].latitude) * mapScale);
                        mapSteps = 0;
                        mapNodeSteps = 0;
                        mapInc = 2;
                        player.selcountry = nodes[i].country;
                        cast[0].text = `Selected node: ${nodes[i].city}, ${nodes[i].country} \n
                                        ${nodes[i].router.manufacturer} ${nodes[i].router.model} 
                                        IP: ${nodes[i].ip_address} `;
                        cast[0].setText(cast[0].text);
                        cast[0].textDisplayChar = 0;
                        player.selectedNode = nodes[i];
                        drawMap();
                    }

                    // text label
                    ctxMarkers.fillStyle = '#c37105d8';
                    ctxMarkers.font = scaleFont(0.018, "arial");
                    /*ctxMarkers.fillText(nodes[i].city + ", " + nodes[i].country +
                                ", " + (nodes[i].router.manufacturer) +
                                " " + (nodes[i].router.model),
                                ((nodes[i].longitude) * mapScale) + mapXOff,
                                (-(nodes[i].latitude) * mapScale) + mapYOff);*/
                    mouseLabel = nodes[i].city + ", " + nodes[i].country +
                                ", " + (nodes[i].router.manufacturer) +
                                " " + (nodes[i].router.model)
                } else {
                    // standard node marker color
                    ctxMarkers.strokeStyle = '#d4ff00';
                    ctxMarkers.lineWidth = 1;
                    ctxMarkers.strokeRect(((nodes[i].longitude) * mapScale) + mapXOff,
                                    (-(nodes[i].latitude) * mapScale) + mapYOff,
                                    1 * mapScale, 1 * mapScale);
                } 
            }          
        }
    }

    ctx.drawImage(cMarkers, 0, 0);

    // draw network proxy connections on map
    if (mapSteps >= mapStepsMax && player.drawNodes) {
        let g = 155;
        if (player.nodeStack.length > 1) {
            for (let i = 0; i < player.nodeStack.length - 1; i++) {
                //console.log(g/(player.nodeStack.length-i))
                ctx.strokeStyle = `rgb(${(g/player.nodeStack.length)*(i+1)+100}, 20, 20)`;
                let l1 = nodes[player.nodeStack[i]];
                let l2 = nodes[player.nodeStack[i+1]];
                mapNodeStackSteps += 0.02;
                if (i < mapNodeStackSteps) {
                    ctx.lineWidth = 1 * mapScale;
                    drawLine([(l1.longitude * mapScale) + mapXOff, -(l1.latitude * mapScale) + mapYOff, 
                              (l2.longitude * mapScale) + mapXOff, -(l2.latitude * mapScale) + mapYOff]);
                }
            }
        }
    }
    //label network proxy connection cities
    if (mapSteps >= mapStepsMax && player.drawNodes) {
        let g = 155;
        ctx.lineWidth = 2;
        if (player.nodeStack.length > 1) {
            for (let i = 0; i < player.nodeStack.length - 1; i++) {
                if (i < mapNodeStackSteps) {
                    let node = nodes[player.nodeStack[i+1]];
                    if (node.compromisedAccounts.length > 0) {
                        // node aquired
                        ctx.strokeStyle = `rgb(19, 195, 39)`;
                    } else {
                        // un hacked
                        ctx.strokeStyle = `rgb(138, 6, 6)`;
                    }
                    // ring
                    ctx.beginPath();
                    ctx.arc((node.longitude * mapScale) + mapXOff,
                            -(node.latitude * mapScale) + mapYOff,
                            1 * mapScale,
                            0,
                            2 * Math.PI); // x, y, radius, startAngle, endAngle
                    ctx.stroke();

                    // country, city label
                    let label = node.country + ", " + node.city;
                    ctx.fillStyle = '#f4eded';
                    ctx.font = scaleFont(0.010, "arial");
                    ctx.fillText(label, (node.longitude * mapScale) + mapXOff,
                                        -(node.latitude * mapScale) + mapYOff);
                }
            }
        }
    }

    // draw the mouse hover label
    player.windowHover = true;
        for (let w = 0; w < cast.length; w ++) {
                let c = cast[w];
                if (mouseX > c.x1 &&
                    mouseX < c.x1 + c.xW &&
                    mouseY > c.y1 &&
                    mouseY < c.y1 + c.yH) {
                        player.windowHover = false;
                }
        }
    if (player.windowHover) {
        ctx.fillStyle = '#ff3838';
        ctx.font = scaleFont(0.018, "arial");
        ctx.fillText(mouseLabel, mouseX, mouseY);
    }

    if (player.selectedCity && mapCitiesSteps > 1) {
        let city = player.selectedCity;

        // loc marker
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 4;
        ctx.strokeRect((city.lon * mapScale) + mapXOff,
                        (-(city.lat) * mapScale) + mapYOff,
                        1 * mapScale, 1 * mapScale);

        // loc label
        ctx.fillStyle = '#20974c';
        ctx.font = scaleFont(0.018, "arial");
        let lt = city.name + ", " + city.country + ", population: " + (city.population);
        ctx.fillText(lt,
                    (city.lon * mapScale) + mapXOff,
                    (-(city.lat) * mapScale) + mapYOff);
    }

    if (player.selectedNode && mapNodeSteps > 1) {
        let node = nodes[player.selNodeNum];

        // loc marker
        ctx.strokeStyle = '#f1700d';
        ctx.lineWidth = 4;
        ctx.strokeRect((node.longitude * mapScale) + mapXOff,
                        (-(node.latitude) * mapScale) + mapYOff,
                        1 * mapScale, 1 * mapScale);

        // loc label
        ctx.fillStyle = '#20974c';
        ctx.font = scaleFont(0.018, "arial");
        let lt = node.country + ", ip: " + node.ip_address;
        ctx.fillText(lt,
                    (node.longitude * mapScale) + mapXOff,
                    (-(node.latitude) * mapScale) + mapYOff);
    }

    //drawIcon();
}

function drawCursor() {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    let x = mouseX,
    y = mouseY;
    const line = [x,y,x,y+10,x+5,y+10,x+8,y+15,x+5,y+10,x+10,y+10,x,y];
    drawLine(line);

    if (debug) {
        ctx.font = scaleFont(0.015, "arial"); //"30px Hyperspace";
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText("x:" + x + ", y:" + y, x + 10, y+20);
    }
}

function drawLine(l) {
    ctx.beginPath();
    ctx.moveTo(l[0], l[1]);
    for (let i = 2; i < l.length; i += 2) {
        ctx.lineTo(l[i], l[i+1]);
    }
    ctx.stroke();
}

function drawLineMap(l) {
    ctxMap.beginPath();
    ctxMap.moveTo(l[0], l[1]);
    for (let i = 2; i < l.length; i += 2) {
        ctxMap.lineTo(l[i], l[i+1]);
    }
    ctxMap.stroke();
}

function drawIcon() {
    ctxMap.strokeStyle = '#ff1f02';
    ctxMap.lineWidth = 3;
    let icon = [[149, 9, 175, 10, 251, 43, 297, 101, 307, 125, 279, 72, 162, 34, 141, 38], [184, 16, 189, 19, 187, 25, 184, 30, 184, 35, 183, 29, 186, 25, 188, 22], [133, 19, 133, 23, 133, 27, 132, 27, 134, 26, 134, 24, 134, 22, 132, 21], [123, 21, 123, 25, 123, 29, 124, 31, 121, 30, 122, 27, 124, 24, 121, 22], [127, 23, 127, 25, 128, 26, 128, 28, 127, 29, 126, 30, 129, 26, 129, 24], [177, 23, 179, 25, 179, 29, 178, 32, 176, 34, 178, 29, 181, 27, 180, 24], [173, 24, 172, 27, 171, 30, 170, 33, 172, 34, 168, 31, 169, 28, 170, 30], [91, 26, 88, 29, 84, 31, 80, 33, 76, 35, 73, 37, 70, 38, 74, 38], [112, 26, 113, 30, 114, 34, 117, 33, 120, 31, 118, 36, 115, 32, 114, 29], [108, 28, 109, 32, 109, 37, 108, 41, 108, 46, 108, 51, 107, 47, 107, 43], [189, 28, 189, 31, 189, 34, 187, 35, 190, 32, 191, 30, 187, 31, 190, 30], [195, 30, 195, 33, 194, 35, 195, 37, 196, 36, 192, 34, 193, 34, 194, 32], [205, 30, 205, 33, 203, 34, 202, 36, 201, 37, 200, 35, 201, 35, 203, 33], [211, 31, 211, 34, 209, 35, 209, 38, 210, 39, 207, 37, 205, 37, 208, 35], [101, 32, 100, 39, 96, 43, 95, 36, 94, 40, 101, 40, 99, 37, 104, 33], [129, 32, 129, 42, 125, 44, 124, 38, 121, 42, 119, 42, 131, 41, 130, 39], [216, 34, 216, 38, 213, 40, 216, 37, 220, 34, 223, 35, 225, 38, 225, 35], [90, 38, 90, 40, 90, 42, 90, 44, 90, 46, 89, 47, 89, 45, 89, 43], [227, 39, 225, 41, 225, 45, 224, 45, 223, 42, 225, 40, 230, 39, 231, 42], [67, 40, 66, 43, 64, 43, 62, 46, 60, 46, 58, 49, 56, 50, 65, 43], [76, 40, 77, 45, 78, 50, 80, 54, 82, 50, 80, 46, 82, 53, 80, 50], [115, 41, 114, 44, 115, 47, 117, 45, 113, 46, 111, 44, 112, 47, 111, 47], [236, 43, 235, 44, 235, 46, 234, 47, 232, 47, 231, 47, 230, 48, 230, 47], [158, 44, 110, 73, 112, 56, 103, 58, 147, 70, 143, 73, 188, 87, 204, 108], [239, 45, 240, 47, 239, 49, 238, 50, 236, 49, 235, 52, 234, 52, 234, 50], [173, 46, 175, 46, 177, 46, 178, 47, 180, 47, 182, 47, 183, 48, 185, 48], [103, 47, 102, 49, 102, 52, 103, 54, 104, 53, 106, 52, 101, 51, 103, 50], [193, 48, 204, 62, 214, 77, 224, 92, 234, 107, 240, 113, 223, 89, 208, 67], [251, 48, 249, 49, 244, 51, 239, 54, 241, 53, 249, 57, 244, 59, 250, 55], [94, 49, 94, 54, 94, 59, 96, 58, 93, 55, 96, 51, 97, 53, 98, 54], [73, 50, 72, 53, 72, 57, 74, 59, 74, 58, 73, 56, 71, 53, 75, 50], [136, 51, 134, 53, 138, 51, 140, 53, 142, 53, 144, 54, 143, 58, 143, 54], [207, 52, 213, 60, 218, 68, 224, 76, 229, 85, 235, 93, 241, 100, 226, 78], [61, 53, 61, 60, 64, 64, 66, 68, 66, 63, 65, 57, 64, 59, 64, 62], [187, 56, 188, 58, 187, 60, 185, 59, 183, 60, 181, 60, 179, 61, 179, 60], [160, 58, 163, 63, 168, 80, 161, 96, 151, 86, 161, 85, 160, 86, 183, 94], [46, 59, 46, 60, 46, 61, 46, 62, 45, 62, 45, 63, 44, 63, 43, 63], [142, 59, 142, 64, 140, 63, 138, 64, 137, 68, 140, 68, 139, 68, 141, 63], [216, 60, 217, 60, 218, 60, 218, 61, 219, 61, 220, 61, 220, 62, 221, 62], [251, 60, 250, 62, 249, 64, 249, 62, 247, 61, 252, 62, 253, 60, 256, 61], [42, 64, 34, 77, 26, 90, 29, 103, 31, 103, 20, 91, 18, 103, 23, 92], [57, 64, 58, 65, 59, 66, 59, 68, 60, 69, 60, 71, 61, 72, 62, 71], [190, 64, 189, 65, 188, 66, 187, 65, 186, 66, 185, 67, 184, 66, 191, 65], [196, 65, 196, 66, 196, 67, 197, 67, 197, 68, 197, 66, 197, 65, 198, 65], [250, 65, 256, 65, 260, 68, 256, 68, 254, 70, 262, 69, 266, 72, 267, 71], [56, 67, 56, 69, 56, 71, 56, 73, 56, 75, 56, 77, 55, 72, 55, 70], [126, 67, 123, 71, 128, 68, 132, 74, 134, 78, 133, 83, 129, 83, 131, 85], [102, 70, 101, 73, 100, 76, 98, 78, 97, 81, 95, 82, 97, 79, 99, 75], [153, 70, 150, 77, 146, 83, 143, 90, 139, 96, 142, 88, 147, 81, 150, 75], [198, 70, 197, 72, 195, 71, 193, 72, 191, 73, 189, 74, 188, 73, 199, 72]];
    for (let i = 0; i < icon.length; i+=2) {
        drawLineMap(icon[i]);
    }
    ctxMap.strokeStyle = '#c91b04';
    ctxMap.lineWidth = 2;
    for (let i = 0; i < icon.length; i+=2) {
        drawLineMap(icon[i]);
    }
    ctxMap.strokeStyle = '#8b1404';
    ctxMap.lineWidth = 1;
    for (let i = 0; i < icon.length; i+=2) {
        drawLineMap(icon[i]);
    }
}

function winDraw(win) { // draw a window
        // update the animation, blit the rect and boarders if fully open draw text.
        if (win.toOpen) {
            // is opening
            if (win.xP < win.xW) {
                win.xP += win.aniSpeed;
                if (win.xP > win.xW) {
                    win.xP = win.xW;
                }
            }
            if (win.yP < win.yH) {
                win.yP += win.aniSpeed;
                if (win.yP > win.yH) {
                    win.yP = win.yH;
                }
            }

            blitWinRect(win);

            if (win.xP == win.xW && win.yP == win.yH) {
                win.openedState();
            } else {
                win.aniSpeed += win.ease;
            }

        } else {
            // is closing
            if (win.xP > 0) {
                win.xP -= win.aniSpeed;
                if (win.xP < 0) {
                    win.xP = 0;
                }
            }
            if (win.yP > 0) {
                win.yP -= win.aniSpeed;
                if (win.yP < 0) {
                    win.yP = 0;
                }
            }
            
            blitWinRect(win);

            if (win.xP == 0 && win.yP == 0) {
                win.closedState();
            } else {
                win.aniSpeed -= win.ease;
            }
        }
    }

    function blitWinRect(win) {
        ctx.strokeStyle = win.rectColor;
        //ctx.rectLineWidth = win.rectLineWidth;
        ctx.lineWidth = win.rectLineWidth;

        if (win.xP > 0 || win.yP > 0) {
            // background
            if (win.opaqueBackground) {
                ctx.fillStyle = win.backgroundColor;
                if (win.isRounded) {
                    ctx.beginPath();
                    ctx.roundRect(win.x1, win.y1, win.xP, win.yP, win.cornerRad);
                    ctx.fill();
                } else {
                    ctx.fillRect(win.x1, win.y1, win.xP, win.yP);
                }
    
            }

            // main rect
            if (win.isRounded) {
                ctx.beginPath();
                ctx.roundRect(win.x1, win.y1, win.xP, win.yP, win.cornerRad);
                ctx.stroke();
            } else {
                ctx.strokeRect(win.x1, win.y1, win.xP, win.yP);
            }

            // boarder
            if (win.hasBoarder) {
                ctx.lineWidth = win.boarderLineWidth;
                if (win.isRounded) {
                    ctx.beginPath();
                    ctx.roundRect(win.x1 - (win.boarderWidth * (win.xP/win.xW)),
                                    win.y1 - (win.boarderHeight * (win.yP / win.yH)),
                                    win.xP + ((win.boarderWidth * (win.xP/win.xW)) * 2),
                                    win.yP + ((win.boarderHeight * (win.yP / win.yH)) * 2),
                                    win.cornerRad);
                    ctx.stroke();
                } else {
                    ctx.strokeRect(win.x1 - (win.boarderWidth * (win.xP/win.xW)),
                                    win.y1 - (win.boarderHeight * (win.yP / win.yH)),
                                    win.xP + ((win.boarderWidth * (win.xP/win.xW)) * 2),
                                    win.yP + ((win.boarderHeight * (win.yP / win.yH)) * 2));
                }
            }
        }
    }