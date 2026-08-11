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
const gameTimer = new GameTimer("2000-7-5");

function init() {
    window.addEventListener('click', doClick);
    window.addEventListener('keydown', doKeyDown);  
    window.addEventListener('mousemove', doMouseMove);
    window.addEventListener('mousedown', doMouseDown);
    window.addEventListener('mouseup', doMouseUp);
    window.addEventListener('wheel', doWheel);
    //window.addEventListener("keyup", kUp);
    window.addEventListener('resize', doResize);
    window.addEventListener("paste", (event) => {
        let text = event.clipboardData.getData("text");
        for (let i = 0; i < text.length; i++) {
            let e = {"key": text[i]}
            cast[0].keyHandler(e);
        }
    });

    // add touch support for mobile at some point... maybe
    //document.addEventListener("gesturestart", e => e.preventDefault(), { passive: false });

    doResize();
    mapXOff = getWidth()/2;  //3 * 2;
    mapYOff = getHeight()/2;
    ctx.fillStyle = '#f4eded';

    // Indicate the game is loading to the player
    ctx.font = scaleFont(0.01, "arial");
    ctx.fillText("Loading game. Please wait...", 20,20);

    fetch('data/locations.json')
        .then(response => response.json())
        .then(data => locations = data)
        .then(result => {
            shuffle(locations);
            loadPasswords();
        })
        .catch(error => console.error('Error loading locations JSON file', error));
}

function loadPasswords() {
    fetch('data/passwords.json')
        .then(response => response.json())
        .then(data => passwords = data)
        .then(result => {
            console.log(passwords[0])
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

            // need to update node info for the time being. 
            // To Do: Update the json instead
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes[i];
                let city = cities[i];

                node.id = i;
                node.city = city.name;
                node.country = city.country;
                node.latitude = city.lat;
                node.longitude = city.lon;
                node.dicovered = false;
                node.fileSystem = [];
                node.type = "mal-90.";
                node.text = `Welcome to the mal-90.${i} OS\nDate: ${gameTimer.formatted()}\nMight I suggest some AUDIO or asking for HELP if you need it.`;
                node.promptChar = ">";
                createAccounts(i);
                
            }

            //player = new user(prompt("enter player name:"));
            player = new Player("Robort Copeland");
            locations[0].homeowner = player.name;
            //player.askedForName = true;
            gUsers.push(player);

            loadMap();
        })
        .catch(error => console.error('Error loading node JSON file', error));
}

function loadMap() {
    fetch('data/map.json')
        .then(response => response.json())
        .then(data => map = data)
        .then(result => {
            // sluff unused map stuff
            map = map.features;

            let playersWindow = new aniRect(getWidth()/20, getHeight()/8, getWidth()/3, getHeight()/1.5);
            attachNode(playersWindow, nodes[0]);
            playersWindow.admins.push(0); // add player as admin to own computer
            cast.push(playersWindow);

            /*/ broswer test
            let browser = new CanvasBrowser(
                100,
                100,
                600,
                400
            );
            cast.push(browser);
            browser.open("./js/browser/test.html");*/

            requestAnimationFrame(frame);
        })
        .catch(error => console.error('Error loading map JSON file', error));
}

function frame(timestamp) {
    //renderer.beginFrame();
    draw();
    //renderer.flush(cameraMatrix);

    requestAnimationFrame(frame);
}