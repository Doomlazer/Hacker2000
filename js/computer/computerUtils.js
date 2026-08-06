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

function createFS(n) {
    const fs = new FileSystem();

    // Create folders
    fs.createFolder("C:\\Users", 1);

    fs.createFolder(`C:\\Users\\root`, 0);
    fs.createFolder(`C:\\Users\\${nodes[n].accounts[1].user}`, 1);
    fs.createFolder(`C:\\Users\\${nodes[n].accounts[1].user}\\Desktop`, 1);
    fs.createFolder(`C:\\Users\\${nodes[n].accounts[1].user}\\Documents`, 1);
    fs.createFolder(`C:\\Users\\${nodes[n].accounts[1].user}\\Music`, 1);


    fs.createFolder("C:\\System", 0);
    fs.createFolder("C:\\System\\logs", 0);
    fs.createFolder("C:\\System\\bin", 0);

    // Create files
    fs.createFile("C:\\config.cfg", 0, generateGiberish(getRandInt(200)+200));
    fs.createFile("C:\\System\\logs\\logs.txt", 0, nodes[n].ip_address + "\nLOG FILE:\n");


    // standard commands
    fs.createFile("C:\\System\\bin\\exit", 0, generateGiberish(32));
    fs.createFile("C:\\System\\bin\\ls", 0, generateGiberish(63));
    fs.createFile("C:\\System\\bin\\ulist", 0, generateGiberish(23));
    fs.createFile("C:\\System\\bin\\read", 0, generateGiberish(113));
    fs.createFile("C:\\System\\bin\\cd", 0, generateGiberish(12));
    fs.createFile("C:\\System\\bin\\pwd", 0, generateGiberish(42));
    fs.createFile("C:\\System\\bin\\ssh", 0, generateGiberish(32));
    fs.createFile("C:\\System\\bin\\clear", 0, generateGiberish(32));
    fs.createFile("C:\\System\\bin\\su", 0, generateGiberish(32));
    fs.createFile("C:\\System\\bin\\reg", 0, generateGiberish(42));
    fs.createFile("C:\\System\\bin\\date", 0, generateGiberish(102));

    // specific to players computer and/or rare commands
    if (n == 0) {
        fs.createFile("C:\\System\\bin\\setparm", 0, generateGiberish(62));
        fs.createFile("C:\\System\\bin\\fullscreen", 0, generateGiberish(142));
        fs.createFile("C:\\System\\bin\\scan", 0, generateGiberish(172));
        fs.createFile("C:\\System\\bin\\map", 0, generateGiberish(572));
        fs.createFile("C:\\System\\bin\\hangup", 0, generateGiberish(32));
        fs.createFile("C:\\System\\bin\\dial", 0, generateGiberish(32));
        fs.createFile("C:\\System\\bin\\audio", 0, generateGiberish(234));
        fs.createFile("C:\\System\\bin\\help", 0, generateGiberish(23));
    }
    
    // Make System read-only
    fs.setAttributes(
        "C:\\System",
        {
            readOnly: true,
            system: true
        }
    );

    fs.setAttributes(
        "C:\\Users\\root",
        {
            readOnly: true,
            system: true
        }
    );

    return fs;
}

function spawnReadWin(win, text) {
    // a text reader window
    let rw = new aniRect(win.rX1, win.rY1, win.rXW, win.rYH);
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
    rw.setText(text, false);
    win.setText("Opening...");
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

function createAccounts(n) {
    let a = [{"user": "root", "pwd":"password1234", "admin": true, "userId":0}];

    if (n < locations.length) {
        let f = locations[n].homeowner.split(" ")[0].substring(0,1).toLowerCase();
        let last = locations[n].homeowner.split(" ")[1].toLowerCase()
        let uname = f + last;
        let pwd = passwords[getRandInt(passwords.length)] + getRandInt(999); 
        let b = {"user": uname, "pwd": pwd, "admin": true, "userId": 1};
        
        a.push(b);
        
        nodes[n].id = n;
        nodes[n].compromisedAccounts = [];
        nodes[n].accounts = a;
        nodes[n].lastAuthAccount = -1;

        nodes[n].telephone = generatePhoneNumber(nodes[n].country);

        nodes[n].logFile = "C:\\System\\logs\\logs.txt";

        nodes[n].fileSystem = createFS(n);
    }
}

function attachNode(window, node) {
    window.node = node;
    window.promptChar = node.promptChar;
    window.text = node.text;
}