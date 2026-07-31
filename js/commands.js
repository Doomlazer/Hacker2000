function commandHandler(win) {
    const command = win.inputStr.split(" ");
    win.inputStr = "";
    console.log(`sent command ${command}`)

    // all systems must have an exit command, approved commands and admins are optional
    if (win.approvedComands.includes(command[0].toLowerCase())
        || win.admins.includes(player.uid)
        || command[0].toLowerCase() == "exit") {
        
        if (player.askedForName) {
            // check USERNAME
            player.tryAuthName = command;
            let notFound = true;
            let node = nodes[player.nodeStack[player.nodeStack.length-1]];
            for (let i = 0; i < node.accounts.length; i++) {
                //console.log(`node.accounts[i].user: ${node.accounts[i].user} player.tryAuthName: ${player.tryAuthName}`);
                if (player.unactivated && i == 1) {
                    node.accounts[i].user = player.tryAuthName;
                }
                if (node.accounts[i].user == player.tryAuthName) {
                    // the entered username was valid, ask for pwd
                    notFound = false;
                    player.authAccountIndex = i;
                    player.askedForName = false;
                    player.askedForPwd = true;
                    win.authTries = 0;
                    win.text = node.ip_address + 
                                ": Enter password";
                    win.setText(win.text);
                }
            }
            if (notFound) {
                win.authTries ++;
                if (win.authTries >= 3) {
                    win.setText("Invalid user. Too many attempts\nDisconnected...");
                    player.askedForName = false;
                    win.authTries = 0;
                    player.nodeStack.pop();
                    win.setProxyText();
                } else {
                    win.setText("Invalid user. Enter username");
                }
            }
        } else if (player.askedForPwd) {
            // check PASSWORD
            let node = nodes[player.nodeStack[player.nodeStack.length-1]];
            player.tryAuthPwd = command;
            let notFound = true;
            if (player.unactivated) {
                node.accounts[player.authAccountIndex].pwd = player.tryAuthPwd;
                player.unactivated = false;
            }
            //console.log("node.accounts[player.authAccountIndex].pwd: " + node.accounts[player.authAccountIndex].pwd + ", player.tryAuthPwd: " + player.tryAuthPwd);
            if (node.accounts[player.authAccountIndex].pwd == player.tryAuthPwd) {
                win.setText(`Welcome, ${node.accounts[player.authAccountIndex].user}`);
                if (!node.compromisedAccounts.includes(player.authAccountIndex)) {
                    node.compromisedAccounts.push(player.authAccountIndex);
                }
                node.lastAuthAccount = player.authAccountIndex; // remember who is signed in.
                fs.changeDirectory("\\"); //clear file path
                player.askedForPwd = false;
                win.authTries = 0;
                notFound = false;
                node.compromisedAccounts.push(player.authAccountIndex);
            }
            if (notFound) {
                win.authTries ++;
                if (win.authTries >= 3) {
                    win.setText("Invalid password. Too many attempts\nDisconnected...");
                    player.nodeStack.pop();
                    win.authTries = 0;
                    win.setProxyText();
                    win.askedForPwd = false;
                } else {
                    win.setText("Incorrect. Enter password");
                }
            }
        
        } else if (command[0].toLowerCase() == 'fullscreen') {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                cast[0].setText("Entering Fullscreen...");
            } else {
                document.exitFullscreen();
                cast[0].setText("Exiting Fullscreen...");
            }
            doResize();
            mapXOff = getWidth()/3 * 2;
            mapYOff = getHeight()/2;
            mapSteps = 0;
            mapInc = 0;
            mapCitiesSteps = 0;
            mapNodeSteps = 0;
            mapNodeStackSteps = 0;
        } else if (command[0].toLowerCase() == "exit") {
            win.setText("Goodbye...");
            if (player.nodeStack.length > 1) {
                // foget logged in user on system
                let node = nodes[player.nodeStack[player.nodeStack.length-1]];
                node.lastAuthAccount = -1;
                fs.changeDirectory("\\");

                // remove from stack
                player.nodeStack.pop();
                player.proxyWindow[0].wheelOff --; // needed?
                win.setProxyText()
                // set preious authenticated user
                node = nodes[player.nodeStack[player.nodeStack.length-1]];
                node.authAccountIndex = node.lastAuthAccount;
            } else {
            win.toOpen = false;
            win.delete = true;
            }

        } else if (command[0].toLowerCase() == "ulist") {
            let node = nodes[player.nodeStack[player.nodeStack.length-1]];
            let str = "Users: ";
            for (let i = 0; i < node.accounts.length; i ++) {
                str += node.accounts[i].user;
                if (i < node.accounts.length-1) {
                    str += ", ";
                }
            }
            win.setText(str);
        } else if (command[0].toLowerCase() == "music") {
            if (player.musicOn) {
                player.musicOn = false;
                win.setText("Stopping...");
                while (backgroundMusic.length > 0) {
                    backgroundMusic[backgroundMusic.length - 1].stop();
                    backgroundMusic.pop();
                }
            } else {
                player.musicOn = true;
                win.setText("Playing...");
                playMusic();
            }

        } else if (command[0].toLowerCase() == "read") {
            // read files in scrolling window
            if (player.readerWindow.length < 1) {
                let rw = new aniRect(win.rX1, win.rY1, win.rXW, win.rYH);
                //console.log("2nf " + cast[cast.length-1]);
                rw.fontSize = win.readerFontSize;
                rw.acceptInput = false;
                rw.backgroundColor = win.readerBackgroundColor;
                rw.rectColor = win.readerRectColor;
                rw.textColor = win.readerTextColor
                rw.isRounded = win.readerIsRounded;
                rw.hasBoarder = win.readerHasBoarder;
                rw.type = "reader";
                cast.push(rw);
                player.readerWindow.push(rw);
                rw.setText(file, false);
                win.setText("Opening...");
            }
        } else if (command[0].toLowerCase() == "cd") {
            console.log(player.authAccountIndex);
            win.setText(fs.changeDirectory(command[1], player.authAccountIndex));
        } else if (command[0].toLowerCase() == "ls") {
            let bool = false;
            let path = fs.currectPath;
            if (command.length > 1) {
                if (command[1] == "-a") {
                    bool = true
                    if (command.length > 2) {
                        path = fs.resolvePath(command[2]);
                    }
                } else {
                    path = fs.resolvePath(command[1]);
                }
            }
            win.setText(fs.list(path, player.authAccountIndex, bool));
        } else if (command[0].toLowerCase() == "pwd") {
            win.setText(fs.getCurrentDirectory());
        } else if (command[0].toLowerCase() == "ssh") {
            // accepts either ip or uNam@ip
            // spawn proxy window if one doesn't exist
            if (player.proxyWindow.length < 1) {
                let pw = new aniRect(win.pX1, win.pY1, win.pXW, win.pYH);
                //console.log("2nf " + cast[cast.length-1]);
                pw.fontSize = win.proxyFontSize;
                pw.acceptInput = false;
                pw.backgroundColor = win.proxyBackgroundColor;
                pw.rectColor = win.proxyRectColor;
                pw.textColor = win.proxyTextColor
                pw.isRounded = win.proxyIsRounded;
                pw.hasBoarder = win.proxyHasBoarder;
                pw.type = "proxy";
                cast.push(pw);
                player.proxyWindow.push(pw);
                win.setProxyText();
            }

            win.setText("Connecting...", false);
            // searches nodes until ip found and addis it to the connection chain
            if (command.length < 2) {
                win.setText("ssh \- OpenSSH remote login client\n\tssh [ip address]\n\tssh [user]@[ip address]");
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
                console.log(`sshing to: ${player.tryAuthName}@${ip}`)
                // find the ip address
                let notFound = true;
                for (let i of nodes) {
                    if (ip == i.ip_address) {
                        //console.log(i.id)
                        //console.log(i)
                        player.nodeStack.push(i.id);
                        win.setProxyText();
                        //console.log(`player.nodestack ${player.nodeStack}`);
                        notFound = false;
                    }
                }

                if (notFound) {
                    win.setText("Unable to open a connection or host does not exist.");
                } else {
                    // get remote accounts
                    let node = nodes[player.nodeStack[player.nodeStack.length-1]];
                    // Auto Auth if no user provided and previously compromised
                    if (addr.length < 2 && node.compromisedAccounts.length > 0) {
                        player.authAccountIndex = node.compromisedAccounts[0];
                        win.setText("Auto authenticating " + node.accounts[player.authAccountIndex].user + "...", false);
                        win.setText(`Welcome, ${node.accounts[player.authAccountIndex].user}`);
                        node.lastAuthAccount = node.compromisedAccounts[0];
                        fs.changeDirectory("\\");
                        //player.nodeStack.push(win.id);
                    } else {
                        // free account info - testing only
                        //
                        console.log("User: " + node.accounts[1].user + ", pwd: " + node.accounts[1].pwd)
                        // END free account info - testing only
                        //
                        if (node.accounts.includes(player.tryAuthName)) {
                            // found the username, skip to password
                            player.askedForPwd = true;
                            win.setText(node.ip_address + ": Enter password");
                        } else {
                            // ask for a username
                            player.askedForName = true;
                            win.setText(node.ip_address + ": Enter username");
                        }
                    }
                }
            }
        } else if (command[0].toLowerCase() == "hangup") {
            while (audio.length > 1) {
                //console.log(audio[audio.length - 1])
                phoneAudio[phoneAudio.length - 1].stop();
                phoneAudio.pop();
                //console.log(phoneAudio);
            }
            //console.log(`phoneAudio ${phoneAudio}`);
            setAudioSource("./sfx/phone/click.mp3");
            win.setText("Disconnected...")

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
            while (phoneAudio.length > 1) {
                //console.log(audio[audio.length - 1])
                phoneAudio[phoneAudio.length - 1].stop();
                phoneAudio.pop();
            }
            if (phoneAudio.length > 0) {
                phoneAudio[0] = `./sfx/phone/${samples[getRandInt(samples.length)]}`;
            } else {
                phoneAudio.push(`./sfx/phone/${samples[getRandInt(samples.length)]}`);
            }
            win.setText(`Dailing... ${command[1]}`);
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
                win.setText(helpText);
            } else if (command[1].toLowerCase() == "nodes") {
                // toggle nodes
                if (player.drawNodes) {
                    player.drawNodes = false;
                    win.setText("Hide nodes");
                } else {
                    player.drawNodes = true;
                    mapNodeSteps = 0
                    win.setText("Show nodes");
                }
            } else if (command[1].toLowerCase() == "cities") {
                // toggle cities
                if (player.drawCities) {
                    player.drawCities = false;
                    win.setText("Hide Cities");
                } else {
                    player.drawCities = true;
                    mapCitiesSteps = 0
                    win.setText("Show Cities");
                }
            } else if (command[1].toLowerCase() == "center") {
                mapXOff = getWidth()/2;
                mapYOff = getHeight()/2;
                mapSteps = 0;
                mapCitiesSteps = 0;
                mapNodeSteps = 0;
                mapNodeStackSteps = 0;
                mapInc = 2;
                win.setText("Map centered");
                updateMap = true;
            } else if (command[1].toLowerCase() == "reset") {
                mapXOff = getWidth()/2;
                mapYOff = getHeight()/2;
                mapScale = 4;
                mapSteps = 0;
                mapCitiesSteps = 0;
                mapNodeSteps = 0;
                mapNodeStackSteps = 0;
                mapInc = 2;
                win.setText("Map reset to defaults");
                updateMap = true;
            } else {
                win.setText(helpText);
            }
            updateMap = true;
        } else if (command[0].toLowerCase() == "clear") {

            // reset display text
            win.displayLines = [];
            win.displayLines.push(win.promptChar);

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
                    win.text = `Invalid user, ${user} does not exist`;
                } else if (win.admins.includes(user)) {
                    const s = win.admins.splice(1, user);
                    win.admins = s;
                    win.text = win.text = `Deleted user ${locations[user].homeowner} from admins group. \n`;
                } else {
                    win.text = `Error: ${user} does not exist in admins group`;
                }
            } else {
                if (user >= locations.length) {
                    win.text = `Invalid user ${user} of only ${locations.length} known users`;
                } else if (win.admins.includes(user)) {
                    win.text = win.text = `Error: ${locations[user].homeowner} is already in the admins group. \n`;
                } else {
                    win.text = `${locations[user].homeowner} has been added to the super users group. \n`;
                    win.text += " \n ";
                    win.admins.push(user);
                    for (let i = 0; i < win.admins.length; i++) {
                        win.text += locations[win.admins[i]].homeowner + " (" + win.admins[i] + ")";
                        console.log(`i: ${i}, win.admins.lenght): ${win.admins.length}`);
                        if (i < win.admins.length -1 && win.admins.length > 1) {
                            win.text +=  ", \n";
                        }
                    }
                }
            }

            win.textDisplayChar = 0;
            win.setText(win.text);

        } else if (command[0].toLowerCase() == "zoom") {

            if (command[1] < 0 || command[1] > 0) {
                mapScale = parseInt(command[1]);
            } else {
                win.setText("USAGE: zoom [level]");
            }
            mapInc = 2;
            mapSteps = 0;
            mapCitiesSteps = 0;
            mapNodeSteps = 0;
            mapNodeStackSteps = 0;
            updateMap = true;
            win.text = `Map Zoom is now ${mapScale}`;
            win.setText(win.text);
            win.textDisplayChar = 0;
        } else if (command[0].toLowerCase() == "scan") {
            if (command.length = 1) {
                // default country scan
                win.textDisplayChar = 0;
                win.text = `Scanning ${player.selCountry}: \n`;
                for (let i = 0; i < 100; i++) {
                    const r = getRandInt(nodes.length);
                    if (nodes[r].country == player.selCountry && !nodes[r].discoverd) {
                        nodes[r].discovered = true;
                        win.text += `Found...${nodes[r].ip_address}\n`;
                        win.setText(win.text);
                        mapNodeSteps = 0;
                        updateMap = true;
                    }
                }
                win.text += "Scan Complete"
            }
        } else if (command[0].toLowerCase() == "reg") {
            // show registerd user
            win.text = "";
            let l = locations[win.locNum];
            win.text += l.homeowner + ", \n";
            win.text += l["address"].street_number + " ";
            win.text += l["address"].street_name + ", \n";
            win.text += l["address"].district + ", ";
            win.text += l["address"].city + ", \n";
            win.text += l["address"].region + " ";
            win.text += l["address"].postal_code + " \n";
            win.text += l["address"].country;
            //console.log(win.text);
            win.textDisplayChar = 0;
            win.setText(win.text);
        } else if (command[0].toLowerCase() == "setparam") {
            // allow players to list and change all window prperties
            // player enters: setparm textColor #FF0000
            if (command[1].toLowerCase() == "list") {
                win.text = "";
                for (var key in this) {
                    if (win.hasOwnProperty(key)) {
                        //console.log(key);
                        win.text += key + ", ";
                    }
                }
                win.setText(win.text);
            }

            if  (typeof this[command[1]] == "boolean") {
                if (command[2].toLowerCase() == "true") {
                    this[command[1]] = true;
                } else {
                    this[command[1]] = false;
                }
                win.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
            } else if (typeof this[command[2]] == "number") {
                // convert numbers from string
                this[command[1]] = Number(command[2]);
                win.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
            } else {
                this[command[1]] = command[2];
                win.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
            }
        } else {
            win.setText(`INVALID COMMAND: ${command[0]}`);
        }
    } else {
        win.textDisplayChar = 0;
        win.text = "Command failed. Either the command does not exist or you do not have permission to use it.";
        win.setText(win.text);
    }
}