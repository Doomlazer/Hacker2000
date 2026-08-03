class User {
    constructor() {
        this.name = locations[gUsers.length].homeowner;
        this.uName = this.name.split(" ")[0].substring(0,1).toLowerCase() + this.name.split(" ")[1].toLowerCase();
        this.cash = 100;
        this.crypto = 0;
        this.uid = gUsers.length;
        this.nodeStack = [this.uid];
        this.aniSpeed = 0.01;
        this.homeAddress = locations[gUsers.length].address;
        this.workAddress;
        this.tryAuthName;
        this.tryAuthPwd;
        this.authAccountIndex = 0; // current user starts a zero/admin
        this.askedForName = false;
        this.askedForPwd = false;
        this.windowHover = false;
    }
}

class Player extends User{
    constructor(name) {
        super();
        this.name = name;
        this.uName = this.name.split(" ")[0].substring(0,1).toLowerCase() + this.name.split(" ")[1].toLowerCase();
        this.selCountry = locations[gUsers.length].address.country; // selected country on map
        this.focus;
        this.drawCities = true;
        this.drawNodes = true;
        this.drawNodeStack = true;
        this.connectTo = 0;
        this.selCountry = locations[gUsers.length].address.country;
        this.selectedCountry;
        this.proxyWindow = [];
        this.readerWindow = [];
        this.unactivated = false;
        this.musicOn = false;
        this.musicVol = 50;
        this.audioPlayer;
        this.sendToReaderThreshold = 9;
    }
}