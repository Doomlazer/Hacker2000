function generateGiberish(length) {
    let source = 'J¥®—£Hì*]¥©” ßP£aqwJùJµ™X≥jµ◊ë¬äK¿◊≥gÀ™]Àv,∑L€ùKÆ]ûtÛ\nÍ{∑ØÀΩd-VÎ∑0»¡fÕ2±·«+v(Y!»ò->òX2ﬂÑy3ã÷∫' +
    'mA±C+∫ØÍÑQÂwjo2i<∑uŸ¥. äK±Ïi∂≥ˇÕªdÏåuπ@@ç—˜@” übøNeÒÁ“5Büæ=\n˚Q∂ƒ√ß~˝pwkÕçØw3 e\n3 K—ﬂ£óˇì>·óﬂw\tÂÒg”~∏/ÈÁüÅ3_L„ŸGûbÿò' +
    'ÉAÿá*8^F"Nò\t†Ä ãqòwerúádyff5s≤Ie\t8bÜΩ¯¢®  3^wjÿ¢wt¬HRê,ÜòB4 doi 2fj<.i!tâq\tGÈë>vV$B∫Ê†éÌ·sd9ver\tveusd„≥∂zõµeP3Ïˇ‡Äï1hr' +
    'l˚ÕÿíAZ\nYà‰m†ôPgi;  ißófû9ÇjF ∆Êñ tÜ«ÊÖc÷g\nhidÇ9¶[N‰†ˇ}>$£ èö…€åvöcz{Z◊ËóQi§ ïx®‡%*%ä:h®   ùéJj±Nâß¢án:‰' +``
    'ãçrÙhû∑ÈÍ FOàÍáy¡≈\nÇ8+r«y#•Ÿ“∞\tÕ∂é2+∏2usdfwese„≥∂WEFW Ez õúπg“∆∑”f,πÌ*g ºVJ˚ë®}nú˚Ry+öÏ÷\ta¡%Y,°w0Ω"Ïp≠ø¬Ÿé±W«≈' +
    'ãÒ∂ Ëkóæ\n®1d«≈hmÑmº\nuÈ~upfefefRñ™%¥BÖU . û∫e!Œ¥\näåûBksµÆœ3wÃÓ¥“™—@•—4ÈÏÒTP3ÖˇTsÌh«u0WYÁT6LÆΩí\txXHµ\nÆNnõ§•±Y2mÕc”Å◊-' +
    'Èlµ6$¯ﬁ4^ï6Ÿ c˚lãMGqôﬁNUœ. \n  Ä«çï≥6\tNy¿_GÖ9„fw8>€∑efefefgeØer^+ïíöü€zer\ngeåØsdff\ne˘π≥ñ;≈:Ÿª≈nÔØ∫OY˚R∑s∫§m÷X|ÓΩüJtÚ¬XÓç/¨‰7ÇÃ|' +
    '∏|´Ã„Û◊ß«π¬÷?\n 67Øe∫ﬂŒ≥ƒƒSﬂr≥# y>≤Àwø^óÚ^?ßÒ«ÁŸ ﬁˇyPJ5 6Ï£bnhi    owKm™®ÛtiNqÊ¿©∞2Q\tíù…eefeffexfÚª®5î¥∫÷>?ôMZ£ßF©' +
    'D·}*¯≤Ì±D`7Ï÷hæÇ Jjaò\tﬁ/™©pM9LEHDGÉ+¢\tŸ45øÒf1ÏU™¨\n«¢¿±Îà23Qî\t†i»∏=%ëUìõ7?ΩœÉ!™!€àøÄÒ\npw0 vwƒ\t96?JT1÷÷ñ&√ë±yWæP¬pâÊµ™Ö' +
    'úrI-ïππ\nei7é!¥46é∫Óq~ tó˚níÀÍ¿J\nñˇmnÛám|ï-ÉIqéÛM?4g‰ ÑπBoõÌ<êR¥*í\nôÓÉ∞∏efef‡¿©úMt1$¢ ÛêÂí£@=E≈AíÍ.    ';

    let str = "";
    let l = source.length - 5;
    for (let i = 0; i < l; i ++) {
        let r = getRandInt(l);
        str += source.slice(r, r + getRandInt(5));
    }

    return str;
}

async function createFS(n) {

    const fs =
        await FileSystem.load(n);


    if (fs.existsOnDisk) {
        // already exists
        return fs;
    }

    if(!nodes[n]) {
        console.error("MISSING NODE:",n);
        throw new Error(`nodes[${n}] does not exist`);
    }

    if(!nodes[n].accounts) {
        console.error("MISSING ACCOUNTS:",n,nodes[n]);
        throw new Error(`nodes[${n}].accounts does not exist`);
    }

    if(!nodes[n].accounts[1]) {
        console.error("MISSING ACCOUNT[1]:",n,nodes[n]);
        throw new Error(`nodes[${n}].accounts[1] does not exist`);
    }

    const user =
        nodes[n].accounts[1].user;


    //==================================================
    // Folders
    //==================================================

    fs.createFolder(
        "C:\\Users",
        0,
        0
    );

    fs.createFolder(
        "C:\\Users\\root",
        0,
        0
    );

    fs.createFolder(
        `C:\\Users\\${user}`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\${user}\\Desktop`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\${user}\\Documents`,
        1,
        0
    );

    if (n == 0) {
        // let player find email account
        let str = "email provider: " + locations[0].email.split("@")[1] + "\n" + 
        "username: " + nodes[n].accounts[1].user + "\n" + 
        "password: " + nodes[n].accounts[1].pwd
        fs.createFile(
            `C:\\Users\\${user}\\Documents\\MailAccount.txt`,
            0,
            0,
            str,
            0
        );
    }

    fs.createFolder(
        `C:\\Users\\${user}\\Music`,
        1,
        0
    );


    fs.createFolder(
        "C:\\System",
        0,
        0
    );

    fs.createFolder(
        "C:\\System\\logs",
        0,
        0
    );

    fs.createFolder(
        "C:\\System\\bin",
        0,
        0
    );


    //==================================================
    // Files
    //==================================================

    fs.createFile(
        "C:\\config.cfg",
        0,
        0,
        generateGiberish(
            getRandInt(200) + 200
        ),
        0
    );


    fs.createFile(
        "C:\\System\\logs\\logs.txt",
        0,
        0,
        nodes[n].ip_address + "\nnode.id " + nodes[n].id +
        "\nLOG FILE:\n",
        0
    );


    //==================================================
    // Standard commands
    //==================================================

    fs.createFile(
        "C:\\System\\bin\\exit",
        0,
        0,
        generateGiberish(32),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\ls",
        0,
        0,
        generateGiberish(63),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\ulist",
        0,
        0,
        generateGiberish(23),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\read",
        0,
        0,
        generateGiberish(113),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\cd",
        0,
        0,
        generateGiberish(12),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\pwd",
        0,
        0,
        generateGiberish(42),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\ssh",
        0,
        0,
        generateGiberish(32),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\clear",
        0,
        0,
        generateGiberish(32),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\su",
        0,
        0,
        generateGiberish(32),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\mail",
        0,
        0,
        generateGiberish(62),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\reg",
        0,
        0,
        generateGiberish(42),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\date",
        0,
        0,
        generateGiberish(12),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\clock",
        0,
        0,
        generateGiberish(36),
        0
    );

    //==================================================
    // Player computer
    //==================================================

    if (n === 0) {

        fs.createFile(
            "C:\\System\\bin\\setparam",
            0,
            0,
            generateGiberish(62),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\fullscreen",
            0,
            0,
            generateGiberish(142),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\scan",
            0,
            0,
            generateGiberish(172),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\map",
            0,
            0,
            generateGiberish(372),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\speak",
            0,
            0,
            generateGiberish(113),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\hangup",
            0,
            0,
            generateGiberish(42),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\dial",
            0,
            0,
            generateGiberish(32),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\audio",
            0,
            0,
            generateGiberish(234),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\help",
            0,
            0,
            generateGiberish(23),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\deck",
            0,
            0,
            generateGiberish(116),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\ms",
            0,
            0,
            generateGiberish(116),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\brute",
            0,
            0,
            generateGiberish(33),
            0
        );
        fs.createFile(
            "C:\\System\\bin\\mal",
            0,
            0,
            generateGiberish(3),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\dnslookup",
            0,
            0,
            generateGiberish(33),
            0
        );
    }


    if (locpnum == n) {
        fsV1d30Dr0m3(fs, n)
    }

    //==================================================
    // Attributes
    //==================================================

    fs.setAttributes(
        "C:\\System",
        {
            readOnly: false,
            system: true
        },
        0
    );


    fs.setAttributes(
        "C:\\Users\\root",
        {
            readOnly: false,
            system: true
        },
        0
    );

    return fs;
}

function fsDNS(fs, ip, n) {
    //console.log("fsdns ip: ", ip, " node number ", n);
    fs.createFolder(
        `C:\\System\\DNS`,
        1,
        0
    );
    fs.createFile(
        `C:\\System\\DNS\\entries.txt`,
        0,
        0,
        JSON.stringify(DNSKeys),
        0
    );
    //console.log(ip, fs.readFile(`C:\\System\\DNS\\entries.txt`, 0))
    fs.createFile(
        `C:\\System\\bin\\dns`,
        0,
        0,
        generateGiberish(23),
        0
    );
    nodes[n].ip_address = ip;
}

function fsV1d30Dr0m3(fs, n) {
    //
    // Mal90 Author, 15 yrld nerd
    //
    fs.createFolder(
        `C:\\Users\\V1d30Dr0m3`,
        1,
        0
    );

    nodes[n].accounts.push({"user": "V1d30Dr0m3", "pwd":"password", "admin": true, "userId":n})
    fs.createFolder(
        `C:\\Users\\V1d30Dr0m3`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\V1d30Dr0m3\\Desktop`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\V1d30Dr0m3\\Documents`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\V1d30Dr0m3\\Music`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\V1d30Dr0m3\\Documents\\mal90`,
        1,
        0
    );
    fs.createFolder(
        `C:\\Users\\V1d30Dr0m3\\Documents\\mal90\\SourceCode`,
        1,
        0
    );
    fs.createFolder(
        `C:\\Users\\V1d30Dr0m3\\Documents\\mal90\\SourceCode\\TonySoft`,
        1,
        0
    );
    fs.createFile(
        `C:\\Users\\V1d30Dr0m3\\Documents\\mal\\mal90.txt`,
        0,
        0,
        `ToDo:
        \tRemove spyware
        \tCalculatar App
        \tWindow click order`,
        0
    );
    fs.createFile(
        `C:\\Users\\V1d30Dr0m3\\Documents\\mal90\\SourceCode\\TonySoft\\main.src`,
        0,
        0,
        generateGiberish(257),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\nuke",
        0,
        0,
        generateGiberish(33),
        0
    );

    fs.createFile(
        `C:\\Users\\V1d30Dr0m3\\Documents\\waterCycle.txt`,
        0,
        0,
        `The Importance of the Water Cycle
        by Larry ${locations[n].homeowner.split(" ")[1]}
        Ms. Thompsons class
        Grade 11

The water cycle is the continuous movement of water through Earth’s atmosphere, land, and oceans. It is an important natural process because it provides fresh water for plants, animals, and people. Water changes forms as it moves through the cycle, becoming a liquid, solid, or gas. The main stages of the water cycle are evaporation, condensation, precipitation, and collection.

Evaporation occurs when the Sun heats water in oceans, lakes, rivers, and other bodies of water. The heat changes liqiud water into water vapor, which rises into the atmosphere. Plants also release water vapor through a process called transpiration. Together, evaporation and transpration add moisture to the air.

As water vapor rises, it cools and changes into tiny water droplets. This process is called condensation. The droplets gather around small particles in the atmosphere and form clouds. When enough water collects in the clouds, the droplets become heavy and fall back to Earth as precipitation.

Precipitation can take many forms, including rain, snow, sleet, and hail. After it reaches the ground, water may flow into rivers and oceans, soak into the soil, or become stored as ice and groundwater. This stage is called collection. Eventually, the Sun heats the water again, and the cycle repeats.

In conclusion, the water cycle is essential to life on Earth. It continuously recycles water and distributes it across the planet. Without this process, many living things would not have enough fresh water to survive. By understanding the water cycle, people can better appreciate the importance of protecting water resources.`,
        0
    );
}

function spawnReadWin(win, text) {
    // a text reader window
    let rw = new aniRect(win.rX1 + (player.readerWindow.length * 20),
                            win.rY1 + (player.readerWindow.length * 20), 
                            win.rXW, win.rYH);
    rw.fontSize = win.readerFontSize;
    rw.acceptInput = false;
    rw.backgroundColor = win.readerBackgroundColor;
    rw.rectColor = win.readerRectColor;
    rw.textColor = win.readerTextColor
    rw.isRounded = win.readerIsRounded;
    rw.hasBoarder = win.readerHasBoarder;
    rw.type = "reader";
    rw.originalText = text;
    cast.push(rw);
    player.readerWindow.push(rw);
    rw.setText(text, false);
    win.setText("Opening...");
}

function spawnCardWin(card, x, y, scale) {
    // a text reader window
    let cw = new aniRect(x,// + (player.cardWindow.length * 20),
                            y,// + (player.cardWindow.length * 20), 
                            100*scale, 140*scale);
    //rw.fontSize = win.readerFontSize;
    cw.acceptInput = false;
    cw.x1 = getWidth();
    cw.y1 = 10;
    cw.backgroundColor = '#fdfdfd';
    cw.rectColor = '#ff0000';
    cw.textColor = '#58e5fa';
    cw.isRounded = false;
    cw.hasBoarder = false;
    cw.type = "card";
    cw.card = card;
    cw.scale = scale;
    cw.targetScale = scale;
    cw.shown = false;
    cw.prevX;
    cw.pervY = 10;
    cw.targetX = x;
    cw.targetY = y;
    cw.childCard = 0;
    cw.parentCard = 0;
    cw.cardLines = cardVector(cw.card, 0, 0, cw.scale);
    cast.push(cw);
    player.cardWindow.push(cw);
    //rw.setText(text, false);
    
    return cw;
}

function spawnAudioWin(win, command) {
    // the audio player window
    let aw = new aniRect(win.aX1, win.aY1, win.aXW, win.aYH);
    aw.fontSize = win.audioFontSize;
    aw.acceptInput = false;
    aw.backgroundColor = win.audioBackgroundColor;
    aw.rectColor = win.audioRectColor;
    aw.textColor = win.audioTextColor
    aw.isRounded = win.audioIsRounded;
    aw.hasBoarder = win.audioHasBoarder;
    aw.type = "audio";
    aw.setText("");
    player.audioPlayer = aw;
    cast.push(aw);
}

function spawnProxyWin(win) {
    // the proxy list window
    let pw = new aniRect(win.pX1, win.pY1, win.pXW, win.pYH);
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

function spawnMailWin(dns) {
    // the email client window
    let mw = new aniRect(player.mX1, player.mY1, player.mXW, player.mYH);
    mw.fontSize = player.mailFontSize;
    mw.acceptInput = true;
    mw.backgroundColor = player.mailBackgroundColor;
    mw.rectColor = player.mailRectColor;
    mw.textColor = player.mailTextColor
    mw.isRounded = player.mailIsRounded;
    mw.hasBoarder = player.mailHasBoarder;
    mw.promptChar = "";
    mw.authMode = true;
    mw.focusNum = 0;
    mw.dns = dns;
    mw.host = player.lastMailDomain; //locations[0].email.split("@")[1];
    mw.user = player.lastMailAccount; //locations[0].email.split("@")[0];
    mw.password = player.lastMailPassword;
    mw.mailSelected = null;
    mw.showSent = false;
    mw.inbox = [];
    mw.sent = [];
    mw.inboxOffset = 0;
    mw.sentOffset = 0;
    mw.type = "mail";
    cast.push(mw);
    mw.text = ""; //generateGiberish(600);
    return mw;
}

function spawnBruteWin(win, command, ip, user, node) {
    // the ssh brute force cracker
    let i = player.bruteWindow.length;

    let bw = new aniRect(
        player.bX1 + (i * 10),
        player.bY1 + ((i * 20) % (getHeight()/2)),
        player.bXW,
        player.bYH
    );
    bw.fontSize = player.bruteFontSize;
    bw.acceptInput = false;
    bw.backgroundColor = player.bruteBackgroundColor;
    bw.rectColor = player.bruteRectColor;
    bw.textColor = player.bruteTextColor
    bw.isRounded = player.bruteIsRounded;
    bw.hasBoarder = player.bruteHasBoarder;
    bw.type = "brute";
    bw.ip = ip;
    bw.user = user;
    bw.bNode = node.id;
    bw.loops = 0;
    bw.time = gameTimer.timerStart()
    bw.setText(user + "@" + ip);
    bw.tryAuthPwd = 0;

    let notFound = true;
    // try to match an account username
    for (let i = 0; i < node.accounts.length; i++) {
        //console.log(`node.accounts[${i}].user  ` + node.accounts[i].user )
        //console.log(`user ${user}`)
        if (node.accounts[i].user == user) {
            // the entered username was valid, 
            // so ask for pwd next command
            notFound = false;
            bw.authAccountIndex = i;
        }
    }
    if (notFound) {
        win.setText(`User account ${user} not found on ${ip}`);
        win.delete = true
        return;
    }
    bw.cracked = false;
    player.bruteWindow.push(bw);
    cast.push(bw);
}

function createAccounts(n) {
    let movie = ["god","love","money","secert","sex","joshua", "swordfish"];

    let pwd = "";
    let r = getRandInt(100)
    if (r > 35) {
        // sort of strong
        pwd = passwords[getRandInt(passwords.length-1)] + getRandInt(9);
    } else if (r < 1) {
        // movie
        pwd = movie[getRandInt(movie.length-1)];
    } else {
        // bad
        pwd = passwords[getRandInt(passwords.length-1)]
    }
    //pwd = "password" // TESTING ONLY
    let a = [{"user": "root", "pwd":pwd, "admin": true, "userId":0}];

    if (n < locations.length) {
        let f;
        let last;
        let uname;
        let pwd; 

        // Vary generated usernames 
        let r = getRandInt(100);
        if (r < 50) {
            // first inital + lastname
            f = locations[n].homeowner.split(" ")[0].substring(0,1).toLowerCase();
            last = locations[n].homeowner.split(" ")[1].toLowerCase();
            uname = f + last;
        } else if (r < 75){
            // full first + full last
            f = locations[n].homeowner.split(" ")[0].toLowerCase();
            last = locations[n].homeowner.split(" ")[1].toLowerCase();
            uname = f + last;
        } else if (r < 85) {
            // just first name
            uname = locations[n].homeowner.split(" ")[0].toLowerCase() + getRandInt(999);
        } else {
            // just last name + rand
            uname = locations[n].homeowner.split(" ")[1].substring(0,1).toLowerCase() + getRandInt(99);
        }

        // make every 256 nodes an email host, but not node 0
        if (n % 256 == 0 && n != 0) {
            let e = n / 256 - 1;
            if (e < emailProviders.length) {
                DNSKeys[emailProviders[e].toLocaleLowerCase()] = nodes[n].ip_address;
                //console.log(`e: ${e}, DNSKeys ${DNSKeys}`);
                nodes[n].type = "eMail Server"
                nodes[n].text = `${emailProviders[e]} eMail Host Sever v2.58`
            }
        }

        // assign email account to random email service
        let host = emailProviders[getRandInt(emailProviders.length)]
        let eAddress = uname + "@" + host;
        locations[n].email = eAddress;


        // some passwords will match if run against the password table 
        // others have random numbers on the end, which are harder to crack
        if (getRandInt(100) > 75) {
            pwd = passwords[getRandInt(passwords.length)] + getRandInt(999)
        } else {
            pwd = passwords[getRandInt(passwords.length)];
        }
        //pwd = "password" // testing only    
        let b = {"user": uname, "pwd": pwd, "admin": true, "userId": 1};
        
        a.push(b);
        
        nodes[n].id = n;
        nodes[n].compromisedAccounts = [];
        nodes[n].accounts = a;
        nodes[n].lastAuthAccount = -1;
        
        // assign primary and secondary DNS
        nodes[n].dns = [];
        nodes[n].dns.push(DNSServers[getRandInt(DNSServers.length)]);
        nodes[n].dns.push(DNSServers[getRandInt(DNSServers.length)]);

        nodes[n].telephone = generatePhoneNumber(nodes[n].country);

        nodes[n].logFile = "C:\\System\\logs\\logs.txt";
    }
}

function attachNode(window, node) {
    window.node = node;
    window.promptChar = node.promptChar;
    window.text = node.text;
    window.fileSystem = FileSystem[node.id];
}

function doBrute() {
    for (let i = 0; i < player.bruteWindow.length; i++) {
        const c = player.bruteWindow[i];
        if (c.type == "brute" && c.cracked == false) {
            //let stack = player.nodeStack;
            let node = nodes[c.bNode];
            if (node.nuked) {
                return;
            }
            let account = node.accounts[c.authAccountIndex];

            c.displayLines = [];

            // test password
            let p;
            if (c.loops > 0) {
                p = passwords[c.tryAuthPwd] + c.loops;
            } else {
                p = passwords[c.tryAuthPwd];
            }
            if (account.pwd == p) {
                c.cracked = true;
                let t = gameTimer.timer(c.time);
                c.text = `${c.user}@${c.ip}
                            ${node.city}, ${node.country}
                            Welcome, ${account.user}
                            Password: ${account.pwd}
                            elapsed: ${t.days}:${t.hours}:${t.minutes}:${t.seconds}`;
                c.setText(c.text, false);
                let str = `${gameTimer.formatted()} - ${c.ip} authenitcated with account ${account.user}\n`
                node.fileSystem.appendFile(node.logFile, str);
                node.compromisedAccounts.push(c.authAccountIndex);
                player.compromisedComputers.push(c.ip);
                //console.log(player.compromisedComputers);
                node.fileSystem.save();
                //console.log(node.fileSystem.readFile(node.logFile))
                c.backgroundColor = '#05a805';
            } else {
                //console.log(`${c.user}@${c.ip}\nTrying ${player.tryAuthPwd}\n(${i} of ${passwords.length})`)
                let t = gameTimer.timer(c.time);
                c.text =`${c.user}@${c.ip}
                        ${node.city}, ${node.country}
                        Trying - ${p}
                        (${c.tryAuthPwd} of ${passwords.length} * ${c.loops})
                        elapsed: ${t.days}:${t.hours}:${t.minutes}:${t.seconds}`;
                
                //c.setText(c.text, false);
                logFailedAuth(c, node, c.user);
                
                c.tryAuthPwd ++;
                if (c.tryAuthPwd >= passwords.length) {
                    c.tryAuthPwd = 0;
                    c.loops ++;
                }   
            }
        }
    }
}

function doCleanLogs() {
    let chunk = 50;
    const end = Math.min(
        player.cleanSegment + chunk,
        locations.length
    );
    for (let i = player.cleanSegment; i < end; i ++ ) {
        let fs = nodes[i].fileSystem;
        //console.log("fs " + fs + " node: " + nodes[i].id)
        let changed = false;
        let j = fs.readFile("C:\\System\\logs\\logs.txt", 0);
        j = j.split("\n");
        while (j.length > 100) {
            j = j.slice(-100);
            console.log("cleaned node: " + i)
            changed = true;
        }
        if (changed) {
            if (j.lenght > 1) {
                j = j.join('\n');
            }
            fs.writeFile("C:\\System\\logs\\logs.txt", j, 0);
            fs.save();
        }
    }
    player.cleanSegment += chunk;
    if (player.cleanSegment > nodes.length) {
        player.cleanSegment = 0;
        player
    }
}

function setWindowPri(win) {
    // PRIORITY
    //if (win.pri != 0) {
        win.pri = cast.length; // set max pri
        // downgrade the others
        for (let i = 0; i < cast.length; i++) {
            if (cast.indexOf(win) != i) {
                cast[i].pri --;
            }
        }
    //}
}

async function populateEmailServers(i) {
    // email provder every 256
    let e = locations[i].email.split("@");
    let nodeID = (emailProviders.indexOf(e[1]) + 1) * 256;
    let fs = nodes[nodeID].fileSystem
    //console.log(nodeID, fs)
    if (!fs.getFolder(`C:\\Email`)) {
        fs.createFolder(`C:\\Email`, 0, 0);
    }
    //console.log(`C:\\Email\\${e[0]}`);
    fs.createFolder(`C:\\Email\\${e[0]}`, 0, 0);
    fs.createFolder(`C:\\Email\\${e[0]}\\Acct`, 0, 0);
    fs.createFile(`C:\\Email\\${e[0]}\\Acct\\pswd.txt`, 0, 0, nodes[i].accounts[1].pwd, 0);
    fs.createFolder(`C:\\Email\\${e[0]}\\Inbox`, 0, 0);
    fs.createFolder(`C:\\Email\\${e[0]}\\Sent`, 0, 0);


    // only create email for player
    if (i == 0) {
        let c = 10;
        let reply;
        for (let j = 0; j < c; j++) {
            let r = getRandInt(locations.length);
            const email = EmailGenerator.generate({
                fromEmail: locations[r].email,
                toEmail: locations[i].email,
                fromName: locations[r].homeowner.split(" ")[0],
                toName: locations[i].homeowner.split(" ")[0],
                
                //domain: e[i]
                //replyTo: messageId
                /*attachment: {
                    name: "invoice.pdf",
                    size: 48231,
                    type: "application/pdf"
                }
                    or
                attachment: "invoice.pdf"    
                */

                //offset is milliseconds, so a time 1 hour before realStartTime:
                // gameTimer.formatted(-60 * 60 * 1000)
                timestamp: gameTimer.formatted(-getRandInt(4000) * 60 * 32 * 1000)
            });
            //console.log(nodes[i].accounts[1].pwd);
            fs.createFile(`C:\\Email\\${e[0]}\\Inbox\\${email.messageId}`, 0, 0, JSON.stringify(email), 0);
            reply = email.messageId;
        }
        for (let h = 0; h < c; h++) {
            let r = getRandInt(locations.length);
            const email = EmailGenerator.generate({
                fromEmail: locations[i].email,
                toEmail: locations[r].email,
                fromName: locations[i].homeowner.split(" ")[0],
                toName: locations[r].homeowner.split(" ")[0],
                
                message: "SCREW YOU!",
                //domain: e[i]
                //replyTo: reply,
                /*attachment: {
                    name: "invoice.pdf",
                    size: 48231,
                    type: "application/pdf"
                }
                    or
                attachment: "invoice.pdf"    
                */

                //offset is milliseconds, so a time 1 hour before realStartTime:
                // gameTimer.formatted(-60 * 60 * 1000)
                timestamp: gameTimer.formatted(-getRandInt(4000) * 60 * 32 * 1000)
            });
            //console.log(nodes[i].accounts[1].pwd);
            fs.createFile(`C:\\Email\\${e[0]}\\Sent\\${email.messageId}`, 0, 0, JSON.stringify(email), 0);
        //await fs.save();
        //console.log(fs.list('C:\\Email'))
        }
    }
}

function spawnClock() {
    let cw = new aniRect(
        5,
        5,
        199,
        40
    );
    cw.fontSize = player.msFontSize;
    cw.acceptInput = false;
    cw.backgroundColor = "#0202e3";
    cw.rectColor = "#ececec";
    cw.textColor = "#ffffff";
    cw.isRounded = false;
    cw.hasBoarder = false;
    cw.type = "clock";
    cast.push(cw);
}

function spawnMineSweeperWin(s = 20, diff = 19.77) {
    let msw = new aniRect(
        player.msX1,
        player.msY1,
        s * player.msScale,
        s * player.msScale
    );
    msw.fontSize = player.msFontSize;
    msw.acceptInput = false;
    msw.backgroundColor = player.msBackgroundColor;
    msw.rectColor = player.msRectColor;
    msw.textColor = player.msTextColor
    msw.isRounded = player.msIsRounded;
    msw.hasBoarder = player.msHasBoarder;
    msw.type = "mine";
    msw.msScale = player.msScale;
    msw.x1 = player.msX1;
    msw.y1 = player.msY1;
    msw.lastDiff = diff;
    msw.msW = s;
    msw.msH = s;
    msw.wasDragged = false;
    msw.xDist = 0;
    msw.yDist = 0;
    msw.msBArray = []; // mine locations
    msw.msRArray = []; // revealed or not
    msw.msFArray = []; // player set flags
    msw.msTotalMines = 0;
    msw.msGameOver = false;
    msw.msFlagged = 0;
    cast.push(msw);
    mineInit(msw, s, msw.lastDiff);
    return msw;
}