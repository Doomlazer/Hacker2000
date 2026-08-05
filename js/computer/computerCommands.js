function commandHandler(win) {
    const command = win.inputStr.split(" ").filter(Boolean);
    win.inputStr = "";

    // user typed nothing
    if (command.length < 1) {
       command.push("");
    }

    // Check if the player is entering a username or password,
    // if not procees the commands
    if (player.askedForName) {
        // check USERNAME
        let notFound = true;
        let stack = player.nodeStack;
        let node = nodes[stack[stack.length-1]];

        // the account name the player entered
        player.tryAuthName = command;

        // try to match an account username
        for (let i = 0; i < node.accounts.length; i++) {
            // this is for setting the players 
            // name at the start of the game
            if (player.unactivated && i == 1) {
                node.accounts[i].user = player.tryAuthName;
            }

            if (node.accounts[i].user == player.tryAuthName) {
                // the entered username was valid, 
                // so ask for pwd next command
                notFound = false;
                player.authAccountIndex = i;
                player.askedForName = false;
                player.askedForPwd = true;
                win.authTries = 0;
                win.text = `${node.ip_address}: Enter password`;
                win.setText(win.text);
            }
        }

        // didn't match any accounts on the system
        if (notFound) {
            win.authTries ++;
            if (win.authTries >= 3) {
                win.setText("Invalid user. Too many attempts\nDisconnected...");
                player.askedForName = false;
                win.authTries = 0;
                logSSHDisconnect(win, node);
                player.nodeStack.pop();
                win.setProxyText();
            } else {
                win.setText("Invalid user. Enter username");
            }
        }
    } else if (player.askedForPwd) {
        // check user entered password

        //let notFound = true;
        let stack = player.nodeStack;
        let node = nodes[stack[stack.length-1]];
        let account = node.accounts[player.authAccountIndex];

        player.tryAuthPwd = command;

        // this is for setting the players password 
        // at the start of the game
        if (player.unactivated) {
            account.pwd = player.tryAuthPwd;
            player.unactivated = false;
        }

        // password was correct
        if (account.pwd == player.tryAuthPwd) {
            win.setText(`Welcome, ${account.user}`);
            let str = `${gameTimer.formatted()} - ${nodes[stack.length-2].ip_address} authenitcated with account ${account.user}\n`
            node.fileSystem.appendFile(node.logFile, str);

            // remember account for future auto authenitcation
            if (!node.compromisedAccounts.includes(player.authAccountIndex)) {
                node.compromisedAccounts.push(player.authAccountIndex);
            }

            // remember who signed in
            node.lastAuthAccount = player.authAccountIndex; 

            // clear fs dir (needed?)
            win.node.fileSystem.changeDirectory("\\"); 

            player.askedForPwd = false;
            win.authTries = 0;
            //notFound = false;
            node.compromisedAccounts.push(player.authAccountIndex);
        } else {
            // wrong password entered
            win.authTries ++;
            if (win.authTries >= 3) {
                win.setText("Invalid password. Too many attempts\nDisconnected...");
                logSSHDisconnect(win);
                player.nodeStack.pop();
                win.authTries = 0;
                win.setProxyText();
                win.askedForPwd = false;
            } else {
                win.setText("Incorrect. Enter password");
            }
        }
    } else {
        let bin = win.node.fileSystem.list("C:\\System\\bin\\", player.authAccountIndex, false);
        bin = bin.split("\n");
        bin = bin.slice(2);

        // for the commands, first check the node's bin folder 
        // to see if the command exists on the system
        //console.log("Available commands: " + bin);
        if (bin.includes(command[0].toLowerCase())) {
            switch (command[0].toLowerCase()) {
                case 'help':
                    // display help file
                    helpCommand(win);
                    break;
                case 'date':
                    // print current date/time
                    dateCommand();
                    break;
                case 'fullscreen':
                    // toggle fullscreen
                    fullscreenCommand(win);
                    break;
                case 'exit':
                    // close connection to system
                    exitCommand(win);
                    break;
                case 'ulist':
                    // list users
                    ulistCommand(win);
                    break;
                case 'audio':
                    // audio player
                    audioCommand(win, command);
                    break;
                case 'read':
                    // read files in scrolling window
                    readCommand(win, command);
                    break;
                case 'cd':
                    // change directory
                    cdCommand(win, command);
                    break;
                case 'ls':
                    // list dir contents
                    lsCommand(win, command);
                    break;
                case 'pwd':
                    // print working dir
                    pwdCommand(win);
                    break;
                case 'ssh':
                    // ssh [ip_address] or ssh [user@ip_address]
                    sshCommand(win, command);
                    break;
                case 'hangup':
                    // end a DIAL'd call
                    hangupCommand(win);
                    break;
                case 'dial':
                    // dial a phone number
                    dialCommand(win, command);
                    break;
                case 'map':
                    // map functions
                    mapCommand(win, command);
                    break;
                case 'clear':
                    // reset display text
                    clearCommand(win);
                    break;
                case 'su':
                    // super user escallation (might need work)
                    suCommand(win, command);
                    break;
                case 'scan':
                    // scan country for nodes
                    scanCommand(win, command);
                    break;
                case 'reg':
                    // show registerd user
                    regCommand(win);
                    break;
                default:
                    win.text = `ERROR: ${command[0]} - Unknown Command`;
                    win.setText(win.text);  
            }
        } else {
            win.text = `ERROR: ${command[0]} - Command does not exist on system`;
            win.setText(win.text);
        }
    }
}

function helpCommand(win) {
    spawnReadWin(win, "eventually this will be a help file!");
}

function dateCommand() {
    cast[0].setText(gameTimer.formatted());
}

function fullscreenCommand(win) {
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
}

function exitCommand(win) {
    win.setText("Goodbye...");
    if (player.nodeStack.length > 1) {
        let stack = player.nodeStack;
        let node = nodes[stack[stack.length-1]];

        // foget logged in user on system
        node.lastAuthAccount = -1;
        logSSHDisconnect(win);

        // remove from stack
        stack.pop();
        attachNode(win, nodes[stack.length-1]);
        win.setProxyText()

        // set authenticated user from the computer returned to by exiting
        node = nodes[stack[stack.length-1]];
        node.authAccountIndex = node.lastAuthAccount;
    } else {
        // exiting from player's computer
        win.toOpen = false;
        win.delete = true;
    }
}

function ulistCommand(win) {
    // list all users on computer
    let stack = player.nodeStack;
    let node = nodes[stack[stack.length-1]];
    let str = "Users: ";
    for (let i = 0; i < node.accounts.length; i ++) {
        str += node.accounts[i].user;
        if (i < node.accounts.length-1) {
            str += ", ";
        }
    }
    win.setText(str);
}

function audioCommand(win, command) {
    if (player.musicOn && command[1] == "stop") {
        player.musicOn = false;
        win.setText("Stopping Music audio...");
        backgroundMusic[0].audio.pause();
    } else {
        player.musicOn = true;
        if (player.audioPlayer == 0) {
            spawnAudioWin(win, command);
        }
        //console.log(command)
        if (command.length > 1) {
            // pass user provided url
            if (command[1].length > 0) {
                playMusic(win, command[1]);
            }
        } else {
            // pick random
            playMusic(win);
        }
    }
}

function readCommand(win, command) {
    let text;
    if (command.length > 1) {
        if (command[1].toLowerCase() == "log" ||
            command[1].toLowerCase() == "logs" ||
            command[1].toLowerCase() == "logfile") {
            text = nodes[player.nodeStack.length-1].fileSystem.readFile(
                nodes[player.nodeStack.length-1].logFile, player.authAccountIndex
            );
        } else {
            // read [path]
            text = nodes[player.nodeStack.length-1].fileSystem.readFile(
                command[1], player.authAccountIndex
            );
        }
    } else {
        text = "New File";
    }

    spawnReadWin(win, text);
}

function cdCommand(win, command) {
    let fs = win.node.fileSystem;
    win.setText(fs.changeDirectory(command[1], player.authAccountIndex));
}

function lsCommand(win, command) {
    // defaults to current directory if path not supplied
    let bool = false;
    let path = win.node.fileSystem.currectPath;
    if (command.length > 1) {
        // -a shows file details
        if (command[1] == "-a") {
            bool = true
            if (command.length > 2) {
                path = win.node.fileSystem.resolvePath(command[2]);
            }
        } else {
            path = win.node.fileSystem.resolvePath(command[1]);
        }
    }
    win.setText(win.node.fileSystem.list(path, player.authAccountIndex, bool));
}

function pwdCommand(win) {
    win.setText(win.node.fileSystem.getCurrentDirectory());
}

function sshCommand(win, command) {
    // ssh [ip_address] or ssh [user@ip_address]

    // spawn proxy window if one doesn't exist
    if (player.proxyWindow.length < 1) {
        spawnProxyWin(win);
    }
    win.setText("Connecting...", false);
    // searches nodes until ip found and addis it to the connection chain
    if (command.length < 2) {
        // ssh command HELP string
        win.setText(
            `ssh \- OpenSSH remote login client
            \tssh [ip address]
            \tssh [user]@[ip address]`
        );
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

        // try to find the ip address
        let notFound = true;
        for (let i of nodes) {
            if (ip == i.ip_address) {
                player.nodeStack.push(i.id);
                win.setProxyText();
                attachNode(win, nodes[i.id]);
                logSSH(win);
                notFound = false;
            }
        }

        // if the ip_address was found, 
        // then try to find the account
        if (notFound) {
            win.setText("Unable to open a connection or host does not exist.");
        } else {
            let stack = player.nodeStack;
            let node = nodes[stack[stack.length-1]];

            // Auto Auth if no username provided and previously compromised
            if (addr.length < 2 && node.compromisedAccounts.length > 0) {
                // no username was provided so 
                // use the first compromised account
                player.authAccountIndex = node.compromisedAccounts[0];
                let account = node.accounts[player.authAccountIndex].user;
                win.setText(`Auto authenticating ${account}...`, false);
                win.setText(`Welcome, ${account}`);
                node.lastAuthAccount = node.compromisedAccounts[0];
            } else {
                // TESTING ONLY - DELETE
                // Print the account info to console.log()
                console.log("User: " + node.accounts[1].user + ", pwd: " + node.accounts[1].pwd);
                // TESTING ONLY - DELETE

                if (node.accounts.includes(player.tryAuthName)) {
                    // found the username, 
                    // ask for password next input
                    player.askedForPwd = true;
                    win.setText(node.ip_address + ": Enter password");
                } else {
                    // Didn't find the account provided by player, 
                    // so ask for a username again
                    player.askedForName = true;
                    win.setText(node.ip_address + ": Enter username");
                }
            }
        }
    }
}

function hangupCommand(win) {
    setAudioSource("./sfx/phone/click.mp3", phoneAudio);
    win.setText("Disconnected...")
}

function dialCommand(win, command) {
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
        "lucadialessandro-unavailable-phone-192489.mp3"
    ];
    
    // store the random answer message. 
    // To Do: make numbers and the answer messages persistent
    player.phoneMessage = `./sfx/phone/${samples[getRandInt(samples.length)]}`;
    win.setText(`Dailing... ${command[1]}`);

    // filter non-numbers from dial string
    let number = command[1].replace(/\D/g,'');

    // play dtmf sequence, a short ring, 
    // then the answer message
    playDTMF(number+"rh");
}

function mapCommand(win, command) {
    let helpText = 
        `Map Help:
        Various map related options
        \tformat: map [option]
        Toggle show/hide options:
        \tmap nodes
        \tmap cities
        reset to defaults:
        \tmap reset`;

    if (command.length < 2) {
        // not enough args, show map command help
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
        // re-center the map on screen
        mapXOff = getWidth()/2;
        mapYOff = getHeight()/2;
        mapSteps = 0;
        mapCitiesSteps = 0;
        mapNodeSteps = 0;
        mapNodeStackSteps = 0;
        mapInc = 1;
        win.setText("Map centered");
    } else if (command[1].toLowerCase() == "reset") {
        // reset map to the origional settings
        mapXOff = getWidth()/2;
        mapYOff = getHeight()/2;
        mapScale = 4;
        mapSteps = 0;
        mapCitiesSteps = 0;
        mapNodeSteps = 0;
        mapNodeStackSteps = 0;
        mapInc = 1;
        win.setText("Map reset to defaults");
    } else if (command[1].toLowerCase() == "zoom") {
        if (parseInt(command[2]) > 0) {
            mapScale = parseInt(command[2]);
            mapSteps = 0;
            mapCitiesSteps = 0;
            mapNodeSteps = 0;
            mapNodeStackSteps = 0;
            mapInc = 1;
            win.text = `Map Zoom is now ${mapScale}`;
            win.setText(win.text);
        } else {
            win.setText("USAGE: map zoom [level]");
        }
    } else {
        // the supplied argument doesn't exist, 
        // show map command help string
        win.setText(helpText);
    }
}

function clearCommand(win) {
    // clear everything but the prompt character usually
    win.displayLines = [];
    win.displayLines.push(win.promptChar);
}

function suCommand(win, command) {
    // make uid admin: su [account id]
    // To Do:
    // not really used, might need testing/removal
    let user = player.uid;
    if (command[1] > 0) {
        user = command[1];
    }
    // delet user: su -r [account id]
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

    win.setText(win.text);
}

function scanCommand(win, command) {
    // To Do: rework scanning feature
    if (command.length == 1) {
        // default country scan
        win.textDisplayChar = 0;
        win.text = `Scanning ${player.selCountry}: \n`;
        // only scans 100 random nodes at a time 
        // and hopes one is in the selected country
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
}

function regCommand(win) {
    // shows node 'registration' info
    // To Do: this command is lame, improve it
    let l = locations[win.locNum];
    let address = l["address"];

    win.text = `${l.homeowner},
        ${address.street_number} ${address.street_name}
        ${address.district}, ${address.city},
        ${address.region} ${address.postal_code}
        ${address.country}`;

    win.setText(win.text);
}

function setparamCommand(win, command) {
    // probably needs improvement 
    // move some params out of animation window at least

    // list all available params
    if (command[1].toLowerCase() == "list") {
        win.text = "";
        for (var key in this) {
            if (win.hasOwnProperty(key)) {
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
}