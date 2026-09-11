/*var c = document.getElementById("myCanvas");
var cLeft = c.offsetLeft + c.clientLeft
var cTop = c.offsetTop + c.clientTop;
var ctx = c.getContext("2d");
c.oncontextmenu = function(event) {
    var x = Math.floor((event.pageX - cLeft) / scale),
        y = Math.floor((event.pageY - cTop) / scale);
    
    click(x, y, event.button);
    event.preventDefault();
}
c.addEventListener('click', function(event) {
    var x = Math.floor((event.pageX - cLeft) / scale),
        y = Math.floor((event.pageY - cTop) / scale);
    
    click(x, y, event.button);
}, false);

//c.width = w * scale;
//c.height = h * scale;
var scale = 20;
var w;
var h;
var bArray = []; // mine locations
var rArray = []; // revealed or not
var fArray = []; // player set flags
var totalMines = 0;
var gOver = 0;
var flagged = 0*/

function mineInit(win, s = 20) {
    win.msW = s;
    win.msH = s;
    win.xW = s * player.msScale;
    win.yH = s * player.msScale;
    win.msBArray = [];
    win.msRArray = [];
    win.msFArray = [];
    win.msTotalMines = Math.floor(win.msW * win.msH *.25);
    win.msGameOver = false;
    
    // fill array with mines
    for (let i = 0; i < win.msW * win.msH; i++) {
        if (i < win.msTotalMines) {
            win.msBArray.push(1);
        } else {
            win.msBArray.push(0);
        }
        win.msRArray.push(0);
    }
    shuffle(win.msBArray);
    //drawMSGrid(win);
}

function mineSweeperGameOver(win) {
    win.msGameOver = true;
    let covered = 0
    for (let r in win.msRArray) {
        if (win.msRArray[r] == 0) {
            covered ++
        }
    }
    if (covered != win.msTotalMines) {
        let x = y = cel = 0;
        ctx.font = "16px serif";
        ctx.fillStyle = 'rgb(200, 0, 0)'
        while (y < win.msH) {
            if (win.msBArray[cel] > 0) {
                ctx.fillText(
                    "X",
                    win.x1 + (x * win.msScale) + (win.msScale / 4),
                    win.y1 + (y * win.msScale) + (win.msScale / 1.25)
                );
            }
            x ++;
            cel ++
            if (x >= win.msW) {
                x = 0;
                y ++;
            }
        }

        ctx.fillStyle = 'rgb(100, 100, 100)'
        ctx.fillRect(
            win.x1 + (win.msW * win.msScale / 2) - 100,
            win.y1 + (win.msH * win.msScale / 2) - 40,
            220,
            60
        );
        // TODO: get text width, font size dynamically
        ctx.font = "30px serif";
        ctx.fillStyle = 'rgb(255, 0, 0)'
        ctx.fillText(
            "GAME OVER",
            win.x1 +(win.msW * win.msScale / 2) - 80,
            win.y1 + (win.msH * win.msScale/2)
        );
    }
}

function mineSweeperClick(xr, yr, button, win) {
    if (win.wasDragged > 1) {
        win.wasDragged = 0;
    } else {
        let x = Math.floor((xr - win.x1) / win.msScale);
        let y = Math.floor((yr - win.y1) / win.msScale);
        //console.log("click x: " + x + ", y: " + y)
        let cel = (y * win.msW) + x;
        //console.log(cel, " cel")
        if (win.msGameOver) {
            // restart
            ctx.clearRect(win.x1, win.y1, win.msW * win.msScale, win.msH * win.msScale);
            mineInit(win, win.msW);
        } else {
            if (button == 0) {
                // left click
                if (win.msBArray[cel] == 1) {
                    mineSweeperGameOver(win);
                } else {
                    if (win.msRArray[cel] != 1) {
                        win.msRArray[cel] = 1;
                        floodFill(x,y, win);
                        //drawMSGrid(win);
                    }
                }
            } else if (button == 2) {
                // right click
                // check if not uncovered
                //console.log(cel , " cel")
                if (win.msRArray[cel] < 1) {
                    // toggle flag
                    if (win.msFArray[cel] > 0) {
                        win.msFArray[cel] = 0;
                        win.msFlagged --;
                    } else {
                        win.msFArray[cel] = 1;
                        win.msFlagged ++;
                    }
                    //drawMSGrid(win);
                }
            }
        }
    }
}

function msCheckAdjacent(x, y, win) {
    adjCount = 0;
    for (let i=0; i<8; i++) {
        switch (i) {
            case 0:
                if (x>0 && y>0) {
                    if (win.msBArray[((y-1)*win.msW)+x-1] == 1) {
                        //console.log("top left");
                        adjCount ++;
                    }
                }
                break;
            case 1:
                if (y>0) {
                    if (win.msBArray[((y-1)*win.msW)+x] == 1) {
                        //console.log("top");
                        adjCount ++;
                    }
                }
                break;
            case 2:
                if (x<win.msW-1 && y>0) {
                    if (win.msBArray[((y-1)*win.msW)+x+1] == 1) {
                        //console.log("top right");
                        adjCount ++;
                    }
                }
                break;
            case 3:
                if (x>0) {
                    if (win.msBArray[(y*win.msW)+x-1] == 1) {
                        //console.log("left");
                        adjCount ++;
                    }
                }
                break;
            case 4:
                if (x<win.msW-1) {
                    if (win.msBArray[(y*win.msW)+x+1] == 1) {
                        //console.log("right");
                        adjCount ++;
                    }
                }
                break;
            case 5:
                if (x>0 && y<win.msH) {
                    if (win.msBArray[((y+1)*win.msW)+x-1] == 1) {
                        //console.log("bottom left");
                        adjCount ++;
                    }
                }
                break;
            case 6:
                if (y<win.msH) {
                    if (win.msBArray[((y+1)*win.msW)+x] == 1) {
                        //console.log("bottom");
                        adjCount ++;
                    }
                }
                break;
            case 7:
                if (x<win.msW-1 && y<win.msH) {
                    if (win.msBArray[((y+1)*win.msW)+x+1] == 1) {
                        //console.log("bottom right");
                        adjCount ++;
                    }
                }
                break;
            default:
        }
    }
    return adjCount
}

function drawMSGrid(win) {
    let scale = win.msScale
    ctx.clearRect(win.x1, win.y1, win.msW * scale, win.msH * scale);
    let x = 0, y = 0, cel = 0;
    ctx.font = "16px serif";
    while (cel < win.msRArray.length) {
        // square color
        if (win.msRArray[cel] > 0) {
            if (win.msFArray[cel] > 0) {
                // keep flagged value correct
                win.msFArray[cel] = 0;
                win.msFlagged --;
            }
            ctx.fillStyle = 'rgb(200, 200, 200)'
            ctx.fillRect(
                win.x1 + (x * scale),
                win.y1 + (y * scale),
                scale,
                scale
            );
            let adjCount = msCheckAdjacent(x, y, win);
            if (adjCount > 0) {
                switch (adjCount) {
                    case 1:
                        ctx.fillStyle = 'rgb(0, 0, 150)';
                        break;
                    case 2:
                        ctx.fillStyle = 'rgb(0, 150, 0)'
                        break;
                    case 3:
                        ctx.fillStyle = 'rgb(193, 48, 4)'
                        break;
                    case 4:
                        ctx.fillStyle = 'rgb(150, 0, 150)'
                        break;
                    default:
                        // 5-8 adjacent
                        ctx.fillStyle = 'rgb(150, 0, 0)'
                }
                ctx.font = "16px serif";
                ctx.fillText(adjCount, (win.x1 + (x*scale))+(scale/3), win.y1+(y*scale)+(scale/1.25));
            }
        } else {
            ctx.fillStyle = 'rgb(150, 150, 150)'
            ctx.fillRect(win.x1 + (x*scale), win.y1 + (y*scale), scale, scale);
            if (win.msFArray[cel] > 0) {
                // flag
                ctx.font = "16px serif";
                ctx.fillStyle = 'rgb(100, 0, 0)'
                ctx.beginPath();
                ctx.moveTo(win.x1 + (x*scale+5), win.y1 + (y*scale+3));
                ctx.lineTo(win.x1 + (x*scale+15), win.y1 + (y*scale+8));
                ctx.lineTo(win.x1 + (x*scale+5), win.y1 + (y*scale+13));
                ctx.fill();
                ctx.fillStyle = 'rgb(0, 0, 0)'
                ctx.fillRect(win.x1 + (x*scale+4), win.y1 + (y*scale+3), 2, 15)
                //ctx.fillText("X", (x*scale)+(scale/3), (y*scale)+(scale/1.25));
            }
        }
        x ++;
        if (x >= win.msW) {
            x = 0;
            y ++;
        }
        cel ++
    }
    //console.log("cel: " + cel + ", rArray.len " + rArray.length);
    x = 0;
    y = 0;
    i = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(0, 0, 0)'
    //console.log(x*scale, y*scale, x , y ,scale)
    while (y < win.msH) {
        ctx.strokeRect(
            win.x1 + x * scale,
            win.y1 + y * scale,
            scale,
            scale);
        x ++;
        i ++
        if (x >= win.msW) {
            x = 0;
            y ++;
        }
    }

    /*/ delete me show bombs
    x = y = cel = 0;
    ctx.font = "16px serif";
    ctx.fillStyle = 'rgb(200, 0, 0)'
    while (y < win.msH) {
        if (win.msBArray[cel] > 0) {
            ctx.fillText(
                "X",
                win.x1 + (x * win.msScale) + (win.msScale / 4),
                win.y1 + (y * win.msScale) + (win.msScale / 1.25)
            );
        }
        x ++;
        cel ++
        if (x >= win.msW) {
            x = 0;
            y ++;
        }
    }*/




    // update text
    //let str = "Mines: " + (win.msTotalMines) + "___Flagged: " + win.msFlagged;
    //win.text = str;
    //win.setText(win.text);
    
    // check if game won
    let covered = 0
    for (let r in win.msRArray) {
        if (win.msRArray[r] == 0) {
            covered ++
        }
    }
    if (covered == win.msTotalMines) {
        // console.log("covered: " + covered + ", totalMines: " + totalMines);
        win.msGameOver = true;
        ctx.fillStyle = 'rgb(100, 100, 100)'
        ctx.fillRect(
            win.x1 + (win.msW * scale/2) - 100,
            win.y1 + (win.msH * scale/2) - 40,
            220,
            60);
        // TODO: get text width, font size dynamically
        ctx.font = "30px serif";
        ctx.fillStyle = 'rgb(0, 150, 0)'
        ctx.fillText(
            "YOU WIN",
            win.x1 + (win.msW * scale/2)-55,
            win.y1 + (win.msH * scale/2)); 
    }

    if (win.msGameOver) {
        mineSweeperGameOver(win); 
    }
}

function floodFill(x,y, win) {
    let floodQueue = []
    floodQueue.push(x);
    floodQueue.push(y);

    while (floodQueue.length > 0) {
        let cX = floodQueue.shift(0);
        let cY = floodQueue.shift(0);

        // console.log("top");
        if (cY-1 > -1) {
            if (win.msBArray[((cY-1)*win.msW)+cX] == 0) {
                if (win.msRArray[((cY-1)*win.msW)+cX] == 0) {
                    win.msRArray[((cY-1)*win.msW)+cX] = 1;
                    if (msCheckAdjacent(cX,cY-1, win) == 0) {
                        floodQueue.push(cX);
                        floodQueue.push((cY-1));
                    }
                }
            }
        }

        // console.log("left");
        if (cX>0) {
            if (win.msBArray[(cY*win.msW)+cX-1] == 0) {
                if (win.msRArray[(cY*win.msW)+cX-1] == 0) {
                    win.msRArray[(cY*win.msW)+cX-1] = 1;
                    if (msCheckAdjacent(cX-1,cY, win) == 0) {
                        floodQueue.push(cX-1);
                        floodQueue.push(cY);
                    }
                }
            }
        }

        // console.log("right");
        if (cX<win.msW) {
            if (win.msBArray[(cY*win.msW)+cX+1] == 0) {
                if (win.msRArray[(cY*win.msW)+cX+1] == 0) {
                    win.msRArray[(cY*win.msW)+cX+1] = 1;
                    if (msCheckAdjacent(cX+1,cY,win) == 0) {
                        floodQueue.push(cX+1);
                        floodQueue.push(cY);
                    }
                }
            }
        }

        // console.log("bottom");
        if (cY<win.msH) {
            if (win.msBArray[((cY+1)*win.msW)+cX] == 0) {
                if (win.msRArray[((cY+1)*win.msW)+cX] == 0) {
                    win.msRArray[((cY+1)*win.msW)+cX] = 1;
                    if (msCheckAdjacent(cX,cY+1,win) == 0) {
                        floodQueue.push(cX);
                        floodQueue.push(cY+1);
                    }
                }
            }
        }
    }
}

