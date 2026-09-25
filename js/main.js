// canvas defined in index.html
// c = document.getElementById("canvas");
// ctx = c.getContext("2d");
let debug = false;
let cast = [];
let gUsers = [];
let player;
let locations = [];
let map = [];
let mapScale = 5;
let mapXOff;
let mapYOff;
let mapColor = '#c8cac8';
let updateMap = true;
let mapSteps = 0;
let mapStepsMax = 2;
let mapInc = 2;
let mapSel = [];
let cities = [];
let nodes = [];
let backgroundMusic = [];
let phoneAudio = [];
let mapCitiesSteps = 0;
let mapNodeSteps = 0;
let mapNodeStackSteps = 0;
let movingMap = false;
let passwords = [];
let nukes = [];
let ip_addresses = [];
const gameTimer = new GameTimer("2000-7-5");
let emailProviders = ["MailSphere.com", "ZipPost.net", "InboxZone.com", "WebLetter.com", 
    "MailClix.net", "CyberSnail.com", "PostPilot.net", "MessageMan.com", "MailSlug.com", 
    "NetInbox.com", "Tomale.com", "ClickMail.com", "Abazabado.com", "MailWave.net", 
    "WebPost.com", "MailWorks.net", "RabbitMail.com","EZMail.com", "KillerMail.net"];
let DNSServers = ["1.1.1.1", "8.8.8.8"];
let DNSKeys = {};
let locpnum;
const deck = [
        "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
        "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
        "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
        "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC"
    ];

async function init() {
    window.addEventListener('click', doClick);
    window.addEventListener('keydown', doKeyDown);  
    window.addEventListener('mousemove', doMouseMove);
    window.addEventListener('mousedown', doMouseDown);
    window.addEventListener('mouseup', doMouseUp);
    window.addEventListener('wheel', doWheel);
    //window.addEventListener("keyup", kUp);
    window.addEventListener('resize', doResize);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener("paste", (event) => {
        let text = event.clipboardData.getData("text");
        for (let i = 0; i < text.length; i++) {
            let e = {
                "key": text[i],
                isPaste: true
            }
            cast[0].keyHandler(e);
        }
    });

    doResize();
    mapXOff = getWidth()/2;  //3 * 2;
    mapYOff = getHeight()/2;
    ctx.fillStyle = '#f4eded';

    // has the world been initialized?
    if (await ArrayStorage.exists("cities")) {
        await loadAllArrays();
    } else {
        // this leads to the mal90 author supposedly :)
        locpnum = getRandInt(999) + 1;

        // add touch support for mobile at some point... maybe
        //document.addEventListener("gesturestart", e => e.preventDefault(), { passive: false });

        //indexedDB.deleteDatabase("VirtualFileSystemDB");
        shuffle(emailProviders);

        fetch('data/locations.json')
            .then(response => response.json())
            .then(data => locations = data)
            .then(result => {
                shuffle(locations);
                loadPasswords();
            })
            .catch(error => console.error('Error loading locations JSON file', error));
    }
}

function loadPasswords() {
    fetch('data/passwords.json')
        .then(response => response.json())
        .then(data => passwords = data)
        .then(result => {
            shuffle(passwords);
            loadCities();
        })
        .catch(error => {
            console.error(error);
            console.error(error.stack);
        });
}

function loadCities() {
    fetch('data/cities.json')
        .then(response => response.json())
        .then(data => cities = data)
        .then(result => {
            //console.log(cities);
            shuffle(cities);

            loadNodes();
        })
        .catch(error => console.error('Error loading cities JSON file', error));
}

function loadNodes() {
    fetch('data/nodes.json')
        .then(response => response.json())
        .then(data => nodes = data)
        .then(result => {
            shuffle(nodes);

            ip_addresses = generateIPs();
            shuffle(ip_addresses);

            player = new Player("Robort Copeland");
            locations[0].homeowner = player.name;
            //player = new user(prompt("enter player name:"));
            //player.askedForName = true;
            gUsers.push(player);

            // need to update node info for the time being. 
            // To Do: Update the json instead
            for (let i = 0; i < locations.length; i++) {
                let node = nodes[i];
                let city = cities[i];

                node.id = i;
                node.ip_address = ip_addresses[i];
                locations[i].id = i;
                locations[i].network.ipv4 = ip_addresses[i];
                locations[i].address.city = city.name;
                locations[i].address.country = city.country;
                node.city = city.name;
                node.country = city.country;
                node.latitude = city.lat;
                node.longitude = city.lon;
                node.dicovered = false;
                node.fileSystem = [];
                node.dns = [];
                node.dns.push(DNSServers[getRandInt(DNSServers.length-1)]);
                node.dns.push(DNSServers[getRandInt(DNSServers.length-1)]);
                node.type = "mal-90";
                node.text = `Welcome to the mal-90.${i} OS\nDate: ${gameTimer.formatted()}\nMight I suggest some AUDIO or asking for HELP if you need it.`;
                node.promptChar = ">";
                createAccounts(i);
            }

            createAllFS();
            
        })
        .catch(error => console.error('Error loading node JSON file', error));
}

async function loadMap() {
    fetch('data/map.json')
        .then(response => response.json())
        .then(data => map = data)
        .then(async result => {
            // sluff unused map stuff
            map = map.features;

            let playersWindow = new aniRect(getWidth()/20, getHeight()/8, getWidth()/3, getHeight()/1.5);
            attachNode(playersWindow, nodes[0]);
            playersWindow.admins.push(0); // add player as admin to own computer
            cast.push(playersWindow);

            // dns
            fsDNS(nodes[1].fileSystem, DNSServers[0], 1);
            await nodes[1].fileSystem.save();
            fsDNS(nodes[2].fileSystem, DNSServers[1], 2);
            await nodes[2].fileSystem.save();


            if (!nodes[256].fileSystem.getFolder(`C:\\Email`)) {
                console.log("creating all emails")
                createAllEmails();
                await saveAllArrays();
            } else {
                console.log("skipping email creation")
                requestAnimationFrame(frame);
            }

            /*/ broswer test
            let browser = new CanvasBrowser(
                100,
                100,
                600,
                400
            );
            cast.push(browser);
            browser.open("./js/browser/test.html");*/

        })
        .catch(error => console.error('Error loading map JSON file', error));
}

function frame(timestamp) {
    //renderer.beginFrame();
    doBrute();
    doCleanLogs();
    draw();
    //renderer.flush(cameraMatrix);

    requestAnimationFrame(frame);
}

async function createAllFS() {
    const concurrency = 50;

    for (let i = 0; i < locations.length; i += concurrency) {

        const end = Math.min(
            i + concurrency,
            locations.length
        );

        await Promise.all(
            Array.from(
                { length: end - i },
                (_, j) => createFS(i + j).then(
                    fs => nodes[i + j].fileSystem = fs
                )
            )
        );

        drawFSProgress(end, locations.length);
        drawFSProgress(0, locations.length, 1);
    }
    console.log("ALL FILESYSTEMS CREATED");
    const quota = await navigator.storage.estimate();
    console.log('Approx total allocated space:', formatBytes(quota.quota));
    console.log('Approx used space:', formatBytes(quota.usage));
    const retaliation = getRetaliationOptions("United States");
    console.log(retaliation);
    loadMap();
}

async function createAllEmails() {
    // email population
    const concurrency = 50;
    console.log("Running createAllEmails()")
    for (let i = 0; i < locations.length; i += concurrency) {
        const end = Math.min(
            i + concurrency,
            locations.length
        );

        await Promise.all(
            Array.from(
                { length: end - i },
                (_, j) => populateEmailServers(i + j).then()
            )
        );
        drawFSProgress(end, locations.length, 1);
    }
    // saving one node !!!should!!! save all file systems 
    // and doing it after population is fastest
    await nodes[0].fileSystem.save();

    const quota = await navigator.storage.estimate();
    console.log('Approx total allocated space:', formatBytes(quota.quota));
    console.log('Approx used space:', formatBytes(quota.usage));
    requestAnimationFrame(frame);
}

async function saveAllArrays() {
    await ArrayStorage.save("map", map);
    await ArrayStorage.save("locations", locations);
    await ArrayStorage.save("passwords", passwords);
    await ArrayStorage.save("cities", cities);

    // destroy filesystem before saving 
    const nodesToSave = nodes.map(node => {
        const copy = { ...node };
        delete copy.fileSystem;
        return copy;
    });
    await ArrayStorage.save("nodes", nodesToSave);

    await ArrayStorage.save("emailProviders", emailProviders);
    await ArrayStorage.save("DNSKeys", DNSServers);
    await ArrayStorage.save("DNSKeys", DNSKeys);
    await ArrayStorage.save("gUsers", gUsers);
}

async function loadAllArrays() {
    nodes = await ArrayStorage.load("nodes");
    //console.log("nodes loaded", nodes)

    const arrayTotal = 8;
    const fsTotal = nodes.length;
    const total = arrayTotal + fsTotal;
    let done = 0;
    drawFSProgress(++done, total);

    map = await ArrayStorage.load("map");
    //console.log("Map loaded", map)
    drawFSProgress(++done, total);

    locations = await ArrayStorage.load("locations");
    //console.log("locations loaded", locations)
    drawFSProgress(++done, total);

    passwords = await ArrayStorage.load("passwords");
    //console.log("passwords loaded", passwords)
    drawFSProgress(++done, total);

    cities = await ArrayStorage.load("cities");
    //console.log("cities loaded", cities)
    drawFSProgress(++done, total);


    emailProviders = await ArrayStorage.load("emailProviders");
    //console.log("emailProviders loaded", emailProviders)
    drawFSProgress(++done, total);

    DNSServers = await ArrayStorage.load("DNSServers");
    DNSKeys = await ArrayStorage.load("DNSKeys");
    //console.log("DNSKeys loaded", DNSKeys)
    drawFSProgress(++done, total);

    gUsers = await ArrayStorage.load("gUsers");
    //console.log("gUsers loaded", gUsers)
    drawFSProgress(++done, total);
    player = gUsers[0];


    let playersWindow = new aniRect(getWidth()/20, getHeight()/8, getWidth()/3, getHeight()/1.5);
    attachNode(playersWindow, nodes[0]);
    playersWindow.admins.push(0); // add player as admin to own computer
    cast.push(playersWindow);


    // reload node fs
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].fileSystem = await FileSystem.load(i);
        done++;
        drawFSProgress(done, total);
    }

    requestAnimationFrame(frame);
}