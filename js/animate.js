class aniRect {
    constructor(x, y, width, height) {
        this.isRounded = true;
        this.cornerRad = 20;
        this.rectLineWidth = 1;
        this.hasBoarder = true;
        this.boarderWidth = width/40;
        this.boarderHeight = height/40;
        this.boarderLineWidth = 5;
        this.toOpen = true;
        this.delete = false;
        this.aniSpeed = 30.1;
        this.ease = 0.075;
        this.x1 = x; // start
        this.y1 = y;
        this.xP = 0; // progress
        this.yP = 0;
        this.xW = width; // max
        this.yH = height;
        this.rectColor = '#028220';
        this.textColor = '#ffffff';
        this.fontSize = 20;
        this.textFont = "Courier New"; // "Hyperspace";
        this.opaqueBackground = true;
        this.backgroundColor = '#404141';
        this.textLines = []
        this.textMaxLines = 0;
        this.admins = [];
        this.accounts = [{"user": "root", "pwd":"password1234", "admin": true, "userId":0}, 
                            {"user": "rcrumb", "pwd":"comix", "admin": false, "userId":100}];
        this.approvedComands = ["reg"];
        this.displayLines = [];
        this.textDisplayChar = 0;
        this.typingEffect = true;
        this.date = "07/18/2026:19:37"
        this.locNum = cast.length;
        this.inputStr = "";
        this.acceptInput = true;
        this.lastInput = "";
        this.promptChar = ">";
        this.authTries = 0;
        this.proxyWindow = [];
        this.type = "none";
        this.wheelOff = 0;
        this.text = `Welcome to the mal-90 OS\nIt's ${this.date}`;
        this.proxyFontSize = 12;
        this.proxyText = "Proxy List:\n"
        this.proxyBackgroundColor = '#3d0240'
        this.proxyRectColor = '#ec32f6'
        this.proxyTextColor = '#db96de'
        this.proxyIsRounded = false;
        this.proxyHasBoarder = false;
        this.pX1 = getWidth()/25 * 15,
        this.pY1 = getHeight()/8,
        this.pXW = getWidth()/6,
        this.pYH = getHeight()/1.5
    }

    setText(theText, prompt = true) {
        // Set font and text color
        ctx.fillStyle = this.textColor;
        ctx.font = this.fontSize + "px " + this.textFont;

        // set max lines
        this.textMaxLines = Math.floor(this.yH / (this.fontSize * 1.25));

        // wrap text
        let wrapped = this.textWrapLines(ctx, theText, this.xW - this.fontSize, 0);
        for (const line of wrapped) {
            this.displayLines.push(line);
        }
        
        // add the input prompt
        if (prompt) {
        this.displayLines.push(this.promptChar);
        }
    }

    clickHandler(e) {
        //console.log(`clicked on ${this} e.details: ${e.detail}`);
        if (e.detail > 1) {
            mouseUnclaimed = false;
            this.toOpen = false;
            this.delete = true;
        }
    }

    keyHandler(e) {
        if (e.key == "Enter") {
            // execute entered string
            this.lastInput = this.inputStr;
            this.commandHandler();

        } else if (e.key == "ArrowUp") {
            // redo last command 
            this.inputStr = this.lastInput;

            ctx.font = this.fontSize + "px " + this.textFont;
            let wrapped = this.textWrapLines(ctx, this.inputStr, this.xW - this.fontSize, 0);
            for (let i = 0; i < wrapped.length; i++) {
                if (i == 0) {
                    // keep promptChar
                    this.displayLines[this.displayLines.length-1] = this.promptChar + wrapped[i];
                } else {
                    this.displayLines.push(wrapped[i]);
                }
            }

        } else if (e.key == "ArrowDown") {
            // immediately finish typing effect
            this.textDisplayChar = 0;

        } else if (e.key == "Backspace") {
            if (this.inputStr.length > 0) {
                // command holder
                this.inputStr = this.inputStr.substring(0, this.inputStr.length - 1);

                // and displayed text
                let l = this.displayLines[this.displayLines.length-1];
                if (l.length > 0) {
                    // erase from last line
                    this.displayLines[this.displayLines.length-1] = l.substring(0, l.length-1);
                } else {
                    // or pop empty line and erase from prev
                    this.displayLines.pop();
                    l = this.displayLines[this.displayLines.length-1]
                    l = l.substring(0, l.length-1);
                }
            }

        } else {
            if (e.key != "Shift" &&
                e.key != "ArrowLeft" &&
                e.key != "ArrowRight") {
                // add character to input    
                this.inputStr += e.key;
                this.displayLines[this.displayLines.length-1] += e.key;
                // wrap if needed
                let maxWidth = this.xW - this.fontSize;
                ctx.font = this.fontSize + "px " + this.textFont;
                let width = (ctx.measureText(this.displayLines[this.displayLines.length-1]).width);
                if (width > maxWidth) {
                    if (this.displayLines[this.displayLines.length-1].split(" ").length > 1) {
                        // the command has a space
                        const lastIndex = this.displayLines[this.displayLines.length-1].lastIndexOf(" ");
                        const before = this.displayLines[this.displayLines.length-1].slice(0, lastIndex);
                        const after = this.displayLines[this.displayLines.length-1].split(" ");
                        this.displayLines[this.displayLines.length-1] = before;
                        this.displayLines.push(after[after.length-1]);
                    } else {
                        // no space in command break the line
                        let l = this.displayLines[this.displayLines.length-1];
                        this.displayLines[this.displayLines.length-1] = l.substring(0, l.length-1);
                        this.displayLines.push(l.substring(l.length));
                    }
                }
            }
        }
    }

    commandHandler() {
        const command = this.inputStr.split(" ");
        this.inputStr = "";
        console.log(`sent command ${command}`)

        // all systems must have an exit command, approved commands and admins are optional
        if (this.approvedComands.includes(command[0].toLowerCase())
            || this.admins.includes(player.uid)
            || command[0].toLowerCase() == "exit") {
             
            if (player.askedForName) {
                // check USERNAME
                let notFound = true;
                for (let i = 0; i < this.accounts.length; i++) {
                    if (player.unactivated && i == 1) {
                        this.accounts[i].user = player.tryAuthName;
                    }
                    if (this.accounts[i].user == player.tryAuthName) {
                        // the entered username was valid, ask for pwd
                        notFound = false;
                        player.authAccountIndex = i;
                        player.askedForName = false;
                        player.askedForPwd = true;
                        this.authTries = 0;
                        this.text = nodes[player.nodeStack[player.nodeStack.length-1]].ip_address + 
                                    " : Enter password";
                        this.setText(this.text);
                    }
                }
                if (notFound) {
                    this.authTries ++;
                    if (this.authTries >= 3) {
                        this.setText("Invalid user. Too many attempts\nDisconnected...");
                        player.askedForName = false;
                        player.nodeStack.pop();
                    } else {
                        this.setText("Invalid user. Enter username");
                    }
                }
            } else if (player.askedForPwd) {
                // check PASSWORD
                player.tryAuthPwd = command;
                let notFound = true;
                console.log(`${this.accounts[player.authAccountIndex].pwd} == ${player.tryAuthPwd}`)
                if (player.unactivated) {
                    this.accounts[player.authAccountIndex].pwd = player.tryAuthPwd;
                    player.unactivated = false;
                }
                if (this.accounts[player.authAccountIndex].pwd == player.tryAuthPwd) {
                    this.setText(`Welcome, ${this.accounts[player.authAccountIndex].user}`);
                    player.askedForPwd = false;
                    notFound = false;
                    if (cast.indexOf(this) != 0) {
                        player.nodeStack.push(this.id);
                    }
                    
                }
                if (notFound) {
                    this.authTries ++;
                    if (this.authTries >= 3) {
                        this.setText("Invalid password. Too many attempts\nDisconnected...");
                        player.nodeStack.pop();
                        this.askedForPwd = false;
                    } else {
                        this.setText("Incorrect. Enter password");
                    }
                }
            
            } else if (command[0].toLowerCase() == "exit") {
                this.setText("Goodbye...");
                if (player.nodeStack.length > 1) {
                    player.nodeStack.pop();
                    player.proxyWindow[0].wheelOff --;
                    let text = this.proxyText;
                    for (let i = 0; i < player.nodeStack.length-1; i++) {
                        text += nodes[player.nodeStack[i]].ip_address + 
                        " " +  locations[player.nodeStack[i]].address.country + "\n";
                    }
                    player.proxyWindow[0].displayLines = [];
                    player.proxyWindow[0].text = text;
                    console.log(player.proxyWindow[0].text)
                    player.proxyWindow[0].setText(text, false);
                } else {
                this.toOpen = false;
                this.delete = true;
                }

            } else if (command[0].toLowerCase() == "music") {
                if (player.musicOn) {
                    backgroundMusic.stop();
                }

            } else if (command[0].toLowerCase() == "ssh") {
                // accepts either ip or uNam@ip
                // spawn proxy window if one doesn't exist
                if (player.proxyWindow.length < 1) {
                    let pw = new aniRect(this.pX1, this.pY1, this.pXW, this.pYH);
                    //console.log("2nf " + cast[cast.length-1]);
                    let text = this.proxyText;
                    for (let i = 0; i < player.nodeStack.length-1; i++) {
                        text += nodes[player.nodeStack[i]].ip_address + 
                        " " +  locations[player.nodeStack[i]].address.country + "\n";
                    }
                    pw.fontSize = this.proxyFontSize;
                    pw.text = text;
                    pw.setText(text, false);
                    pw.acceptInput = false;
                    pw.backgroundColor = this.proxyBackgroundColor;
                    pw.rectColor = this.proxyRectColor;
                    pw.textColor = this.proxyTextColor
                    pw.isRounded = this.proxyIsRounded;
                    pw.hasBoarder = this.proxyHasBoarder;
                    pw.type = "proxy";
                    cast.push(pw);
                    player.proxyWindow.push(pw);
                }
                // searches nodes until ip found and addis it to the connection chain
                if (command.length < 2) {
                    this.setText("ssh \- OpenSSH remote login client\n\tssh [ip address]\n\tssh [user]@[ip address]");
                } else {
                    let addr = command[1].split("@");
                    let ip;
                    if (addr.length < 2) {
                        // no user provided
                        player.tryAuthName = player.uName;
                        ip = addr[0];
                    } else {
                        // user@ip_address provided
                        player.tryAuthName = addr[0];
                        ip = addr[1];
                    }
                    console.log(`entered: ${player.tryAuthName}@${ip}`)
                    // find the ip address
                    let notFound = true;
                    for (let i of nodes) {
                        if (ip == i.ip_address) {
                            console.log(i.id)
                            console.log(i)
                            player.nodeStack.push(i.id);
            
                            let text = this.proxyText;
                            for (let i = 0; i < player.nodeStack.length; i++) {
                                console.log(`player.nodeStack.length: ${player.nodeStack.length}`);
                                console.log(player.nodeStack);
                                console.log(`player.nodeStack[${i}]: ${player.nodeStack[i]}`);
                                let str = nodes[player.nodeStack[i]].ip_address + 
                                " " +  locations[player.nodeStack[i]].address.country + "\n";
                                if (ctx.measureText(str) > player.proxyWindow[0].xW) {
                                    player.proxyWindow[0].xW = ctx.measureText(str);
                                }
                                text += str;
                            }
                            player.proxyWindow[0].text = text;
                            player.proxyWindow[0].setText(player.proxyWindow[0].text, false);


                            console.log(`player.nodestack ${player.nodeStack}`);
                            notFound = false;
                        }
                    }

                    if (notFound) {
                        this.setText("Unable to open a connection or host does not exist.");
                    } else {
                        // get remote accounts
                        let node = player.nodeStack[player.nodeStack.length-1];
                        if (this.accounts.includes(player.tryAuthName)) {
                            // found the username, skip to password
                            player.askedForPwd = true;
                            this.setText(nodes[player.nodeStack[player.nodeStack.length-1]].ip_address +
                                        "Enter password");
                        } else {
                            // ask for a username
                            player.askedForName = true;
                            this.setText(nodes[player.nodeStack[player.nodeStack.length-1]].ip_address +
                                        "Enter username");
                        }
                    }
                }
            } else if (command[0].toLowerCase() == "hangup") {
                while (audio.length > 1) {
                    //console.log(audio[audio.length - 1])
                    audio[audio.length - 1].stop();
                    audio.pop();
                    console.log(audio);
                }
                console.log(`audio ${audio}`);
                setAudioSource("./sfx/phone/click.mp3");
                this.setText("Disconnected...")

            } else if (command[0].toLowerCase() == "dial") {
                // call number
                let samples = ["freesound_community-answering-machine-107318.mp3",
                    "freesound_community-answering-machine-beeps-clicks-phone-line-hum-april-95wav-14468.mp3",
                    "freesound_community-answering-machine-female-out-of-town-103769.mp3",
                    "freesound_community-answering-machine-voice-1-26679.mp3",
                    "freesound_community-girl-voice-answering-phone-100740.mp3",
                    "freesound_community-phone-outgoing-call-72202.mp3",
                    "freesound_community-telephone_-_pick_up_hang_up_01_l_close_r_distant-32416.mp3",
                    "gautawa-old-phone-ring-272648.mp3",
                    "kave_msri-phone-calling-sfx-333916.mp3",
                    "locrpg-911-whats-your-emergency-104104.mp3",
                    "freesound_community-noanswer-33477.mp3",
                    "lucadialessandro-unavailable-phone-192489.mp3"];
                
                // stop previous if needed
                while (audio.length > 1) {
                    //console.log(audio[audio.length - 1])
                    audio[audio.length - 1].stop();
                    audio.pop();
                }
                if (audio.length > 0) {
                    audio[0] = `./sfx/phone/${samples[getRandInt(samples.length)]}`;
                } else {
                    audio.push(`./sfx/phone/${samples[getRandInt(samples.length)]}`);
                }
                this.setText(`Dailing... ${command[1]}`);
                let number = command[1].replace(/\D/g,'');
                // play dtmf, as short ring, then the audio queue
                playDTMF(number+"rh");
                
                
            } else if (command[0].toLowerCase() == "map") {
                let helpText = "Map Help:\n" +
                                "Various map related options\n" +
                                "\tformat: map [option]\n" +
                                "Toggle show/hide options:\n" +
                                "\tmap nodes\n" +
                                "\tmap cities\n" +
                                "reset to defaults:\n" +
                                "\tmap reset";
                if (command.length < 2) {
                    this.setText(helpText);
                } else if (command[1].toLowerCase() == "nodes") {
                    // toggle nodes
                    if (player.drawNodes) {
                        player.drawNodes = false;
                        this.setText("Hide nodes");
                    } else {
                        player.drawNodes = true;
                        mapNodeSteps = 0
                        this.setText("Show nodes");
                    }
                } else if (command[1].toLowerCase() == "cities") {
                    // toggle cities
                    if (player.drawCities) {
                        player.drawCities = false;
                        this.setText("Hide Cities");
                    } else {
                        player.drawCities = true;
                        mapCitiesSteps = 0
                        this.setText("Show Cities");
                    }
                } else if (command[1].toLowerCase() == "reset") {
                    // toggle reset
                    mapXOff = getWidth()/2;
                    mapYOff = getHeight()/2;
                    mapScale = 4;
                    mapSteps = 0;
                    mapCitiesSteps = 0;
                    mapNodeSteps = 0;
                    mapNodeStackSteps = 0;
                    mapInc = 2;
                    this.setText("Map reset to defaults");
                    updateMap = true;
                } else {
                    this.setText(helpText);
                }
            } else if (command[0].toLowerCase() == "clear") {

                // reset display text
                this.displayLines = [];
                this.displayLines.push(this.promptChar);

            } else if (command[0].toLowerCase() == "su") {

                // make uid admin: su 34093
                let user = player.uid;
                if (command[1] > 0) {
                    user = command[1];
                }
                // delet user: su -r 777
                if (command[1] && command[1].toLowerCase() == "-r") {
                    user == command[2];
                    if (user >= locations.length) {
                        this.text = `Invalid user, ${user} does not exist`;
                    } else if (this.admins.includes(user)) {
                        const s = this.admins.splice(1, user);
                        this.admins = s;
                        this.text = this.text = `Deleted user ${locations[user].homeowner} from admins group. \n`;
                    } else {
                        this.text = `Error: ${user} does not exist in admins group`;
                    }
                } else {
                    if (user >= locations.length) {
                        this.text = `Invalid user ${user} of only ${locations.length} known users`;
                    } else if (this.admins.includes(user)) {
                        this.text = this.text = `Error: ${locations[user].homeowner} is already in the admins group. \n`;
                    } else {
                        this.text = `${locations[user].homeowner} has been added to the super users group. \n`;
                        this.text += " \n ";
                        this.admins.push(user);
                        for (let i = 0; i < this.admins.length; i++) {
                            this.text += locations[this.admins[i]].homeowner + " (" + this.admins[i] + ")";
                            console.log(`i: ${i}, this.admins.lenght): ${this.admins.length}`);
                            if (i < this.admins.length -1 && this.admins.length > 1) {
                                this.text +=  ", \n";
                            }
                        }
                    }
                }

                this.textDisplayChar = 0;
                this.setText(this.text);

            } else if (command[0].toLowerCase() == "zoom") {

                if (command[1] < 0 || command[1] > 0) {
                    mapScale = parseInt(command[1]);
                } else {
                    this.setText("USAGE: zoom [level]");
                }
                mapInc = 2;
                mapSteps = 0;
                mapCitiesSteps = 0;
                mapNodeSteps = 0;
                mapNodeStackSteps = 0;
                updateMap = true;
                this.text = `Map Zoom is now ${mapScale}`;
                this.setText(this.text);
                this.textDisplayChar = 0;
            } else if (command[0].toLowerCase() == "scan") {
                if (command.length = 1) {
                    // default country scan
                    this.textDisplayChar = 0;
                    this.text = `Scanning ${player.selCountry}: \n`;
                    for (let i = 0; i < 100; i++) {
                        const r = getRandInt(nodes.length);
                        if (nodes[r].country == player.selCountry && !nodes[r].discoverd) {
                            nodes[r].discovered = true;
                            this.text += `Found...${nodes[r].ip_address}\n`;
                            this.setText(this.text);
                            mapNodeSteps = 0;
                            updateMap = true;
                        }
                    }
                    this.text += "Scan Complete"
                }
            } else if (command[0].toLowerCase() == "reg") {
                // show registerd user
                this.text = "";
                let l = locations[this.locNum];
                this.text += l.homeowner + ", \n";
                this.text += l["address"].street_number + " ";
                this.text += l["address"].street_name + ", \n";
                this.text += l["address"].district + ", ";
                this.text += l["address"].city + ", \n";
                this.text += l["address"].region + " ";
                this.text += l["address"].postal_code + " \n";
                this.text += l["address"].country;
                //console.log(this.text);
                this.textDisplayChar = 0;
                this.setText(this.text);
            } else if (command[0].toLowerCase() == "setparam") {
                //console.log(`this[command[1]]: ${this[command[1]]}`);
                // player enters: setparm textColor #FF0000
                if (command[1].toLowerCase() == "list") {
                    this.text = "";
                    for (var key in this) {
                        if (this.hasOwnProperty(key)) {
                            //console.log(key);
                            this.text += key + ", ";
                        }
                    }
                    this.setText(this.text);
                }

                if  (typeof this[command[1]] == "boolean") {
                    if (command[2].toLowerCase() == "true") {
                        this[command[1]] = true;
                    } else {
                        this[command[1]] = false;
                    }
                    this.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
                } else if (typeof this[command[2]] == "number") {
                    // convert numbers from string
                    this[command[1]] = Number(command[2]);
                    this.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
                } else {
                    this[command[1]] = command[2];
                    this.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
                }
            } else {
                this.setText(`INVALID COMMAND: ${command[0]}`);
            }
        } else {
            this.textDisplayChar = 0;
            this.text = "Command failed. Either the command does not exist or you do not have permission to use it.";
            this.setText(this.text);
        }
    }

    contains(x, y) {
        //console.log(`x: ${x} y: ${y} this.x: ${this.x1} this.y: ${this.y1}`)
        return this.x1 <= x && x <= this.x1 + this.xW &&
               this.y1 <= y && y <= this.y1 + this.yH;
    }

    draw() {
        // update the animation, blit the rect and boarders if fully open draw text.
        if (this.toOpen) {
            // is opening
            if (this.xP < this.xW) {
                this.xP += this.aniSpeed;
                if (this.xP > this.xW) {
                    this.xP = this.xW;
                }
            }
            if (this.yP < this.yH) {
                this.yP += this.aniSpeed;
                if (this.yP > this.yH) {
                    this.yP = this.yH;
                }
            }

            this.blitRect();

            if (this.xP == this.xW && this.yP == this.yH) {
                this.openedState();
            } else {
                this.aniSpeed += this.ease;
            }

        } else {
            // is closing
            if (this.xP > 0) {
                this.xP -= this.aniSpeed;
                if (this.xP < 0) {
                    this.xP = 0;
                }
            }
            if (this.yP > 0) {
                this.yP -= this.aniSpeed;
                if (this.yP < 0) {
                    this.yP = 0;
                }
            }
            
            this.blitRect();

            if (this.xP == 0 && this.yP == 0) {
                this.closedState();
            } else {
                this.aniSpeed -= this.ease;
            }
        }
    }

    blitRect() {
        ctx.strokeStyle = this.rectColor;
        //ctx.rectLineWidth = this.rectLineWidth;
        ctx.lineWidth = this.rectLineWidth;

        if (this.xP > 0 || this.yP > 0) {
            // background
            if (this.opaqueBackground) {
                ctx.fillStyle = this.backgroundColor;
                if (this.isRounded) {
                    ctx.beginPath();
                    ctx.roundRect(this.x1, this.y1, this.xP, this.yP, this.cornerRad);
                    ctx.fill();
                } else {
                    ctx.fillRect(this.x1, this.y1, this.xP, this.yP);
                }
    
            }

            // main rect
            if (this.isRounded) {
                ctx.beginPath();
                ctx.roundRect(this.x1, this.y1, this.xP, this.yP, this.cornerRad);
                ctx.stroke();
            } else {
                ctx.strokeRect(this.x1, this.y1, this.xP, this.yP);
            }

            // boarder
            if (this.hasBoarder) {
                ctx.lineWidth = this.boarderLineWidth;
                if (this.isRounded) {
                    ctx.beginPath();
                    ctx.roundRect(this.x1 - (this.boarderWidth * (this.xP/this.xW)),
                                    this.y1 - (this.boarderHeight * (this.yP / this.yH)),
                                    this.xP + ((this.boarderWidth * (this.xP/this.xW)) * 2),
                                    this.yP + ((this.boarderHeight * (this.yP / this.yH)) * 2),
                                    this.cornerRad);
                    ctx.stroke();
                } else {
                    ctx.strokeRect(this.x1 - (this.boarderWidth * (this.xP/this.xW)),
                                    this.y1 - (this.boarderHeight * (this.yP / this.yH)),
                                    this.xP + ((this.boarderWidth * (this.xP/this.xW)) * 2),
                                    this.yP + ((this.boarderHeight * (this.yP / this.yH)) * 2));
                }
            }
        }
    }
    
    openedState() {
        // initial text if needed
        if (this.displayLines.length == 0) {
            this.inputStr = "";
            this.setText(this.text);
        }

        // Set font and text color
        ctx.fillStyle = this.textColor;
        ctx.font = this.fontSize + "px " + this.textFont;

        // remove overflow lines
        if (this.type != "proxy") {
        while (this.displayLines.length > this.textMaxLines) {
            this.displayLines.shift();
            }
        }
        
        // draw the text
        //let toPrint = this.displayLines.slice(this.displayLines.length - this.wheelOff, this.textMaxLines);
        //console.log(toPrint);
        if (this.wheelOff > this.displayLines.length - this.textMaxLines) {
            this.wheelOff = this.displayLines.length - this.textMaxLines;
        }
        if (this.wheelOff < 0) {
            this.wheelOff = 0;
        }
        let max;
        if (this.textMaxLines < this.displayLines.length) {
            max = this.textMaxLines
        } else {
            max = this.displayLines.length;
        }
        for (let i = this.wheelOff; i <  this.displayLines.length; i++) {
            if (i - this.wheelOff < this.textMaxLines) {
            ctx.fillText(this.displayLines[i], this.x1 + this.fontSize/2, 
                        this.y1 + (this.fontSize) + (this.fontSize * 1.25 * (i-this.wheelOff)));
            }
        }
    }

    closedState() {
        this.textDisplayChar = 0;
        console.log("CloedState");
        console.log(`cast[cast.indexOf(this)]: ${cast[cast.indexOf(this)]}`)
        if (cast.indexOf(this) == 0) {
            // always reopen players computer
             this.toOpen = true;
             this.delete = false;
             this.xW = getWidth()/2;
             this.yH = getHeight()/2;
             this.xP = 1;
             this.yP = 1;
        } else if (this.delete) {
            // flush it
            const s = cast.splice(cast.indexOf(this)[0], 1);
            cast = s;

            console.log(`player.proxyWindow: ${player.proxyWindow}`);

            if (this == player.proxyWindow[0]) {
                player.proxyWindow.pop();
            }
        }
    }

    textWrapLines(ctx, text, maxWidth, tabAsSpace) {
        const newLine = String.raw`\n`;
        const tab = String.raw`\t`;
        var lines = [];
        var paragraphs = text.split(newLine);
        var paragraphs = text.split('\n');

        for (var p = 0; p < paragraphs.length; p++) {
          var currentLine = [];  
          var words = paragraphs[p].split(" ");

          for (var i = 0; i < words.length; i++) {
            var phrase = words[i].split(tab);
            var word = "";

            if (phrase.length > 1) {
              for (var x = 0; x < phrase.length; x++) {
                if (phrase[x].length < 1) {
                  if (tabAsSpace == 1) {
                    word += "  ";
                  } else {
                    word += tab;
                  }
                } else {
                  word += phrase[x];
                }
              }
            } else {
              word += phrase;
            }

            var width = (ctx.measureText(currentLine + " " + word).width);
            if (width < maxWidth) {
              if (currentLine.length > 0) {
                currentLine += " " + word;
              } else {
                currentLine += word;
              }
            } else {
                // to do deal with super long words
                lines.push(currentLine);
                currentLine = word;
            }
          }
          lines.push(currentLine);
        } 
        return lines;
      }
}
